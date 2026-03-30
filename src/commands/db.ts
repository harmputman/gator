import { resetFeedFollows } from "src/lib/db/queries/feed-follows";
import { resetFeeds } from "src/lib/db/queries/feeds";
import { resetUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await resetUsers();
    await resetFeeds();
    await resetFeedFollows
    console.log("Database reset successfully!");
}
