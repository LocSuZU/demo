"use client";

import { Post, NewPostParams, insertPostParams } from "@/lib/db/schema/posts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";

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
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';


const PostForm = ({
  post,
  closeModal,
}: {
  post?: Post;
  closeModal: () => void;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [slug, setSlug] = useState<string>('');
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { toast } = useToast();

  const editing = !!post?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPostParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPostParams),
    defaultValues: post ?? {
      title: "",
      content: "",
      slug: "",
      image: "",
    },
  });


  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.posts.getPosts.invalidate();
    router.refresh();
    closeModal(); toast({
      title: 'Success',
      description: `Post ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createPost, isLoading: isCreating } =
    trpc.posts.createPost.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updatePost, isLoading: isUpdating } =
    trpc.posts.updatePost.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deletePost, isLoading: isDeleting } =
    trpc.posts.deletePost.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const onSubmit = async (values: NewPostParams) => {
    values.slug = slugify(values.title, {
      lower: true,
      replacement: '-'
    },);

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];
    const response = await fetch(
      `/api/posts/upload?filename=${file.name}`,
      {
        method: 'POST',
        body: file,

      },
    );
    const newBlob = (await response.json()) as PutBlobResult;
    values.image = newBlob.url;

    setBlob(newBlob);
    if (editing) {
      updatePost({ ...values, id: post.id });
    } else {
      createPost(values);
    }
  };

  const onError = (error: any) => {
    console.log('error', error);
    toast({
      title: 'Error',
      description: `Post not created!`,
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('slug', slugify(e.target.value));
    form.setValue('title', e.target.value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (<FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} onChange={onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (<FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
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
          name="image"
          render={({ field }) => (<FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <input
                type={"file"} // Set type to "file" for file input
                className={
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                required
                ref={inputFileRef}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
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
            onClick={() => deletePost({ id: post.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PostForm;
