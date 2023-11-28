"use client";

import { Media, NewMediaParams, insertMediaParams } from "@/lib/db/schema/medias";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const MediaForm = ({
  media,
  closeModal,
}: {
  media?: Media;
  closeModal: () => void;
}) => {
  const { toast } = useToast();
  const { data: feeds } = trpc.feeds.getFeeds.useQuery();
  const editing = !!media?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMediaParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMediaParams),
    defaultValues: media ?? {
      url: "",
      feedId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.medias.getMedias.invalidate();
    router.refresh();
    closeModal(); toast({
      title: 'Success',
      description: `Media ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createMedia, isLoading: isCreating } =
    trpc.medias.createMedia.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateMedia, isLoading: isUpdating } =
    trpc.medias.updateMedia.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteMedia, isLoading: isDeleting } =
    trpc.medias.deleteMedia.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewMediaParams) => {
    if (editing) {
      updateMedia({ ...values, id: media.id });
    } else {
      createMedia(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (<FormItem>
            <FormLabel>Url</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedId"
          render={({ field }) => (<FormItem>
            <FormLabel>Feed Id</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a feed" />
                </SelectTrigger>
                <SelectContent>
                  {feeds?.feeds.map((feed) => (
                    <SelectItem key={feed.id} value={feed.id.toString()}>
                      {feed.id}  {/* TODO: Replace with a field from the feed model */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            onClick={() => deleteMedia({ id: media.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MediaForm;
