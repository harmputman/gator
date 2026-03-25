import { readConfig, setUser } from "../config";
import { createUser, getUser, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0];

    const existing = await getUser(username);

    if (!existing) {
        throw new Error(`User "${username}" does not exist`);
    }

    setUser(existing.name);

    console.log(`Username "${username}" has been set`);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0];

    const user = await createUser(username);
    if (!user) {
        throw new Error(`User ${username} not found`);
    }

    setUser(username);
    console.log(`Username "${username}" was created`);
}

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const users = await getUsers();

    const config = readConfig();

    for (const s of users) {
        console.log(`* ${s.name}${config.currentUserName === s.name ? ' (current)' : ''}`);
    }
}
