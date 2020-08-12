export interface CacheRepo<T> {
    exists(key: string): Promise<boolean>;
    save(key: string, value: T): Promise<void>;
}
