import util from "node:util";

type ConsoleMethod = (...args: unknown[]) => void;

const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
};

// Colors (simple + cross-platform)
const COLORS = {
    reset: "\x1b[0m",
    gray: "\x1b[90m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
};

// Serialize any type safely
const formatArgs = (args: unknown[]) =>
    args
        .map((arg) =>
            typeof arg === "object"
                ? util.inspect(arg, { colors: true, depth: 4 })
                : String(arg)
        )
        .join(" ");

// Build final pretty output
const formatOutput = (level: string, color: string, args: unknown[]) => {
    const timestamp = new Date().toISOString();
    const prefix = `${COLORS.gray}[${timestamp}]${COLORS.reset}`;
    const tag = `${color}${level.toUpperCase()}${COLORS.reset}`;
    return `${prefix} ${tag} → ${formatArgs(args)}`;
};

// Override functions
console.log = (...args: unknown[]) => {
    originalConsole.log(formatOutput("log", COLORS.blue, args));
};

console.info = (...args: unknown[]) => {
    originalConsole.info(formatOutput("info", COLORS.magenta, args));
};

console.warn = (...args: unknown[]) => {
    originalConsole.warn(formatOutput("warn", COLORS.yellow, args));
};

console.error = (...args: unknown[]) => {
    originalConsole.error(formatOutput("error", COLORS.red, args));
};

console.debug = (...args: unknown[]) => {
    originalConsole.debug(formatOutput("debug", COLORS.gray, args));
};

// Export once to initialize
export const initPrettyConsole = () => true;


