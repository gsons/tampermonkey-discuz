import { GM_xmlhttpRequest, XhrRequest, TResponse, ErrorResponse } from "$";
import { Logger } from '../lib/Logger';

type _Option = Pick<XhrRequest, 'method' | 'headers' | 'data' | 'timeout'>;

type Option = {
    [K in keyof _Option as K extends 'data' ? 'body' : K]: _Option[K];
};


class Response {

    private str: string;
    private header: string;

    constructor(text: string,header:string) {
        this.str = text;
        this.header = header;
    }

    public json() {
        let arr;
        try {
            if (this.str) {
                arr = JSON.parse(this.str)
            } else {
                throw new Error('数据为空');
            }
        } catch (error) {
            throw new Error("数据格式错误,解析成json失败:" + JSON.stringify(error));
        }
        return arr;
    }
    public text() {
        return this.str;
    }

    toString(): string {
        return '' + this.str;
    }
}


class Http {
    static fetch(url: string, option: Option = {}): Promise<Response> {
        return new Promise((resolve, reject) => {
            const { method = 'GET', headers = {}, body = '', timeout = 10000 } = option;
            const requestOptions: XhrRequest = {
                method: method,
                headers: headers,
                data: '',
                url: url,
                timeout: timeout,
                onload: (response: TResponse<object>) => {
                    if (response.status >= 200 && response.status < 400) {
                        resolve(new Response(response.responseText,response.responseHeaders));
                    } else {
                        Logger.error(response);
                        reject(new Error('Http status error:' + response.status));
                    }
                },
                onerror: (err: ErrorResponse) => {
                    Logger.error(err);
                    reject(new Error('Http response on error'));
                },
                ontimeout: () => {
                    Logger.error('Http response on timeout');
                    reject(new Error('Http response on timeout'));
                },
            };
            if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
                requestOptions.data = body;
            }
            GM_xmlhttpRequest(requestOptions);
        });
    }

}

export default Http;