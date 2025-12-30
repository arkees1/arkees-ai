/**
 * Generic KV interface
 */
export interface KV<T> {
  get(key: string): Promise<T | undefined>;
  set(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  values(): Promise<T[]>;
}

/**
 * In-memory KV (used for usage logger, dev, tests)
 */
export class MemoryKV<T> implements KV<T> {
  private store = new Map<string, T>();

  async get(key: string): Promise<T | undefined> {
    return this.store.get(key);
  }

  async set(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async values(): Promise<T[]> {
    return Array.from(this.store.values());
  }
}

/**
 * Redis-backed KV (stubbed)
 */
export class RedisKV<T> implements KV<T> {
  constructor(private prefix: string) {}

  async get(_key: string): Promise<T | undefined> {
    return undefined;
  }

  async set(_key: string, _value: T): Promise<void> {
    return;
  }

  async delete(_key: string): Promise<void> {
    return;
  }

  async values(): Promise<T[]> {
    return [];
  }
}
