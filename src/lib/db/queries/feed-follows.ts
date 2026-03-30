import { and, eq } from "drizzle-orm";
import { db } from "..";
import { Feed, feedFollows, feeds, User, users } from "../schema";

export async function createFeedFollow(user: User, feed: Feed) {
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId: user.id, feedId: feed.id }).returning();

    const [result] = await db.select()
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .where(eq(feedFollows.id, newFeedFollow.id));

    return result;
}

export async function deleteFeedFollow(user: User, feed: Feed) {
    const [result] = await db.delete(feedFollows).where(and(
        eq(feedFollows.feedId, feed.id),
        eq(feedFollows.userId, user.id)
    )).returning();

    return result;
}

export async function resetFeedFollows() {
    await db.delete(feedFollows).returning();
}

export async function getFeedFollows() {
    return await db.select().from(feedFollows);
}

export async function getFeedFollowsForUser(user: User) {
    return await db.select()
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .where(eq(feedFollows.userId, user.id));
}
