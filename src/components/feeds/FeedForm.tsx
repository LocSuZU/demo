"use client";

import { Feed, NewFeedParams, insertFeedParams } from "@/lib/db/schema/feeds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion';
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
import { PutBlobResult } from "@vercel/blob";

interface FileWithPreview extends File {
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
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);


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
            const feedId = feed.id;
            setLoading(true);
            mutation.mutate({ feedId: feedId, url: file.preview || '' });
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

  interface FileWithPreview extends File {
    preview?: string;
  }

  const onDrop = useCallback((acceptedFiles: Array<FileWithPreview>) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map((file: FileWithPreview) => {
          const previewURL = URL.createObjectURL(file);
          return Object.assign(file, { preview: previewURL })
        }
        )
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });


  const handleSubmit = async (values: NewFeedParams) => {
    if (files.length === 0) {
      throw new Error('No file selected');
    }
    let ImageUrl: string[] = [];
    const promies = files.map(async (file) => {
      const response = await fetch(
        `/api/posts/upload?filename=${file?.name}`,
        {
          method: 'POST',
          body: file,
        },
      );
      const newBlob = (await response.json()) as PutBlobResult;
      ImageUrl.push(newBlob.url);
    })
    await Promise.all(promies);
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
              <motion.div
                animate={{ scale: [0, 1], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Image src={file?.preview || ''} width={100} height={100} alt={file?.preview || ''} onLoad={() => {
                  if (file.preview) {
                    URL.revokeObjectURL(file.preview)
                  }
                }} />
              </motion.div>
            </div>
          )
        })
        }
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            disabled={loading}
            onClick={() => deleteFeed({ id: feed.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedForm;
