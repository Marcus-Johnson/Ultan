[![Ultan CI/CD](https://github.com/Marcus-Johnson/Ultan/actions/workflows/node.js.yml/badge.svg)](https://github.com/Marcus-Johnson/Ultan/actions/workflows/node.js.yml)

# Why use Ultan?

Ultan is a utility library that bridges traditional JavaScript development with modern AI, healthcare (FHIR/HL7), and cloud-native architectures. Built for Fortune 500 environments, it provides enterprise-grade functions for string manipulation, array operations, object handling, healthcare data processing, AI prompt management, PHI masking, reactive state management, functional programming patterns, number utilities, and a full date/time toolkit.

Whether you're building HIPAA-compliant healthcare applications, AI-powered workflows, or mission-critical enterprise systems, Ultan delivers production-ready utilities that eliminate boilerplate and accelerate development cycles.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Healthcare (FHIR/HL7)](#healthcare-fhirhl7)
  - [isValidFhir](#isvalidfhirresource)
  - [getFhirName](#getfhirnamepatient)
  - [getAcuityScore](#getacuityscore-hr-rr-temp-sbp-)
  - [maskPHI](#maskphistring)
  - [isZombie](#iszombielastheartbeat-limit--300000)
- [AI Integration](#ai-integration)
  - [fillPrompt](#fillprompttemplate-variables)
  - [parseAiJson](#parseaijsonstring)
  - [createSignal](#createsignalinitialvalue)
- [String Manipulation](#string-manipulation)
  - [stringFormat](#stringformatformat-args)
  - [toTitleCase](#totitlecasestring)
  - [sanitizeString](#sanitizestringstring)
  - [fromBase64 / toBase64](#frombase64base64--tobase64string)
  - [countOccurrences](#countoccurrencesstring-substring)
- [String Expansion](#string-expansion)
  - [camelCase](#camelcasestring)
  - [kebabCase](#kebabcasestring)
  - [snakeCase](#snakecasestring)
  - [pascalCase](#pascalcasestring)
  - [truncate](#truncatestring-length-suffix--)
  - [capitalize](#capitalizestring)
- [Object Utilities](#object-utilities)
  - [isEmpty](#isemptyvalue)
  - [deepClone](#deepcloneobject)
  - [setNestedProperty](#setnestedpropertyobject-path-value)
  - [getNestedProperty](#getnestedpropertyobject-path)
  - [objectToArray / arrayToObject](#objecttoarrayobject--arraytoobjectarray)
- [Object Expansion](#object-expansion)
  - [pick](#pickobject-keys)
  - [omit](#omitobject-keys)
  - [flipObject](#flipobjectobject)
- [Array Utilities](#array-utilities)
  - [mergeArrays](#mergearraysarray1-array2)
  - [sumArray / averageArray](#sumarrayarray--averagearrayarray)
  - [arrayDifference](#arraydifferencearray1-array2)
  - [removeFalsyValues](#removefalsyvaluesarray)
  - [groupBy](#groupbyarray-key)
- [Array Expansion](#array-expansion)
  - [flatten](#flattenarray-depth--infinity)
  - [partition](#partitionarray-predicate)
  - [range](#rangestart-end-step--1)
  - [chunk](#chunkarray-size)
  - [intersect](#intersectarray1-array2)
  - [unique](#uniquearray)
  - [orderBy](#orderbyarray-key-order--asc)
- [Function Utilities](#function-utilities)
  - [debounce](#debouncefunction-delay--300)
  - [throttle](#throttlefunction-limit)
- [Function Expansion](#function-expansion)
  - [once](#oncefn)
  - [memoize](#memoizefn-keyfn)
  - [pipe](#pipefns)
  - [compose](#composefns)
- [Number Utilities](#number-utilities)
  - [getRandomInRange](#getrandominrangemin-max)
  - [round](#roundnumber-decimals--2)
  - [generateUUID](#generateuuid)
- [Number Expansion](#number-expansion)
  - [clamp](#clampmin-val-max)
  - [isPrime](#isprimenumber)
- [DateTime Utilities](#datetime-utilities)
  - [addTime](#addtimedate-amount-unit)
  - [subtractTime](#subtracttimedate-amount-unit)
  - [startOf](#startofdate-unit)
  - [endOf](#endofdate-unit)
  - [isBefore](#isbeforedate1-date2)
  - [isAfter](#isafterdate1-date2)
  - [isSameDay](#issamedaydate1-date2)
  - [diffDates](#diffdatesdate1-date2-unit--day)
  - [isWeekend](#isweekenddate)
  - [isLeapYear](#isleapyearyear)
  - [daysInMonth](#daysinmonthyear-month)
  - [formatRelative](#formatrelativedate)
- [HTTP/Network](#httpnetwork)
  - [reqFlow](#reqflowurl-options--)
- [Miscellaneous](#miscellaneous)
  - [greet](#greet-name-age-)
  - [getType](#gettypevalue)
  - [formatDate](#formatdatedate)
- [Regular Expressions](#regular-expressions)
- [Constants](#constants)
  - [DaysOfWeek](#daysofweek)
  - [HttpStatus](#httpstatus)
- [License](#license)

## Installation

```bash
npm install ultan
```

## Quick Start

```javascript
const {
  stringFormat,
  isValidFhir,
  getFhirName,
  getAcuityScore,
  fillPrompt,
  parseAiJson,
  maskPHI,
  debounce,
  generateUUID
} = require('ultan');

const patient = {
  resourceType: 'Patient',
  id: '12345',
  name: [{ use: 'official', given: ['John'], family: 'Doe' }]
};

console.log(isValidFhir(patient));
console.log(getFhirName(patient));
```

## Healthcare (FHIR/HL7)

### `isValidFhir(resource)`
Validates if an object is a valid FHIR resource by checking for `resourceType` and `id` properties.

```javascript
isValidFhir({ resourceType: 'Patient', id: '123' }); // true
isValidFhir({ name: 'John' });                        // false
```

### `getFhirName(patient)`
Extracts the official name from a FHIR Patient resource, falling back to the first name available.

```javascript
const name = getFhirName(patientResource); // 'John Q. Doe'
getFhirName({});                           // 'Unknown'
```

### `getAcuityScore({ hr, rr, temp, sbp })`
Calculates clinical acuity score based on vital signs (heart rate, respiratory rate, temperature, systolic blood pressure).

```javascript
const score = getAcuityScore({ hr: 120, rr: 26, temp: 98.6, sbp: 85 });
```

### `maskPHI(string)`
Masks Protected Health Information including SSN, phone numbers, and email addresses.

```javascript
const masked = maskPHI('Contact: john@email.com or 555-123-4567');
// 'Contact: [EMAIL_MASKED] or [PHONE_MASKED]'
```

### `isZombie(lastHeartbeat, limit = 300000)`
Detects stagnant sessions or zombie connections based on heartbeat timestamp.

```javascript
const stale = isZombie('2024-01-01T10:00:00Z', 300000); // true
isZombie(new Date());                                    // false
```

## AI Integration

### `fillPrompt(template, variables)`
Replaces `{{variable}}` placeholders in prompt templates with actual values.

```javascript
const prompt = fillPrompt('Analyze {{dataType}} for patient {{id}}', {
  dataType: 'vitals',
  id: '12345'
});
// 'Analyze vitals for patient 12345'
```

### `parseAiJson(string)`
Parses JSON from AI responses, handling markdown code fences and malformed output.

```javascript
const data = parseAiJson('```json\n{"key": "value"}\n```'); // { key: 'value' }
parseAiJson('invalid');                                      // null
```

### `createSignal(initialValue)`
Creates a reactive signal with pub/sub pattern for state management.

```javascript
const counter = createSignal(0);
counter.subscribe(val => console.log('New value:', val));
counter.set(5);
const current = counter.get(); // 5
```

## String Manipulation

### `stringFormat(format, ...args)`
Replaces `{0}`, `{1}`, etc. placeholders with arguments.

```javascript
stringFormat('Hello, {0}! Welcome to {1}.', 'Alice', 'Ultan');
// 'Hello, Alice! Welcome to Ultan.'
```

### `toTitleCase(string)`
Converts string to title case.

```javascript
toTitleCase('hello world'); // 'Hello World'
```

### `sanitizeString(string)`
Escapes HTML special characters.

```javascript
sanitizeString('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

### `fromBase64(base64)` / `toBase64(string)`
Base64 encoding and decoding with UTF-8 support.

```javascript
const encoded = toBase64('Hello World');
const decoded = fromBase64(encoded); // 'Hello World'
```

### `countOccurrences(string, substring)`
Counts substring occurrences.

```javascript
countOccurrences('hello world hello', 'hello'); // 2
```

## String Expansion

### `camelCase(string)`
Converts a string (space-separated, kebab, snake, or PascalCase) to camelCase.

```javascript
camelCase('the quick brown fox'); // 'theQuickBrownFox'
camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
```

### `kebabCase(string)`
Converts a string to kebab-case.

```javascript
kebabCase('the quick brown fox'); // 'the-quick-brown-fox'
kebabCase('theQuickBrownFox');    // 'the-quick-brown-fox'
```

### `snakeCase(string)`
Converts a string to snake_case.

```javascript
snakeCase('the quick brown fox'); // 'the_quick_brown_fox'
snakeCase('theQuickBrownFox');    // 'the_quick_brown_fox'
```

### `pascalCase(string)`
Converts a string to PascalCase.

```javascript
pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
```

### `truncate(string, length, suffix = '...')`
Truncates a string to a maximum length, appending a suffix if truncated. Suffix defaults to `'...'`.

```javascript
truncate('hello world', 8);       // 'hello...'
truncate('hello world', 8, '!');  // 'hello w!'
truncate('hi', 10);               // 'hi'
```

### `capitalize(string)`
Uppercases the first character of a string, leaving the rest unchanged.

```javascript
capitalize('hello world'); // 'Hello world'
capitalize('HELLO');       // 'HELLO'
```

## Object Utilities

### `isEmpty(value)`
Checks if object, array, or string is empty. Returns `true` for `null` and `undefined`.

```javascript
isEmpty({});        // true
isEmpty([1]);       // false
isEmpty('');        // true
isEmpty(null);      // true
```

### `deepClone(object)`
Creates a deep copy using `structuredClone` with a JSON fallback.

```javascript
const clone = deepClone({ nested: { data: [1, 2, 3] } });
```

### `setNestedProperty(object, path, value)`
Sets a nested property using dot notation, creating intermediate objects as needed.

```javascript
const obj = {};
setNestedProperty(obj, 'user.profile.name', 'John');
// obj === { user: { profile: { name: 'John' } } }
```

### `getNestedProperty(object, path)`
Retrieves a nested property using dot notation. Returns `null` for missing paths.

```javascript
getNestedProperty(obj, 'user.profile.name'); // 'John'
```

### `objectToArray(object)` / `arrayToObject(array)`
Converts between objects and key-value pair arrays.

```javascript
objectToArray({ a: 1, b: 2 });        // [['a', 1], ['b', 2]]
arrayToObject([['a', 1], ['b', 2]]); // { a: 1, b: 2 }
```

## Object Expansion

### `pick(object, keys)`
Returns a new object containing only the specified keys.

```javascript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

### `omit(object, keys)`
Returns a new object with the specified keys excluded.

```javascript
omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
```

### `flipObject(object)`
Swaps an object's keys and values.

```javascript
flipObject({ a: 'x', b: 'y' }); // { x: 'a', y: 'b' }
```

## Array Utilities

### `mergeArrays(array1, array2)`
Merges two arrays, removing duplicates.

```javascript
mergeArrays([1, 2, 3], [3, 4, 5]); // [1, 2, 3, 4, 5]
```

### `sumArray(array)` / `averageArray(array)`
Calculates the sum or average of a numeric array.

```javascript
sumArray([1, 2, 3, 4]);   // 10
averageArray([10, 20, 30]); // 20
```

### `arrayDifference(array1, array2)`
Returns elements present in `array1` but not in `array2`.

```javascript
arrayDifference([1, 2, 3], [2, 3, 4]); // [1]
```

### `removeFalsyValues(array)`
Filters out all falsy values (`false`, `0`, `''`, `null`, `undefined`, `NaN`).

```javascript
removeFalsyValues([0, 1, false, 2, '', 3, null, undefined]); // [1, 2, 3]
```

### `groupBy(array, key)`
Groups an array of objects by a shared property.

```javascript
groupBy([{ type: 'A', val: 1 }, { type: 'B', val: 2 }, { type: 'A', val: 3 }], 'type');
// { A: [{ type: 'A', val: 1 }, { type: 'A', val: 3 }], B: [{ type: 'B', val: 2 }] }
```

## Array Expansion

### `flatten(array, depth = Infinity)`
Flattens a nested array to a specified depth. Defaults to fully flat.

```javascript
flatten([[1, [2, 3]], [4]]);       // [1, 2, 3, 4]
flatten([[1, [2, [3]]]], 1);       // [1, [2, [3]]]
```

### `partition(array, predicate)`
Splits an array into two groups based on a predicate function. Returns `[passing, failing]`.

```javascript
const [evens, odds] = partition([1, 2, 3, 4, 5], n => n % 2 === 0);
// evens: [2, 4], odds: [1, 3, 5]
```

### `range(start, end, step = 1)`
Generates an array of numbers. When called with one argument, starts from `0`.

```javascript
range(5);          // [0, 1, 2, 3, 4]
range(1, 5);       // [1, 2, 3, 4]
range(0, 10, 3);   // [0, 3, 6, 9]
```

### `chunk(array, size)`
Splits an array into chunks of the given size. The final chunk may be smaller.

```javascript
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 3);       // [[1, 2, 3]]
```

### `intersect(array1, array2)`
Returns elements present in both arrays.

```javascript
intersect([1, 2, 3], [2, 3, 4]); // [2, 3]
```

### `unique(array)`
Removes duplicate values from an array.

```javascript
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
```

### `orderBy(array, key, order = 'asc')`
Sorts an array of objects by a key (string property name or accessor function). Supports `'asc'` and `'desc'` order.

```javascript
const data = [{ n: 3 }, { n: 1 }, { n: 2 }];
orderBy(data, 'n');           // [{ n: 1 }, { n: 2 }, { n: 3 }]
orderBy(data, 'n', 'desc');   // [{ n: 3 }, { n: 2 }, { n: 1 }]
orderBy(data, x => x.n);     // function accessor also supported
```

## Function Utilities

### `debounce(function, delay = 300)`
Delays function execution until after `delay` milliseconds have elapsed since the last invocation.

```javascript
const debouncedSearch = debounce(searchFunction, 500);
```

### `throttle(function, limit)`
Ensures a function executes at most once per `limit` milliseconds.

```javascript
const throttledScroll = throttle(handleScroll, 100);
```

## Function Expansion

### `once(fn)`
Wraps a function so it executes only on the first call. Subsequent calls return the cached result.

```javascript
const init = once(() => expensiveSetup());
init(); // runs expensiveSetup
init(); // returns cached result, does not re-run
```

### `memoize(fn, keyFn?)`
Caches function results by argument signature. An optional `keyFn` can provide a custom cache key.

```javascript
const expensiveFn = memoize(n => computeHeavy(n));
expensiveFn(5); // computed
expensiveFn(5); // returned from cache

// Custom key function
const memoized = memoize((a, b) => a + b, (a, b) => `${a}-${b}`);
```

### `pipe(...fns)`
Composes functions left to right, passing the output of each as input to the next.

```javascript
const transform = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
);
transform(5); // 9
```

### `compose(...fns)`
Composes functions right to left (standard mathematical composition).

```javascript
const transform = compose(
  x => x - 3,
  x => x * 2,
  x => x + 1
);
transform(5); // 9
```

## Number Utilities

### `getRandomInRange(min, max)`
Returns a random float in the given range (inclusive of min, exclusive of max).

```javascript
getRandomInRange(1, 10); // e.g. 7.342...
```

### `round(number, decimals = 2)`
Rounds a number to the specified number of decimal places.

```javascript
round(3.14159, 2); // 3.14
round(1.005, 2);   // 1.01
```

### `generateUUID()`
Generates a RFC 4122-compliant UUID v4.

```javascript
const id = generateUUID(); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

## Number Expansion

### `clamp(min, val, max)`
Constrains a value within an inclusive range.

```javascript
clamp(1, 5, 10);  // 5  (within range)
clamp(1, 0, 10);  // 1  (below min, returns min)
clamp(1, 15, 10); // 10 (above max, returns max)
```

### `isPrime(number)`
Returns `true` if the number is a prime number.

```javascript
isPrime(2);  // true
isPrime(17); // true
isPrime(1);  // false
isPrime(10); // false
```

## DateTime Utilities

### `addTime(date, amount, unit)`
Returns a new date with the specified amount of time added. Supports `'millisecond'`, `'second'`, `'minute'`, `'hour'`, `'day'`, `'week'`, `'month'`, and `'year'`.

```javascript
addTime(new Date(2026, 0, 1), 5, 'day');   // Jan 6, 2026
addTime(new Date(2026, 0, 15), 2, 'month'); // Mar 15, 2026
addTime(new Date(2026, 0, 1), 1, 'year');  // Jan 1, 2027
```

### `subtractTime(date, amount, unit)`
Returns a new date with the specified amount of time subtracted. Accepts the same units as `addTime`.

```javascript
subtractTime(new Date(2026, 0, 10), 5, 'day'); // Jan 5, 2026
```

### `startOf(date, unit)`
Returns a new date set to the start of the given unit. Supports `'day'`, `'month'`, `'year'`, `'week'`, and `'hour'`.

```javascript
startOf(new Date(2026, 3, 15, 14, 30), 'day');   // Apr 15, 2026 00:00:00.000
startOf(new Date(2026, 3, 15), 'month');           // Apr 1, 2026 00:00:00.000
```

### `endOf(date, unit)`
Returns a new date set to the end of the given unit. Supports `'day'`, `'month'`, `'year'`, `'week'`, and `'hour'`.

```javascript
endOf(new Date(2026, 3, 15), 'day');   // Apr 15, 2026 23:59:59.999
endOf(new Date(2026, 3, 15), 'month'); // Apr 30, 2026 23:59:59.999
```

### `isBefore(date1, date2)`
Returns `true` if `date1` is strictly before `date2`.

```javascript
isBefore(new Date(2026, 0, 1), new Date(2026, 6, 1)); // true
```

### `isAfter(date1, date2)`
Returns `true` if `date1` is strictly after `date2`.

```javascript
isAfter(new Date(2026, 6, 1), new Date(2026, 0, 1)); // true
```

### `isSameDay(date1, date2)`
Returns `true` if both dates fall on the same calendar day regardless of time.

```javascript
isSameDay(new Date(2026, 3, 15, 10), new Date(2026, 3, 15, 22)); // true
isSameDay(new Date(2026, 3, 15), new Date(2026, 3, 16));          // false
```

### `diffDates(date1, date2, unit = 'day')`
Returns the difference between two dates in the specified unit. Supports `'day'`, `'month'`, and `'year'`.

```javascript
diffDates(new Date(2026, 0, 1), new Date(2026, 0, 11), 'day');   // 10
diffDates(new Date(2026, 0, 1), new Date(2026, 5, 1), 'month');  // 5
```

### `isWeekend(date)`
Returns `true` if the date falls on a Saturday or Sunday.

```javascript
isWeekend(new Date(2026, 3, 11)); // true  (Saturday)
isWeekend(new Date(2026, 3, 13)); // false (Monday)
```

### `isLeapYear(year)`
Returns `true` if the given year is a leap year.

```javascript
isLeapYear(2024); // true
isLeapYear(2026); // false
isLeapYear(2000); // true
isLeapYear(1900); // false
```

### `daysInMonth(year, month)`
Returns the number of days in a given month. Month is 1-indexed (January = 1).

```javascript
daysInMonth(2026, 2); // 28
daysInMonth(2024, 2); // 29 (leap year)
daysInMonth(2026, 1); // 31
```

### `formatRelative(date)`
Returns a human-readable relative time string such as `'2 hours ago'` or `'3 days from now'`.

```javascript
formatRelative(new Date(Date.now() - 90000));   // '1 minute ago'
formatRelative(new Date(Date.now() - 7200000)); // '2 hours ago'
formatRelative(new Date(Date.now() + 86400000)); // '1 day from now'
```

## HTTP/Network

### `reqFlow(url, options = {})`
Simplified fetch wrapper that throws on non-OK responses and parses the response body as JSON.

```javascript
const data = await reqFlow('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' })
});
```

## Miscellaneous

### `greet({ name, age })`
Console logs a greeting. Parameters are destructured with defaults.

```javascript
greet({ name: 'Alice', age: 30 }); // 'Hello, Alice! You are 30 years old.'
greet();                            // 'Hello, User! You are unknown years old.'
```

### `getType(value)`
Returns a lowercase type string, correctly handling `null`, arrays, and other edge cases.

```javascript
getType([]);   // 'array'
getType({});   // 'object'
getType(null); // 'null'
```

### `formatDate(date)`
Formats a `Date` object as `MM/DD/YYYY`.

```javascript
formatDate(new Date(2026, 0, 1)); // '01/01/2026'
```

## Regular Expressions

Pre-compiled regex patterns accessible via the `regexes` object:

- `regexes.email` — Email address validation
- `regexes.phone` — International phone numbers
- `regexes.url` — HTTP/HTTPS URLs

```javascript
const { regexes } = require('ultan');
regexes.email.test('user@example.com');         // true
regexes.url.test('https://vgs.studio');          // true
```

## Constants

### `DaysOfWeek`
Frozen object with full weekday names.

```javascript
const { DaysOfWeek } = require('ultan');
console.log(DaysOfWeek.MONDAY);    // 'Monday'
console.log(DaysOfWeek.SATURDAY);  // 'Saturday'
```

### `HttpStatus`
Frozen object of common HTTP status codes.

```javascript
const { HttpStatus } = require('ultan');
if (response.status === HttpStatus.NOT_FOUND) { }
if (response.status === HttpStatus.TOO_MANY_REQUESTS) { }
if (response.status === HttpStatus.SERVICE_UNAVAILABLE) { }
```

## License

MIT