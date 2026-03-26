import { resetFeeds } from "src/lib/db/queries/feeds";
import { resetUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await resetUsers();
    await resetFeeds();
    console.log("Database reset successfully!");
}
