const {
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
} = require("../src/ultan");

describe("Ultan Utility Library", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Healthcare & FHIR Utilities", () => {
    test("isValidFhir validates resource structure", () => {
      expect(isValidFhir({ resourceType: "Patient", id: "123" })).toBe(true);
      expect(isValidFhir({ name: "John" })).toBe(false);
    });

    test("getFhirName extracts formatted name", () => {
      const patient = {
        name: [{ given: ["John", "Q."], family: "Doe", use: "official" }],
      };
      expect(getFhirName(patient)).toBe("John Q. Doe");
      expect(getFhirName({})).toBe("Unknown");
    });

    test("getAcuityScore calculates MEWS correctly", () => {
      expect(getAcuityScore({ hr: 120, rr: 20, temp: 37, sbp: 80 })).toBe(5);
    });
  });

  describe("AI & Modern Flow", () => {
    test("fillPrompt replaces double-bracket variables", () => {
      const template = "Identify the {{specialty}} in {{location}}.";
      const vars = { specialty: "Cardiologist", location: "Detroit" };
      expect(fillPrompt(template, vars)).toBe(
        "Identify the Cardiologist in Detroit.",
      );
    });

    test("parseAiJson cleans Markdown blocks", () => {
      const raw = '```json\n{ "status": "stable" }\n```';
      expect(parseAiJson(raw)).toEqual({ status: "stable" });
      expect(parseAiJson("invalid")).toBeNull();
    });

    test("createSignal handles state subscription", () => {
      const signal = createSignal(10);
      const spy = jest.fn();
      signal.subscribe(spy);
      signal.set(20);
      expect(spy).toHaveBeenCalledWith(20);
      expect(signal.get()).toBe(20);
    });
  });

  describe("Security & Cloud", () => {
    test("maskPHI redacts sensitive information", () => {
      const log = "Patient 123-45-6789 (5551234567) test@test.com";
      const masked = maskPHI(log);
      expect(masked).toBe(
        "Patient [SSN_MASKED] ([PHONE_MASKED]) [EMAIL_MASKED]",
      );
    });

    test("isZombie detects stagnant heartbeats", () => {
      const ancient = new Date(Date.now() - 600000);
      expect(isZombie(ancient)).toBe(true);
      expect(isZombie(new Date())).toBe(false);
    });
  });

  describe("Legacy Core Utilities", () => {
    test("stringFormat and greet", () => {
      expect(stringFormat("{0} {1}", "A", "B")).toBe("A B");
      greet({ name: "Doc", age: 40 });
      expect(console.log).toHaveBeenCalledWith(
        "Hello, Doc! You are 40 years old.",
      );
    });

    test("isEmpty and deepClone", () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty([1])).toBe(false);
      const obj = { a: 1 };
      expect(deepClone(obj)).toEqual(obj);
      expect(deepClone(obj)).not.toBe(obj);
    });

    test("debounce logic", () => {
      const func = jest.fn();
      const debounced = debounce(func, 1000);
      debounced();
      debounced();
      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledTimes(1);
    });

    test("throttle logic", () => {
      const func = jest.fn();
      const throttled = throttle(func, 1000);
      throttled();
      throttled();
      expect(func).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(1000);
      throttled();
      expect(func).toHaveBeenCalledTimes(2);
    });

    test("Property manipulation (set/get/objectToArray/arrayToObject)", () => {
      const obj = {};
      setNestedProperty(obj, "a.b", 1);
      expect(getNestedProperty(obj, "a.b")).toBe(1);
      expect(objectToArray({ k: "v" })).toEqual([["k", "v"]]);
      expect(arrayToObject([["k", "v"]])).toEqual({ k: "v" });
    });

    test("Array math and manipulation", () => {
      expect(mergeArrays([1], [2])).toEqual([1, 2]);
      expect(sumArray([1, 2, 2, 3])).toBe(8);
      expect(averageArray([2, 4])).toBe(3);
      expect(arrayDifference([1, 2], [2])).toEqual([1]);
      expect(removeFalsyValues([0, 1, false])).toEqual([1]);
      const grouped = groupBy([{ id: 1, g: "a" }], "g");
      expect(grouped.a).toHaveLength(1);
    });

    test("Types and Randoms", () => {
      expect(getType([])).toBe("array");
      const rand = getRandomInRange(1, 10);
      expect(rand).toBeGreaterThanOrEqual(1);
      expect(round(1.234)).toBe(1.23);
    });

    test("Strings and Formatting", () => {
      expect(toTitleCase("hi there")).toBe("Hi There");
      expect(sanitizeString("<")).toBe("&lt;");
      expect(fromBase64(toBase64("A"))).toBe("A");
      expect(countOccurrences("banana", "a")).toBe(3);
      const date = new Date(2026, 0, 1);
      expect(formatDate(date)).toBe("01/01/2026");
    });

    test("reqFlow handles success", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ok: true }),
      });
      const res = await reqFlow("url");
      expect(res.ok).toBe(true);
    });
  });

  describe("Array Expansion", () => {
    test("flatten collapses nested arrays", () => {
      expect(flatten([[1, [2, 3]], [4]])).toEqual([1, 2, 3, 4]);
      expect(flatten([[1, [2, [3]]]], 1)).toEqual([1, [2, [3]]]);
    });

    test("partition splits by predicate", () => {
      const [pass, fail] = partition([1, 2, 3, 4, 5], (n) => n > 3);
      expect(pass).toEqual([4, 5]);
      expect(fail).toEqual([1, 2, 3]);
    });

    test("range generates number sequences", () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
      expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
    });

    test("chunk splits array into groups", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });

    test("intersect returns common elements", () => {
      expect(intersect([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    test("unique deduplicates", () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test("orderBy sorts by key ascending and descending", () => {
      const data = [{ n: 3 }, { n: 1 }, { n: 2 }];
      expect(orderBy(data, "n").map((x) => x.n)).toEqual([1, 2, 3]);
      expect(orderBy(data, "n", "desc").map((x) => x.n)).toEqual([3, 2, 1]);
    });

    test("orderBy accepts function key", () => {
      const data = [{ v: 10 }, { v: 5 }, { v: 8 }];
      expect(orderBy(data, (x) => x.v).map((x) => x.v)).toEqual([5, 8, 10]);
    });
  });

  describe("Object Expansion", () => {
    test("pick selects specified keys", () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    test("omit excludes specified keys", () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
    });

    test("flipObject swaps keys and values", () => {
      expect(flipObject({ a: "x", b: "y" })).toEqual({ x: "a", y: "b" });
    });
  });

  describe("String Expansion", () => {
    test("camelCase", () => {
      expect(camelCase("the quick brown fox")).toBe("theQuickBrownFox");
      expect(camelCase("the-quick-brown-fox")).toBe("theQuickBrownFox");
      expect(camelCase("the_quick_brown_fox")).toBe("theQuickBrownFox");
    });

    test("kebabCase", () => {
      expect(kebabCase("the quick brown fox")).toBe("the-quick-brown-fox");
      expect(kebabCase("theQuickBrownFox")).toBe("the-quick-brown-fox");
    });

    test("snakeCase", () => {
      expect(snakeCase("the quick brown fox")).toBe("the_quick_brown_fox");
      expect(snakeCase("theQuickBrownFox")).toBe("the_quick_brown_fox");
    });

    test("pascalCase", () => {
      expect(pascalCase("the quick brown fox")).toBe("TheQuickBrownFox");
      expect(pascalCase("the-quick-brown-fox")).toBe("TheQuickBrownFox");
    });

    test("truncate with default and custom suffix", () => {
      expect(truncate("hello world", 8)).toBe("hello...");
      expect(truncate("hello world", 8, "!")).toBe("hello w!");
      expect(truncate("hi", 10)).toBe("hi");
    });

    test("capitalize first character", () => {
      expect(capitalize("hello world")).toBe("Hello world");
      expect(capitalize("HELLO")).toBe("HELLO");
    });
  });

  describe("Function Expansion", () => {
    test("once invokes fn exactly once", () => {
      const fn = jest.fn(() => 42);
      const wrapped = once(fn);
      expect(wrapped()).toBe(42);
      expect(wrapped()).toBe(42);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("memoize caches results", () => {
      const fn = jest.fn((x) => x * 2);
      const memo = memoize(fn);
      expect(memo(5)).toBe(10);
      expect(memo(5)).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(memo(6)).toBe(12);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test("memoize accepts custom key function", () => {
      const fn = jest.fn((a, b) => a + b);
      const memo = memoize(fn, (a, b) => `${a}-${b}`);
      memo(1, 2);
      memo(1, 2);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("pipe passes value through function chain", () => {
      const result = pipe(
        (x) => x + 1,
        (x) => x * 2,
        (x) => x - 3,
      )(5);
      expect(result).toBe(9);
    });

    test("compose applies functions right to left", () => {
      const result = compose(
        (x) => x - 3,
        (x) => x * 2,
        (x) => x + 1,
      )(5);
      expect(result).toBe(9);
    });
  });

  describe("Number Expansion", () => {
    test("clamp restricts value to range", () => {
      expect(clamp(1, 5, 10)).toBe(5);
      expect(clamp(1, 0, 10)).toBe(1);
      expect(clamp(1, 15, 10)).toBe(10);
    });

    test("isPrime identifies prime numbers", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(17)).toBe(true);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(10)).toBe(false);
    });
  });

  describe("DateTime Utilities", () => {
    test("addTime adds days", () => {
      const base = new Date(2026, 0, 1);
      const result = addTime(base, 5, "day");
      expect(result.getDate()).toBe(6);
    });

    test("addTime adds months", () => {
      const base = new Date(2026, 0, 15);
      const result = addTime(base, 2, "month");
      expect(result.getMonth()).toBe(2);
    });

    test("addTime adds years", () => {
      const base = new Date(2026, 0, 1);
      const result = addTime(base, 1, "year");
      expect(result.getFullYear()).toBe(2027);
    });

    test("subtractTime subtracts days", () => {
      const base = new Date(2026, 0, 10);
      const result = subtractTime(base, 5, "day");
      expect(result.getDate()).toBe(5);
    });

    test("startOf returns start of day", () => {
      const d = startOf(new Date(2026, 3, 15, 14, 30, 45), "day");
      expect(d.getHours()).toBe(0);
      expect(d.getMinutes()).toBe(0);
      expect(d.getSeconds()).toBe(0);
    });

    test("startOf returns start of month", () => {
      const d = startOf(new Date(2026, 3, 15), "month");
      expect(d.getDate()).toBe(1);
    });

    test("endOf returns end of day", () => {
      const d = endOf(new Date(2026, 3, 15, 10, 0, 0), "day");
      expect(d.getHours()).toBe(23);
      expect(d.getMinutes()).toBe(59);
      expect(d.getMilliseconds()).toBe(999);
    });

    test("isBefore and isAfter compare dates", () => {
      const a = new Date(2026, 0, 1);
      const b = new Date(2026, 6, 1);
      expect(isBefore(a, b)).toBe(true);
      expect(isAfter(a, b)).toBe(false);
      expect(isAfter(b, a)).toBe(true);
    });

    test("isSameDay compares date equality", () => {
      expect(
        isSameDay(new Date(2026, 3, 15, 10), new Date(2026, 3, 15, 22)),
      ).toBe(true);
      expect(isSameDay(new Date(2026, 3, 15), new Date(2026, 3, 16))).toBe(
        false,
      );
    });

    test("diffDates returns difference in days", () => {
      const a = new Date(2026, 0, 1);
      const b = new Date(2026, 0, 11);
      expect(diffDates(a, b, "day")).toBe(10);
    });

    test("diffDates returns difference in months", () => {
      const a = new Date(2026, 0, 1);
      const b = new Date(2026, 5, 1);
      expect(diffDates(a, b, "month")).toBe(5);
    });

    test("isWeekend detects weekend days", () => {
      expect(isWeekend(new Date(2026, 3, 11))).toBe(true);
      expect(isWeekend(new Date(2026, 3, 12))).toBe(true);
      expect(isWeekend(new Date(2026, 3, 13))).toBe(false);
    });

    test("isLeapYear identifies leap years", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2026)).toBe(false);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1900)).toBe(false);
    });

    test("daysInMonth returns correct day count", () => {
      expect(daysInMonth(2026, 2)).toBe(28);
      expect(daysInMonth(2024, 2)).toBe(29);
      expect(daysInMonth(2026, 1)).toBe(31);
    });

    test("formatRelative returns relative time string", () => {
      jest.useRealTimers();
      const minuteAgo = new Date(Date.now() - 90000);
      expect(formatRelative(minuteAgo)).toMatch(/minute/);
      const hourAgo = new Date(Date.now() - 7200000);
      expect(formatRelative(hourAgo)).toMatch(/hour/);
    });
  });

  describe("Constants & Regex", () => {
    test("regexes validate correctly", () => {
      expect(regexes.email.test("test@test.com")).toBe(true);
      expect(regexes.url.test("https://vgs.studio")).toBe(true);
    });

    test("Enums are frozen and extended", () => {
      expect(DaysOfWeek.MONDAY).toBe("Monday");
      expect(HttpStatus.OK).toBe(200);
      expect(HttpStatus.TOO_MANY_REQUESTS).toBe(429);
      expect(HttpStatus.SERVICE_UNAVAILABLE).toBe(503);
      expect(Object.isFrozen(HttpStatus)).toBe(true);
    });
  });
});
