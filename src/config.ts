import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(username: string): void {
    const config = readConfig();
    config.currentUserName = username;
    writeConfig(config);
}

export function readConfig(): Config {
    const json = JSON.parse(fs.readFileSync(getConfigFilePath(), "utf-8"));
    return validateConfig(json);
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), '.gatorconfig.json');
}

function writeConfig(cfg: Config): void {
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig));
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig || typeof rawConfig !== "object") {
        throw new Error("Invalid data: not an object");
    }

    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("Invalid data: db_url must be a string");
    }

    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("Invalid data: current_user_name must be a string");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };

    return config;
}
