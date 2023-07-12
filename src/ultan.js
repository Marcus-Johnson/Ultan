function stringFormat(format, ...args) {
    return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
}

function greet({ name = "User", age = "unknown" } = {}) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function debounce(func, delay = 300) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    while (keys.length > 1) {
        const key = keys.shift();
        current = current[key] = current[key] || {};
    }
    current[keys[0]] = value;
}

function objectToArray(obj) {
    return Object.entries(obj);
}

function mergeArrays(array1, array2) {
    return [...new Set([...array1, ...array2])];
}

function sumArray(array) {
    return array.reduce((a, b) => a + b, 0);
}

function averageArray(array) {
    return sumArray(array) / array.length;
}

function arrayDifference(array1, array2) {
    return array1.filter(x => !array2.includes(x));
}

function arrayToObject(array) {
    return array.reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
}

function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}

const regexes = {
    email: /\S+@\S+\.\S+/,
    phone: /\+?[1-9]\d{1,14}/,
    url: /^(http|https):\/\/[^ "]+$/,
};

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getType(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}


function removeFalsyValues(array) {
    return array.filter(Boolean);
}

function getNestedProperty(obj, keyPath) {
    return keyPath.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null
    }, obj);
}

function formatDate(date, format = 'YYYY-MM-DD') {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function round(number, decimalPlaces = 2) {
    return Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function reqFlow(url, options = {}) {
    const response = await fetch(url, options);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP request failed with status ${response.status}`);
    }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function sanitizeString(input) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return input.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function fromBase64(base64) {
    return decodeURIComponent(escape(atob(base64)));
}

function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function countOccurrences(string, substring) {
    return string.split(substring).length - 1;
}

const DaysOfWeek = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday'
};

const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

module.exports = {
    stringFormat,
    greet,
    isEmpty,
    deepClone,
    debounce,
    setNestedProperty,
    objectToArray,
    mergeArrays,
    sumArray,
    averageArray,
    arrayDifference,
    arrayToObject,
    groupBy,
    regexes,
    getRandomInRange,
    getType,
    removeFalsyValues,
    getNestedProperty,
    formatDate,
    throttle,
    round,
    generateUUID,
    reqFlow,
    toTitleCase,
    sanitizeString,
    fromBase64,
    toBase64,
    countOccurrences,
    DaysOfWeek,
    HttpStatus
};
