/**
 * ULTAN.JS - The Swiss Army Knife for Development
 * Integrates Legacy Utilities with AI, HealthTech, and Cloud Logic.
 */

const isValidFhir = (res) => !!(res?.resourceType && res?.id);

const getFhirName = (p) => {
  const n = p?.name?.find(x => x.use === 'official') || p?.name?.[0];
  return n ? `${n.given?.join(' ')} ${n.family}`.trim() : "Unknown";
};

const getAcuityScore = ({ hr, rr, temp, sbp }) => {
  let score = 0;
  if (hr > 110 || hr < 50) score += 2;
  if (rr > 24 || rr < 10) score += 3;
  if (sbp < 90) score += 3;
  return score; 
};

const fillPrompt = (tmp, vars) => tmp.replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] ?? m);

const parseAiJson = (str) => {
  const clean = str.replace(/```json|```/g, "").trim();
  try { return JSON.parse(clean); } catch { return null; }
};

const createSignal = (val) => {
  const subs = new Set();
  return {
    get: () => val,
    set: (v) => { val = v; subs.forEach(f => f(v)); },
    subscribe: (f) => { subs.add(f); return () => subs.delete(f); }
  };
};

const maskPHI = (str) => str
  .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_MASKED]")
  .replace(/\b\d{10}\b/g, "[PHONE_MASKED]")
  .replace(/\S+@\S+\.\S+/g, "[EMAIL_MASKED]");

/** Detects "Zombie" sessions or stagnant heartbeats */
const isZombie = (last, limit = 300000) => (Date.now() - new Date(last).getTime()) > limit;

function stringFormat(format, ...args) {
  return format.replace(/{(\d+)}/g, (match, number) => typeof args[number] != "undefined" ? args[number] : match);
}

const greet = ({ name = "User", age = "unknown" } = {}) => console.log(`Hello, ${name}! You are ${age} years old.`);

const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

const deepClone = (obj) => {
  try { return structuredClone(obj); } catch { return JSON.parse(JSON.stringify(obj)); }
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

const getNestedProperty = (obj, path) => path.split(".").reduce((p, c) => (p ? p[c] : null), obj);

const objectToArray = (obj) => Object.entries(obj);
const arrayToObject = (arr) => arr.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
const mergeArrays = (a1, a2) => [...new Set([...a1, ...a2])];
const sumArray = (arr) => arr.reduce((a, b) => a + (Number(b) || 0), 0);
const averageArray = (arr) => arr.length ? sumArray(arr) / arr.length : 0;
const arrayDifference = (a1, a2) => a1.filter((x) => !a2.includes(x));
const removeFalsyValues = (arr) => arr.filter(Boolean);

const groupBy = (arr, key) => arr.reduce((res, curr) => {
  (res[curr[key]] = res[curr[key]] || []).push(curr);
  return res;
}, {});

const getType = (v) => Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
const round = (num, dec = 2) => Number(Math.round(num + "e" + dec) + "e-" + dec);
const generateUUID = () => crypto.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = (Math.random() * 16) | 0;
  return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
});

async function reqFlow(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
const sanitizeString = (str) => {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

const fromBase64 = (b64) => decodeURIComponent(escape(atob(b64)));
const toBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
const countOccurrences = (str, sub) => str.split(sub).length - 1;
const formatDate = (date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

const regexes = {
  email: /\S+@\S+\.\S+/,
  phone: /\+?[1-9]\d{1,14}/,
  url: /^(http|https):\/\/[^ "]+$/,
};

const DaysOfWeek = Object.freeze({
  MONDAY: "Monday", TUESDAY: "Tuesday", WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday", FRIDAY: "Friday", SATURDAY: "Saturday", SUNDAY: "Sunday"
});

const HttpStatus = Object.freeze({
  OK: 200, CREATED: 201, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404, SERVER_ERROR: 500
});

module.exports = {
  stringFormat, greet, isEmpty, deepClone, debounce, throttle, 
  setNestedProperty, getNestedProperty, objectToArray, arrayToObject,
  mergeArrays, sumArray, averageArray, arrayDifference, removeFalsyValues,
  groupBy, getType, getRandomInRange, round, generateUUID, reqFlow,
  toTitleCase, sanitizeString, fromBase64, toBase64, countOccurrences, formatDate,
  isValidFhir, getFhirName, getAcuityScore,
  fillPrompt, parseAiJson, createSignal,
  maskPHI, isZombie,
  regexes, DaysOfWeek, HttpStatus
};