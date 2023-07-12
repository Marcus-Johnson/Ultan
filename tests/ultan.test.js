const {
  stringFormat,
  greet,
  isEmpty,
  deepClone,
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
  round,
  generateUUID,
  toTitleCase,
  sanitizeString,
  fromBase64,
  toBase64,
  countOccurrences,
} = require("../src/ultan");

describe("Ultan Utility Library", () => {
  test("stringFormat function", () => {
    const formattedString = stringFormat(
      "Hello, {0}! You are {1} years old.",
      "John",
      25
    );
    expect(formattedString).toBe("Hello, John! You are 25 years old.");
  });

  test("greet function", () => {
    console.log = jest.fn();
    greet({ name: "John", age: 25 });
    expect(console.log).toHaveBeenCalledWith(
      "Hello, John! You are 25 years old."
    );
  });

  test("isEmpty function", () => {
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty({ name: "John" })).toBeFalsy();
  });

  test("deepClone function", () => {
    const obj = { name: "John", age: 25 };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  test("setNestedProperty function", () => {
    const obj = { name: "John", address: { city: "NYC" } };
    setNestedProperty(obj, "address.city", "LA");
    expect(obj.address.city).toBe("LA");
  });

  test("objectToArray function", () => {
    const obj = { name: "John", age: 25 };
    const array = objectToArray(obj);
    expect(array).toEqual([
      ["name", "John"],
      ["age", 25],
    ]);
  });

  test("mergeArrays function", () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const mergedArray = mergeArrays(array1, array2);
    expect(mergedArray).toEqual([1, 2, 3, 4]);
  });

  test("sumArray function", () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumArray(array)).toBe(15);
  });

  test("averageArray function", () => {
    const array = [1, 2, 3, 4, 5];
    expect(averageArray(array)).toBe(3);
  });

  test("arrayDifference function", () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const diff = arrayDifference(array1, array2);
    expect(diff).toEqual([1]);
  });

  test("arrayToObject function", () => {
    const array = [
      ["name", "John"],
      ["age", 25],
    ];
    const obj = arrayToObject(array);
    expect(obj).toEqual({ name: "John", age: 25 });
  });

  test("groupBy function", () => {
    const array = [
      { category: "Food", item: "Apple" },
      { category: "Food", item: "Banana" },
      { category: "Drink", item: "Water" },
    ];
    const grouped = groupBy(array, "category");
    expect(grouped).toEqual({
      Food: [
        { category: "Food", item: "Apple" },
        { category: "Food", item: "Banana" },
      ],
      Drink: [{ category: "Drink", item: "Water" }],
    });
  });

  test("getRandomInRange function", () => {
    const random = getRandomInRange(1, 10);
    expect(random).toBeGreaterThanOrEqual(1);
    expect(random).toBeLessThanOrEqual(10);
  });

  test("getType function", () => {
    expect(getType({})).toBe("object");
    expect(getType([])).toBe("array");
    expect(getType("")).toBe("string");
    expect(getType(123)).toBe("number");
  });

  test("removeFalsyValues function", () => {
    const array = [0, 1, false, 2, "", 3, null, "a"];
    const cleanedArray = removeFalsyValues(array);
    expect(cleanedArray).toEqual([1, 2, 3, "a"]);
  });

  test("getNestedProperty function", () => {
    const obj = { name: "John", address: { city: "NYC" } };
    const city = getNestedProperty(obj, "address.city");
    expect(city).toBe("NYC");
  });

  test("formatDate function", () => {
    const date = new Date(2022, 0, 1);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("01/01/2022");
  });

  test("round function", () => {
    expect(round(1.2345, 2)).toBe(1.23);
  });

  test("generateUUID function", () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
    );
  });

  test("toTitleCase function", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  test("sanitizeString function", () => {
    const str = "<h1>Hello, World!</h1>";
    expect(sanitizeString(str)).toBe("&lt;h1&gt;Hello, World!&lt;/h1&gt;");
  });

  test("fromBase64 and toBase64 functions", () => {
    const str = "Hello, World!";
    const base64 = toBase64(str);
    expect(fromBase64(base64)).toBe(str);
  });

  test("countOccurrences function", () => {
    const str = "Hello, World!";
    expect(countOccurrences(str, "o")).toBe(2);
  });
});