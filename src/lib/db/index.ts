import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient()

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}

prisma.$use(async (params, next) => {
  // Manipulate params here
  const { data } = params.args;
  const title = data.title;

  if (!title) {
    return;
  }

  // Use a slugification library like `slugify` to generate a slug from the title
  const slug = slugify(title, { lower: true, strict: true });

  // Assign the generated slug to the `data.slug` property
  data.slug = slug;
  return data
})



export const db =
  global.db ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.db = db;
