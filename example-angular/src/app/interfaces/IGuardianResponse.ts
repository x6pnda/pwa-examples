import { INewsItem } from './INewsItem';

export interface IGuardianResponse {
    response: {
        currentPage: number;
        orderBy: string;
        pageSize: number;
        pages: number;
        results: INewsItem[];
        startIndex: number;
        status: string;
        total: number;
        userTier: string;
    };
}
