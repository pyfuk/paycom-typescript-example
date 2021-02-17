export interface RequestBodyRPC<T> {
    method: string
    id: number
    params: T;
}
