import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() { }

    /**
   * Получить данные из localStorage по ключу.
   * @param key Ключ, по которому хранятся данные.
   * @returns Данные или null, если данные отсутствуют.
   */
    getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /**
   * Сохранить данные в localStorage.
   * @param key Ключ, по которому будут храниться данные.
   * @param data Данные для сохранения.
   */
    setItem<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
    * Удалить данные из localStorage по ключу.
    * @param key Ключ, по которому хранятся данные.
    */
    removeItem<T>(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}