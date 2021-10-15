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
export interface IFetchOptions {
    body?: object;
    method?: FetchMethod;
    baseUrl?: string;
    cors?: boolean
}

export const useFetch = async <T>(url: string, options?: RequestInit, method: FetchMethod = FetchMethod.GET): Promise<IFetchResult<T>> => {
    const { data, code, status, success }: IFetchResult<T> = await fetchData(url, options, method);
    return { data, code, status, success }
}

export const fetchData = async <T>(url: string, options?: RequestInit, method: FetchMethod = FetchMethod.GET): Promise<IFetchResult<T>> => {
    try {
        const fetchOptions: RequestInit = {
            ...(options ? options : {}),
            method: method,
        };

        // Fetch Request
        const response = await fetch(`${url}`, fetchOptions);
        const body = await response.json();

        if (response.ok) return { data: body, code: response.status, status: response.statusText, success: true }
        else return { data: body, code: response.status, status: response.statusText, success: false }
    } catch (err) {
        return { data: undefined, code: 500, status: "Error", success: false }
    }
}