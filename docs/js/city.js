function getLang() {
    return navigator.language || navigator.browserLanguage;
}

function cityChangeInit() {
    if (localStorage.lang === undefined) {
        if (getLang() === 'ru' && location.pathname.indexOf('/ru') === -1)
            location.href = '/ru';
        localStorage.lang = getLang();
    }
}

document.addEventListener('DOMContentLoaded', cityChangeInit, false);