
// @ts-ignore
export function clearData(key: string) :void {
    localStorage.removeItem(key);
}

// @ts-ignore
export function has(key: string) :boolean {
    return localStorage.getItem(key) !== null;
}

export function clear() :void{
    localStorage.clear();
}

// @ts-ignore
export function getData(key: string) : object {
    let storage: any = window.localStorage;
    return JSON.parse(storage.getItem(key));
}

// @ts-ignore
export function setData(key: string, data: any) :void {
    localStorage.setItem(key, JSON.stringify(data));
}