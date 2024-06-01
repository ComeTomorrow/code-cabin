//
export function getLocalStorage(key: string){
    return localStorage.getItem(key)
}

export function setLocalStorage(key: string, value: string){
    return localStorage.setItem(key, value)
}

export function removeLocalStorage(key: string){
    return localStorage.removeItem(key)
}

export function removeAllLocalStorage(){
    return localStorage.clear()
}

export function getSessionStorageKey(index: number){
    return sessionStorage.key(index)
}

export function getSessionStorage(key: string){
    return sessionStorage.getItem(key)
}

export function setSessionStorage(key: string, value: string){
    return sessionStorage.setItem(key, value)
}

export function removeSessionStorage(key: string){
    return sessionStorage.removeItem(key)
}

export function removeAllSessionStorage(){
    return sessionStorage.clear()
}