import { resetUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await resetUsers();
    console.log("Database reset successfully!");
}
