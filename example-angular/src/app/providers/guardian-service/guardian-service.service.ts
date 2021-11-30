import { Injectable } from '@angular/core';
import { IFetchResult } from 'src/app/interfaces/IFetchResult';
import { IGuardianResponse } from 'src/app/interfaces/IGuardianResponse';
import { HttpService } from '../http-service/http.service';

@Injectable({
    providedIn: 'root',
})
export class GuardianService {
    constructor(private httpService: HttpService) {}

    async fetchGamesHeadlines(): Promise<IFetchResult<IGuardianResponse>> {
        try {
            const response = await this.httpService.get<IGuardianResponse>('/search', 'https://content.guardianapis.com', {
                q: 'games',
                'api-key': 'b27f5edc-61a1-4841-9d4f-d04910032ffb',
            });
            if (!response || response.body === null) throw new Error('Invalid response received!');
            if (response.ok) return { data: response.body, code: response.status, message: response.statusText, success: true };
            else return { data: response.body, code: response.status, message: response.statusText, success: false };
        } catch (err) {
            return { data: undefined, code: 500, message: 'Error', success: false };
        }
    }
}
