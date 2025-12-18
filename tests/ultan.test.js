const {
  stringFormat, greet, isEmpty, deepClone, debounce, throttle,
  setNestedProperty, getNestedProperty, objectToArray, arrayToObject,
  mergeArrays, sumArray, averageArray, arrayDifference, removeFalsyValues,
  groupBy, getType, getRandomInRange, round, generateUUID, reqFlow,
  toTitleCase, sanitizeString, fromBase64, toBase64, countOccurrences, formatDate,
  isValidFhir, getFhirName, getAcuityScore,
  fillPrompt, parseAiJson, createSignal,
  maskPHI, isZombie,
  regexes, DaysOfWeek, HttpStatus
} = require("../src/ultan");

describe("Ultan Utility Library", () => {
  
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
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
        name: [{ given: ["John", "Q."], family: "Doe", use: "official" }]
      };
      expect(getFhirName(patient)).toBe("John Q. Doe");
      expect(getFhirName({})).toBe("Unknown");
    });

    test("getAcuityScore calculates MEWS correctly", () => {
      const stats = { hr: 120, rr: 20, temp: 37, sbp: 80 };
      expect(getAcuityScore(stats)).toBe(5); 
    });
  });

  describe("AI & Modern Flow", () => {
    test("fillPrompt replaces double-bracket variables", () => {
      const template = "Identify the {{specialty}} in {{location}}.";
      const vars = { specialty: "Cardiologist", location: "Detroit" };
      expect(fillPrompt(template, vars)).toBe("Identify the Cardiologist in Detroit.");
    });

    test("parseAiJson cleans Markdown blocks", () => {
      const raw = "```json\n{ \"status\": \"stable\" }\n```";
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
      expect(masked).toBe("Patient [SSN_MASKED] ([PHONE_MASKED]) [EMAIL_MASKED]");
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
      expect(console.log).toHaveBeenCalledWith("Hello, Doc! You are 40 years old.");
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
      const arr = [1, 2, 2, 3];
      expect(mergeArrays([1], [2])).toEqual([1, 2]);
      expect(sumArray(arr)).toBe(8);
      expect(averageArray([2, 4])).toBe(3);
      expect(arrayDifference([1, 2], [2])).toEqual([1]);
      expect(removeFalsyValues([0, 1, false])).toEqual([1]);
      const grouped = groupBy([{ id: 1, g: 'a' }], 'g');
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
        json: () => Promise.resolve({ ok: true })
      });
      const res = await reqFlow("url");
      expect(res.ok).toBe(true);
    });
  });

  describe("Constants & Regex", () => {
    test("regexes validate correctly", () => {
      expect(regexes.email.test("test@test.com")).toBe(true);
      expect(regexes.url.test("https://vgs.studio")).toBe(true);
    });

    test("Enums are frozen", () => {
      expect(DaysOfWeek.MONDAY).toBe("Monday");
      expect(HttpStatus.OK).toBe(200);
      expect(Object.isFrozen(HttpStatus)).toBe(true);
    });
  });
});