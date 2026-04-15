const isValidFhir = (res) => !!(res?.resourceType && res?.id);

const getFhirName = (p) => {
  const n = p?.name?.find((x) => x.use === "official") || p?.name?.[0];
  return n ? `${n.given?.join(" ")} ${n.family}`.trim() : "Unknown";
};

const getAcuityScore = ({ hr, rr, temp, sbp }) => {
  let score = 0;
  if (hr > 110 || hr < 50) score += 2;
  if (rr > 24 || rr < 10) score += 3;
  if (sbp < 90) score += 3;
  return score;
};

const fillPrompt = (tmp, vars) =>
  tmp.replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] ?? m);

const parseAiJson = (str) => {
  const clean = str.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    return null;
  }
};

const createSignal = (val) => {
  const subs = new Set();
  return {
    get: () => val,
    set: (v) => {
      val = v;
      subs.forEach((f) => f(v));
    },
    subscribe: (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
  };
};

const maskPHI = (str) =>
  str
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_MASKED]")
    .replace(/\b\d{10}\b/g, "[PHONE_MASKED]")
    .replace(/\S+@\S+\.\S+/g, "[EMAIL_MASKED]");

const isZombie = (last, limit = 300000) =>
  Date.now() - new Date(last).getTime() > limit;

function stringFormat(format, ...args) {
  return format.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] != "undefined" ? args[number] : match,
  );
}

const greet = ({ name = "User", age = "unknown" } = {}) =>
  console.log(`Hello, ${name}! You are ${age} years old.`);

const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  return Object.keys(obj).length === 0;
};

const deepClone = (obj) => {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
};

const debounce = (func, delay = 300) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const setNestedProperty = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;
  while (keys.length > 1) {
    const key = keys.shift();
    current = current[key] = current[key] || {};
  }
  current[keys[0]] = value;
};

const getNestedProperty = (obj, path) =>
  path.split(".").reduce((p, c) => (p ? p[c] : null), obj);

const objectToArray = (obj) => Object.entries(obj);
const arrayToObject = (arr) =>
  arr.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
const mergeArrays = (a1, a2) => [...new Set([...a1, ...a2])];
const sumArray = (arr) => arr.reduce((a, b) => a + (Number(b) || 0), 0);
const averageArray = (arr) => (arr.length ? sumArray(arr) / arr.length : 0);
const arrayDifference = (a1, a2) => a1.filter((x) => !a2.includes(x));
const removeFalsyValues = (arr) => arr.filter(Boolean);

const groupBy = (arr, key) =>
  arr.reduce((res, curr) => {
    (res[curr[key]] = res[curr[key]] || []).push(curr);
    return res;
  }, {});

const getType = (v) =>
  Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
const round = (num, dec = 2) =>
  Number(Math.round(num + "e" + dec) + "e-" + dec);
const generateUUID = () =>
  crypto.randomUUID?.() ||
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

async function reqFlow(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const toTitleCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
const sanitizeString = (str) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

const fromBase64 = (b64) => decodeURIComponent(escape(atob(b64)));
const toBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
const countOccurrences = (str, sub) => str.split(sub).length - 1;
const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

// --- Array Expansion ---

const flatten = (arr, depth = Infinity) => arr.flat(depth);

const partition = (arr, predicate) =>
  arr.reduce(
    ([pass, fail], item) =>
      predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
    [[], []],
  );

const range = (start, end, step = 1) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
};

const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size));
  return result;
};

const intersect = (a1, a2) => a1.filter((x) => a2.includes(x));

const unique = (arr) => [...new Set(arr)];

