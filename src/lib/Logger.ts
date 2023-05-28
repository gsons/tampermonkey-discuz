
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

    static traceCall() {
        const error = new Error();
        if(error.stack){
            const stackLines = error.stack.split("\n");
            if(stackLines[3]){
                return stackLines[3];
            }
        }
        return '';
    }

    static log(...info: any) {
        const trace=Logger.traceCall();
        info=[...info,trace];
        if (Logger.debug) console.log(Logger.appName, new Date().toLocaleString(), ...info);
    }

    static info(...info: any) {
        const trace=Logger.traceCall();
        info=[...info,trace];
        if (Logger.debug) console.info(Logger.appName, new Date().toLocaleString(), ...info);
    }
    static error(...info: any) {
        console.error(Logger.appName, new Date().toLocaleString(), ...info);
    }
    static warn(...info: any) {
        const trace=Logger.traceCall();
        info=[...info,trace];
        if (Logger.debug) console.warn(Logger.appName, new Date().toLocaleString(), ...info);
    }
}