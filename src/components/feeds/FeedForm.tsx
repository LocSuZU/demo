"use client";

import { Feed, NewFeedParams, insertFeedParams } from "@/lib/db/schema/feeds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { uploadVercel } from "@/lib/utils";

interface FileWithPreview extends File {
  loading?: boolean;
  preview?: string;
}



const FeedForm = ({
  feed,
  closeModal,
}: {
  feed?: Feed;
  closeModal: () => void;
}) => {
  const { toast } = useToast();

  const editing = !!feed?.id;

  const router = useRouter();
  const utils = trpc.useContext();
  const [files, setFiles] = useState<FileWithPreview[]>([]);


  const form = useForm<z.infer<typeof insertFeedParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedParams),
    defaultValues: feed ?? {
      content: "",
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.feeds.getFeeds.invalidate();
    router.refresh();
    closeModal(); toast({
      title: 'Success',
      description: `Feed ${action}d!`,
      variant: "default",
    });
  };

  const mutation = trpc.medias.createMedia.useMutation();
  const { mutate: createFeed, isLoading: isCreating } =
    trpc.feeds.createFeed.useMutation({
      onSuccess: async ({ feed }) => {
        if (files.length > 0 && feed) {
          files.forEach((file: FileWithPreview) => {
            if (file.preview) {
              const feedId = feed.id;
              mutation.mutate({ feedId: feedId, url: file.preview });
            }
          });
          onSuccess("create");
        }
      }
    });

  const { mutate: updateFeed, isLoading: isUpdating } =
    trpc.feeds.updateFeed.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteFeed, isLoading: isDeleting } =
    trpc.feeds.deleteFeed.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const onDrop = useCallback((acceptedFiles: Array<FileWithPreview>) => {
    if (acceptedFiles?.length) {
      Promise.all(
        acceptedFiles.map((file: FileWithPreview) => uploadVercel(file))
      ).then((urls: string[]) => {
        setFiles(previousFiles => [
          ...previousFiles,
          ...urls.map((url, index) => Object.assign(acceptedFiles[index], { preview: url, loading: true }))
        ]);
      });
    }
  }, []);

  // const onDrop = useCallback((acceptedFiles: Array<FileWithPreview>) => {
  //   if (acceptedFiles?.length) {
  //     setFiles(previousFiles => [
  //       ...previousFiles,
  //       ...acceptedFiles.map(file => ({ ...file, loading: true }))
  //     ]);

  //     acceptedFiles.forEach((file, index) => {
  //       uploadVercel(file).then(url => {
  //         setFiles(previousFiles => previousFiles.map((prevFile, prevIndex) => {
  //           if (prevIndex === index + previousFiles.length) {
  //             return { ...prevFile, preview: url, loading: false };
  //           } else {
  //             return prevFile;
  //           }
  //         }));
  //       });
  //     });
  //   }
  // }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });


  const handleSubmit = async (values: NewFeedParams) => {

    if (editing) {
      updateFeed({ ...values, id: feed.id });
    } else {
      createFeed(values);
    }
  };

  const onError = (error: any) => {
    console.log('error', error);
  }




  useEffect(() => {
    return () => files.forEach((file: FileWithPreview) => {
      if (file.preview) URL.revokeObjectURL(file.preview)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, onError)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ''} />
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag  drop some files here, or click to select files</p>
                }
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        {files.map((file: FileWithPreview, index) => {
          return (
            <div key={index}>
              {!file.loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="black" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Image src={file.preview || ''} width={100} height={100} alt={file.preview || ''} />
              )}
            </div>
          )
        })}
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {
          editing ? (
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => deleteFeed({ id: feed.id })}
            >
              Delet{isDeleting ? "ing..." : "e"}
            </Button>
          ) : null}

      </form>
    </Form >
  );
};

export default FeedForm;
