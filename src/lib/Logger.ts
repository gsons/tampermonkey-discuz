
type Option = {
    appName?: string,
    debug: boolean,
}

export class Logger {

    static appName: string;
    static debug: boolean;

    static config(option: Option) {
        const { appName = '', debug = true } = option;
        Logger.appName = appName;
        Logger.debug = debug;
    }

    static log(...info: any) {
        if (Logger.debug) console.log(Logger.appName, new Date().toLocaleString(), ...info);
    }

    static info(...info: any) {
        if (Logger.debug) console.info(Logger.appName, new Date().toLocaleString(), ...info);
    }
    static error(...info: any) {
        console.error(Logger.appName, new Date().toLocaleString(), ...info);
    }
    static warn(...info: any) {
        if (Logger.debug) console.warn(Logger.appName, new Date().toLocaleString(), ...info);
    }
}