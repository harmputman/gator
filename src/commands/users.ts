import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]): void {
    if (args.length !== 1) {
        throw new Error("you must provide a username");
    }
    const username = args[0];
    setUser(username);
    console.log(`Username "${username}" has been set`);
}
