import { createFeedFollow, deleteFeedFollow, getFeedFollowsForUser } from "src/lib/db/queries/feed-follows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { feedFollows, User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const [url] = args;

    const feed = await getFeedByUrl(url);

    if (!feed) {
        throw new Error(`Feed ${url} not found`)
    }

    const feedFollow = await createFeedFollow(user, feed);

    console.log(`Feed follow created:`);
    printFeedFollow(feedFollow.users.name, feedFollow.feeds.name);
}

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const feedFollows = await getFeedFollowsForUser(user);

    if (feedFollows.length === 0) {
        console.log(`No feed follows found for this user.`);
        return;
    }

    console.log(`Feed follows for user %s:`, user.id);
    for (let ff of feedFollows) {
        console.log(`* %s`, ff.feeds.name);
    }
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const [url] = args;

    const feed = await getFeedByUrl(url);

    if (!feed) {
        throw new Error(`Feed ${url} not found`)
    }

    const feedFollow = await deleteFeedFollow(user, feed);

    if (!feedFollow) {
        throw new Error(`Failed to unfollow feed: ${url}`);
    }

    console.log(`%s unfollowed successfully!`, feed.name);
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
