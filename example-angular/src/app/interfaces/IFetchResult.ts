export interface IFetchResult<T> {
    data?: T;
    code: number;
    message: string;
    success: boolean;
}