const orderBy = (arr, key, order = "asc") =>
  [...arr].sort((a, b) => {
    const valA = typeof key === "function" ? key(a) : a[key];
    const valB = typeof key === "function" ? key(b) : b[key];
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

// --- Object Expansion ---

const pick = (obj, keys) =>
  keys.reduce((acc, k) => {
    if (k in obj) acc[k] = obj[k];
    return acc;
  }, {});

const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

const flipObject = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

// --- String Expansion ---

const _wordSplit = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

const camelCase = (str) => {
  const words = _wordSplit(str);
  return words
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("");
};

const kebabCase = (str) => _wordSplit(str).join("-");

const snakeCase = (str) => _wordSplit(str).join("_");

const pascalCase = (str) =>
  _wordSplit(str)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

const truncate = (str, length, suffix = "...") => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// --- Function Expansion ---

const once = (fn) => {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
};

const memoize = (fn, keyFn = (...args) => JSON.stringify(args)) => {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((acc, fn) => fn(acc), val);

const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((acc, fn) => fn(acc), val);

// --- Number Expansion ---

const clamp = (min, val, max) => Math.min(Math.max(val, min), max);

const isPrime = (n) => {
  if (typeof n !== "number" || n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

// --- DateTime Utilities ---

const DATE_UNITS = {
  millisecond: 1,
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
  week: 604800000,
};

const addTime = (date, amount, unit) => {
  const d = new Date(date);
  if (unit === "month") {
    d.setMonth(d.getMonth() + amount);
    return d;
  }
  if (unit === "year") {
    d.setFullYear(d.getFullYear() + amount);
    return d;
  }
  return new Date(d.getTime() + amount * (DATE_UNITS[unit] ?? 0));
};

const subtractTime = (date, amount, unit) => addTime(date, -amount, unit);

const startOf = (date, unit) => {
  const d = new Date(date);
  if (unit === "day") {
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (unit === "month") {
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (unit === "year") {
    d.setMonth(0, 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (unit === "week") {
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (unit === "hour") {
    d.setMinutes(0, 0, 0);
    return d;
  }
  return d;
};

const endOf = (date, unit) => {
  const d = new Date(date);
  if (unit === "day") {
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (unit === "month") {
    d.setMonth(d.getMonth() + 1, 0);
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (unit === "year") {
    d.setMonth(11, 31);
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (unit === "week") {
    const day = d.getDay();
    d.setDate(d.getDate() + (6 - day));
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (unit === "hour") {
    d.setMinutes(59, 59, 999);
    return d;
  }
  return d;
};

const isBefore = (date1, date2) =>
  new Date(date1).getTime() < new Date(date2).getTime();

const isAfter = (date1, date2) =>
  new Date(date1).getTime() > new Date(date2).getTime();

const isSameDay = (date1, date2) => {
  const a = new Date(date1),
    b = new Date(date2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const diffDates = (date1, date2, unit = "day") => {
  const ms = new Date(date2).getTime() - new Date(date1).getTime();
  if (unit === "month") {
    const a = new Date(date1),
      b = new Date(date2);
    return (
      (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
    );
  }
  if (unit === "year") {
    const a = new Date(date1),
      b = new Date(date2);
    return b.getFullYear() - a.getFullYear();
  }
  return Math.floor(ms / (DATE_UNITS[unit] ?? DATE_UNITS.day));
};

const isWeekend = (date) => {
  const d = new Date(date).getDay();
  return d === 0 || d === 6;
};

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const formatRelative = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const abs = Math.abs(diff);
  const future = diff < 0;
  const suffix = future ? "from now" : "ago";
  if (abs < 60000) return "just now";
  if (abs < 3600000)
    return `${Math.floor(abs / 60000)} minute${Math.floor(abs / 60000) !== 1 ? "s" : ""} ${suffix}`;
  if (abs < 86400000)
    return `${Math.floor(abs / 3600000)} hour${Math.floor(abs / 3600000) !== 1 ? "s" : ""} ${suffix}`;
  if (abs < 2592000000)
    return `${Math.floor(abs / 86400000)} day${Math.floor(abs / 86400000) !== 1 ? "s" : ""} ${suffix}`;
  if (abs < 31536000000)
    return `${Math.floor(abs / 2592000000)} month${Math.floor(abs / 2592000000) !== 1 ? "s" : ""} ${suffix}`;
  return `${Math.floor(abs / 31536000000)} year${Math.floor(abs / 31536000000) !== 1 ? "s" : ""} ${suffix}`;
};

const regexes = {
  email: /\S+@\S+\.\S+/,
  phone: /\+?[1-9]\d{1,14}/,
  url: /^(http|https):\/\/[^ "]+$/,
};

const DaysOfWeek = Object.freeze({
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
});

const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

module.exports = {
  stringFormat,
  greet,
  isEmpty,
  deepClone,
  debounce,
  throttle,
  setNestedProperty,
  getNestedProperty,
  objectToArray,
  arrayToObject,
  mergeArrays,
  sumArray,
  averageArray,
  arrayDifference,
  removeFalsyValues,
  groupBy,
  getType,
  getRandomInRange,
  round,
  generateUUID,
  reqFlow,
  toTitleCase,
  sanitizeString,
  fromBase64,
  toBase64,
  countOccurrences,
  formatDate,
  isValidFhir,
  getFhirName,
  getAcuityScore,
  fillPrompt,
  parseAiJson,
  createSignal,
  maskPHI,
  isZombie,
  flatten,
  partition,
  range,
  chunk,
  intersect,
  unique,
  orderBy,
  pick,
  omit,
  flipObject,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  capitalize,
  once,
  memoize,
  pipe,
  compose,
  clamp,
  isPrime,
  addTime,
  subtractTime,
  startOf,
  endOf,
  isBefore,
  isAfter,
  isSameDay,
  diffDates,
  isWeekend,
  isLeapYear,
  daysInMonth,
  formatRelative,
  regexes,
  DaysOfWeek,
  HttpStatus,
};
