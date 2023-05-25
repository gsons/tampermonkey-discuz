import { GM_xmlhttpRequest, XhrRequest, TResponse, ErrorResponse } from "$";

type _Option = Pick<XhrRequest, 'method' | 'headers' | 'data'>;

type Option = {
    [K in keyof _Option as K extends 'data' ? 'body' : K]: _Option[K];
};


class Response {

    private str?: string;

    constructor(text: string) {
        this.str = text;
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
            const { method = 'GET', headers = {}, body = '' } = option;
            const requestOptions: XhrRequest = {
                method: method,
                headers: headers,
                data: '',
                url: url,
                onload: (response: TResponse<object>) => {
                    if (response.status >= 200 && response.status < 400) {
                        resolve(new Response(response.responseText));
                    } else {
                        reject('Http status error:' + response.responseText);
                    }
                },
                onerror: (err: ErrorResponse) => {
                    reject('Http response error:' + JSON.stringify(err));
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