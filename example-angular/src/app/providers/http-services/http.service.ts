import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../account-services/auth.service';
import { InternetAccessService } from './internet-access.service';
import HttpError from 'src/app/errors/HttpError';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private authAccountService: AuthService, private internetAccessService: InternetAccessService) { }

  public async get<returnType>(endpoint: string, params: HttpParameters = null, useAccessToken: boolean = true, reportProgress: boolean = false): Promise<HttpResponse<returnType>> {
    try {
      this.checkInternetAccess();
      const url = this.parseUrl(this.getUrl(endpoint), params);
      const response = await this.httpClient.get<returnType>(url, await this.getHttpOptions(params, useAccessToken, reportProgress)).toPromise();
      if (response.ok) {
        this.authAccountService.extendTokenExpiration();
      }
      return response;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      else throw new HttpError(`Fout opgetreden bij GET request naar ${endpoint}`);
    }
  }

  public async post<returnType>(endpoint: string, body: any, params: HttpParameters = null, useAccessToken: boolean = true, reportProgress: boolean = false): Promise<HttpResponse<returnType>> {
    try {
      this.checkInternetAccess();
      const url = this.parseUrl(this.getUrl(endpoint), params);
      const response = await this.httpClient.post<returnType>(url, body, await this.getHttpOptions(params, useAccessToken, reportProgress)).toPromise();
      if (response.ok) {
        this.authAccountService.extendTokenExpiration();
      }
      return response;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      else throw new HttpError(`Fout opgetreden bij POST request naar ${endpoint}`);
    }
  }

  public async put<returnType>(endpoint: string, body: any, params: HttpParameters = null, useAccessToken: boolean = true, reportProgress: boolean = false): Promise<HttpResponse<returnType>> {
    try {
      this.checkInternetAccess();
      const url = this.parseUrl(this.getUrl(endpoint), params);
      const response = await this.httpClient.put<returnType>(url, body, await this.getHttpOptions(params, useAccessToken, reportProgress)).toPromise();
      if (response.ok) {
        this.authAccountService.extendTokenExpiration();
      }
      return response;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      else throw new HttpError(`Fout opgetreden bij PUT request naar ${endpoint}`);
    }
  }

  public async delete<returnType>(endpoint: string, params: HttpParameters = null, useAccessToken: boolean = true, reportProgress: boolean = false): Promise<HttpResponse<returnType>> {
    try {
      this.checkInternetAccess();
      const url = this.parseUrl(this.getUrl(endpoint), params);
      const response = await this.httpClient.delete<returnType>(url, await this.getHttpOptions(params, useAccessToken, reportProgress)).toPromise();
      if (response.ok) {
        this.authAccountService.extendTokenExpiration();
      }
      return response;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      else throw new HttpError(`Fout opgetreden bij DELETE request naar ${endpoint}`);
    }
  }

  private checkInternetAccess() {
    if (!this.internetAccessService.hasInternetConnection) throw new HttpError("Can't execute HTTP request : No internet connection");
  }

  public getProperlyTyped<T>(fakeInstance: T, emptyObjectInstance: T): T {
    Object.keys(emptyObjectInstance).forEach((key) => {
      emptyObjectInstance[key] = fakeInstance[key] ? fakeInstance[key] : null;
    });

    return emptyObjectInstance;
  }

  private getUrl(endpointExtensionUrl: string): string {
    return environment.backendEndpoint + endpointExtensionUrl;
  }

  private parseUrl(url: string, parameters: HttpParameters): string {
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        url = url.replace('{' + key + '}', parameters[key]);
      });
    }
    return url;
  }

  private async getHttpOptions(parameters: HttpParameters, useAccessToken: boolean, reportProgress: boolean): Promise<HttpOptions> {
    let headers: HttpHeaders = new HttpHeaders({ Accept: 'application/json' });
    if (useAccessToken) headers = await this.authAccountService.addAuthorizationHeader(headers);

    const httpOptions = {
      headers,
      reportProgress,
      params: new HttpParams({ fromObject: parameters }),
      observe: 'response' as 'response'
    };
    return httpOptions;
  }
}

interface HttpOptions {
  headers?: HttpHeaders | {
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

