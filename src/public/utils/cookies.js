const storeCookie = (key, value) => {
    document.cookie = `${key}=${value};path=/`
}

const retrieveCookie = (key) => {
    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(`${key}=`))
        ?.split("=")[1];
}

const removeCookie = key => {
    document.cookie = `${key}=; expires=Thu, 01, Jan 1970 00:00:00`;
}

export { storeCookie, retrieveCookie, removeCookie };