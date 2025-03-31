import { asc, count, eq, getTableColumns } from "drizzle-orm";
import { db } from "../index";
import { postsTable, usersTable, SelectUser } from "../schema";

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 20
): Promise<
  Array<
    {
      postsCount: number;
    } & SelectUser
  >
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
