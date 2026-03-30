import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, User } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeed(name: string, url: string, user: User) {
    const result = await db.insert(feeds).values({ name: name, url: url, userId: user.id }).returning();

    return firstOrUndefined(result);
}

export async function resetFeeds() {
    await db.delete(feeds).returning();
}

export async function getFeeds() {
    return await db.select().from(feeds);
}

export async function getFeedByUrl(url: string) {
    const result = await db.select().from(feeds).where(eq(feeds.url, url));

    return firstOrUndefined(result);
}
