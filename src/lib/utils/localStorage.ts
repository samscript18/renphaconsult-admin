import { Admin } from "@/schema/interfaces/admin.interface";

enum StorageItems {
  ADMIN = "admin",
  TOKEN = "accessToken",
}

export class UserStorage {
  static store(admin: Admin) {
    if (typeof window != "undefined") {
      localStorage.setItem(StorageItems.ADMIN, JSON.stringify(admin));
    }
  }

  static get(): Admin | null {
    if (typeof window != "undefined") {
      const userStorage = localStorage.getItem(StorageItems.ADMIN);

      return userStorage ? JSON.parse(userStorage) : null;
    }
    return null;
  }

  static remove() {
    if (typeof window != "undefined") {
      localStorage.removeItem(StorageItems.ADMIN);
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
