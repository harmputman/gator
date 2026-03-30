import { CommandHandler, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const config = readConfig();

        if (!config.currentUserName) {
            throw new Error('No logged in user found');
        }

        const user = await getUser(config.currentUserName);

        if (!user) {
            throw new Error(`User ${config.currentUserName} not found`)
        }

        return handler(cmdName, user, ...args);
    };
}
