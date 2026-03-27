import { readConfig } from "src/config";
import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import { getUser, getUserById } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const config = readConfig();
    const user = await getUser(config.currentUserName);

    if (!user) {
        throw new Error(`User ${config.currentUserName} not found`)
    }

    const [name, url] = args;

    const feed = await createFeed(name, url, user);

    if (!feed) {
        throw new Error(`Failed to create feed ${name}`);
    }

    console.log(`Feed "${name}" was created`);
    printFeed(feed, user);
}

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {
    const feeds: Feed[] = await getFeeds();

    if (feeds.length === 0) {
        console.log(`No feeds found.`);
        return;
    }

    console.log(`Found %d feeds:\n`, feeds.length);
    for (let feed of feeds) {
        const user = await getUserById(feed.userId);
        if (!user) {
            throw new Error(`Failed to find user for feed ${feed.id}`);
        }

        printFeed(feed, user);
        console.log(`=====================================`);
    }
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
