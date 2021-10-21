enum FetchMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface IFetchResult<T> {
	data?: T;
	code: number;
	message: string;
	success: boolean;
}
// https://content.guardianapis.com/sections?q=games&api-key=b27f5edc-61a1-4841-9d4f-d04910032ffb
export const useFetchAPI = async <T>(url: string, section: string, options?: RequestInit, searchParams?: Record<string, string>): Promise<IFetchResult<T>> => {
	const guardianUrl: URL = new URL(url, 'https://content.guardianapis.com');
	for (const searchKey in searchParams) {
		guardianUrl.searchParams.set(searchKey, searchParams[searchKey]);
	}
	guardianUrl.searchParams.set('q', section);
	guardianUrl.searchParams.set('api-key', 'b27f5edc-61a1-4841-9d4f-d04910032ffb');

	const fetchResult: IFetchResult<T> = await $fetch(guardianUrl.href, FetchMethod.GET, undefined, options);
	return fetchResult;
};

export const $fetch = async <T>(
	url: string,
	method: FetchMethod = FetchMethod.GET,
	body?: Record<string, unknown>,
	options?: RequestInit
): Promise<IFetchResult<T>> => {
	try {
		// Options
		const _options: RequestInit = {
			...options,
			method: method,
		};
		if (body) _options.body = JSON.stringify(body);
		if (!_options.headers) _options.headers = {};
		if (method !== FetchMethod.GET && method !== FetchMethod.POST) _options.headers = { ..._options.headers, 'Content-Type': 'application/json' };

		// Fetch Request
		const response = await fetch(`${url}`, options);
		const responseBody = await response.json();

		if (response.ok) return { data: responseBody, code: response.status, message: response.statusText, success: true };
		else throw { data: responseBody, code: response.status, message: response.statusText, success: false };
	} catch (err) {
		return { data: undefined, code: 500, message: 'Error', success: false };
	}
};
