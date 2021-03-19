export interface IRequestBodyRPC<T> {
    method: string;
    id: number;
    params: T;
}
