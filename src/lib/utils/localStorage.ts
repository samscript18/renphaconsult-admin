import { User } from "@/schema/interfaces/admin.interface";

enum StorageItems {
  USER = "user",
  TOKEN = "accessToken",
}

export class UserStorage {
  static store(user: User) {
    if (typeof window != "undefined") {
      localStorage.setItem(StorageItems.USER, JSON.stringify(user));
    }
  }

  static get(): User | null {
    if (typeof window != "undefined") {
      const userStorage = localStorage.getItem(StorageItems.USER);

      return userStorage ? JSON.parse(userStorage) : null;
    }
    return null;
  }

  static remove() {
    if (typeof window != "undefined") {
      localStorage.removeItem(StorageItems.USER);
    }
  }
}

export class TokenStorage {
  static store(token: string) {
    if (typeof window != "undefined") {
      localStorage.setItem(StorageItems.TOKEN, token);
    }
  }

  static get(): string | null {
    if (typeof window != "undefined") {
      return localStorage.getItem(StorageItems.TOKEN);
    }
    return null;
  }

  static remove() {
    if (typeof window != "undefined") {
      localStorage.removeItem(StorageItems.TOKEN);
    }
  }
}
