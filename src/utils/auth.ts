export function getToken(key: string){
    return localStorage.getItem(key)
}

export function setToken(key: string, value: string){
    return localStorage.setItem(key, value)
}

export function removeToken(key: string){
    return localStorage.removeItem(key)
}