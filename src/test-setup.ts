import "@testing-library/jest-dom";

const hasCompleteLocalStorage =
  typeof globalThis.localStorage !== "undefined" &&
  typeof globalThis.localStorage.getItem === "function" &&
  typeof globalThis.localStorage.setItem === "function" &&
  typeof globalThis.localStorage.removeItem === "function" &&
  typeof globalThis.localStorage.clear === "function";

if (!hasCompleteLocalStorage) {
  const storage = new Map<string, string>();

  const localStorageMock: Storage = {
    get length() {
      return storage.size;
    },
    clear() {
      storage.clear();
    },
    getItem(key: string) {
      return storage.has(key) ? storage.get(key)! : null;
    },
    key(index: number) {
      return Array.from(storage.keys())[index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(key);
    },
    setItem(key: string, value: string) {
      storage.set(key, String(value));
    },
  };

  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
}
