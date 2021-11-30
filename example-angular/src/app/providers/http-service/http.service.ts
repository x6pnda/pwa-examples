import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpError from 'src/app/errors/HttpError';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private httpClient: HttpClient) {}

    public async get<returnType>(endpoint: string, base: string, searchParams?: Record<string, string>): Promise<HttpResponse<returnType>> {
        try {
            const url = new URL(endpoint, base);
            for (const searchKey in searchParams) {
                url.searchParams.set(searchKey, searchParams[searchKey]);
            }
            const response = await this.httpClient.get<returnType>(url.href, this.getHttpOptions(false)).toPromise();
            return response;
        } catch (err) {
            if (err instanceof HttpError) throw err;
            else throw new HttpError(`Fout opgetreden bij GET request naar ${endpoint}`);
        }
    }

    private getHttpOptions(reportProgress: boolean): HttpOptions {
        let headers: HttpHeaders = new HttpHeaders({ Accept: 'application/json' });

        const httpOptions = {
            headers,
            reportProgress,
            observe: 'response' as 'response',
        };
        return httpOptions;
    }
}

interface HttpOptions {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    observe: 'response';
    params?: HttpParams | HttpParameters;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

interface HttpParameters {
    [param: string]: string; // | string[];
    // The above shown alternative type variant is accepted by the httpClient,
    // however the parse function of this service cant properly handle it.
}
