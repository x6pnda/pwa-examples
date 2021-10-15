enum FetchMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

export interface IFetchResult<T> {
    data?: T;
    code: number;
    status: string;
    success: boolean;
}

export const $fetch = async <T>(url: string, options: { body?: object, method?: FetchMethod, baseUrl?: string, cors?: boolean } = { method: FetchMethod.GET }): Promise<IFetchResult<T>> => {
    const { method, baseUrl, cors } = options;
    try {
        const options: any = {
            method: method,
            headers: new Headers()
        };
        if (method !== FetchMethod.GET && method !== FetchMethod.POST) options.headers.append('Content-Type', 'application/json');
        if (cors === true) options.headers.append('mode', 'cors');

        // Fetch Request
        const response = await fetch(`${baseUrl && baseUrl}${url}`, options);
        const body = await response.json();

        if (response.ok) return { data: body, code: response.status, status: response.statusText, success: true }
        else return { data: body, code: response.status, status: response.statusText, success: false }
    } catch (err) {
        return { data: undefined, code: 500, status: "Error", success: false }
    }
}