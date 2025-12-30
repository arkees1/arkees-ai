// Generic adapter — today in-memory, tomorrow Postgres/Redis
export interface KV<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  all(): T[];
}

// In-memory implementation
export class MemoryKV<T> implements KV<T> {
  private store = new Map<string, T>();
  get(key: string) {
    return this.store.get(key);
  }
  set(key: string, value: T) {
    this.store.set(key, value);
  }
  all() {
    return Array.from(this.store.values());
  }
}
