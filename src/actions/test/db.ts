"use server";

import { createUser } from "@/utils/drizzle/queries/insert";
import { getUsersWithPostsCount } from "@/utils/drizzle/queries/select";
import { InsertUser } from "@/utils/drizzle/schema";
import { revalidatePath } from "next/cache";

export async function addDBData(data: InsertUser) {
  createUser(data);
  revalidatePath("/test/test1");
}

export async function getDBData() {
  return getUsersWithPostsCount();
}
