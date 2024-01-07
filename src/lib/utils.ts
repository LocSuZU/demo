import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify";
import {accented} from "@/lib/contants/contants";
import { PutBlobResult } from "@vercel/blob";


type SlugifyOptions = {
  lower?: boolean;
  replacement?: string;
  strict?: boolean;
  trim?: boolean; 
  locale?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugifySlug(slug: string , options?: SlugifyOptions ) {
  const convertSlug = slugify(slug, options)
  slugify.extend(accented);
  return convertSlug
}

export async function uploadVercel(file: File) {
  const response = await fetch(
    `/api/posts/upload?filename=${file?.name}`,
    {
      method: 'POST',
      body: file,
    },
  );
  const newBlob = (await response.json()) as PutBlobResult;
  return newBlob.url;
}