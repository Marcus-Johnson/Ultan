# Why use Ultan?

Ultan is a utility library that bridges traditional JavaScript development with modern AI, healthcare (FHIR/HL7), and cloud-native architectures. Built for Fortune 500 environments, it provides enterprise-grade functions for string manipulation, array operations, object handling, healthcare data processing, AI prompt management, PHI masking, and reactive state management.
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
  - [createSignal](#createsigalinitialvalue)
- [String Manipulation](#string-manipulation)
  - [stringFormat](#stringformatformat-args)
  - [toTitleCase](#totitlecasestring)
  - [sanitizeString](#sanitizestringstring)
  - [fromBase64 / toBase64](#frombase64base64--tobase64string)
  - [countOccurrences](#countoccurrencesstring-substring)
- [Object Utilities](#object-utilities)
  - [isEmpty](#isemptyvalue)
  - [deepClone](#deepcloneobject)
  - [setNestedProperty](#setnestedpropertyobject-path-value)
  - [getNestedProperty](#getnestedpropertyobject-path)
  - [objectToArray / arrayToObject](#objecttoarrayobject--arraytoobjectarray)
- [Array Utilities](#array-utilities)
  - [mergeArrays](#mergearraysarray1-array2)
  - [sumArray / averageArray](#sumarrayarray--averagearrayarray)
  - [arrayDifference](#arraydifferencearray1-array2)
  - [removeFalsyValues](#removefalsyvaluesarray)
  - [groupBy](#groupbyarray-key)
- [Function Utilities](#function-utilities)
  - [debounce](#debouncefunction-delay--300)
  - [throttle](#throttlefunction-limit)
- [HTTP/Network](#httpnetwork)
  - [reqFlow](#reqflowurl-options--)
- [Miscellaneous](#miscellaneous)
  - [greet](#greet-name-age-)
  - [getType](#gettypevalue)
  - [getRandomInRange](#getrandominrangemin-max)
  - [round](#roundnumber-decimals--2)
  - [generateUUID](#generateuuid)
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
isValidFhir({ resourceType: 'Patient', id: '123' });
```

### `getFhirName(patient)`
Extracts the official name from a FHIR Patient resource, falling back to the first name available.

```javascript
const name = getFhirName(patientResource);
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
```

### `isZombie(lastHeartbeat, limit = 300000)`
Detects stagnant sessions or zombie connections based on heartbeat timestamp.

```javascript
const stale = isZombie('2024-01-01T10:00:00Z', 300000);
```

## AI Integration

### `fillPrompt(template, variables)`
Replaces `{{variable}}` placeholders in prompt templates with actual values.

```javascript
const prompt = fillPrompt('Analyze {{dataType}} for patient {{id}}', {
  dataType: 'vitals',
  id: '12345'
});
```

### `parseAiJson(string)`
Parses JSON from AI responses, handling markdown code fences and malformed output.

```javascript
const data = parseAiJson('```json\n{"key": "value"}\n```');
```

### `createSignal(initialValue)`
Creates a reactive signal with pub/sub pattern for state management.

```javascript
const counter = createSignal(0);
counter.subscribe(val => console.log('New value:', val));
counter.set(5);
const current = counter.get();
```

## String Manipulation

### `stringFormat(format, ...args)`
Replaces `{0}`, `{1}`, etc. placeholders with arguments.

```javascript
stringFormat('Hello, {0}! Welcome to {1}.', 'Alice', 'Ultan');
```

### `toTitleCase(string)`
Converts string to title case.

```javascript
toTitleCase('hello world');
```

### `sanitizeString(string)`
Escapes HTML special characters.

```javascript
sanitizeString('<script>alert("xss")</script>');
```

### `fromBase64(base64)` / `toBase64(string)`
Base64 encoding and decoding with UTF-8 support.

```javascript
const encoded = toBase64('Hello World');
const decoded = fromBase64(encoded);
```

### `countOccurrences(string, substring)`
Counts substring occurrences.

```javascript
countOccurrences('hello world hello', 'hello');
```

## Object Utilities

### `isEmpty(value)`
Checks if object, array, or string is empty.

```javascript
isEmpty({});
isEmpty([]);
isEmpty('');
isEmpty(null);
```

### `deepClone(object)`
Creates deep copy using `structuredClone` or JSON fallback.

```javascript
const clone = deepClone({ nested: { data: [1, 2, 3] } });
```

### `setNestedProperty(object, path, value)`
Sets nested property using dot notation.

```javascript
const obj = {};
setNestedProperty(obj, 'user.profile.name', 'John');
```

### `getNestedProperty(object, path)`
Retrieves nested property using dot notation.

```javascript
const name = getNestedProperty(obj, 'user.profile.name');
```

### `objectToArray(object)` / `arrayToObject(array)`
Converts between objects and key-value pair arrays.

```javascript
objectToArray({ a: 1, b: 2 });
arrayToObject([['a', 1], ['b', 2]]);
```

## Array Utilities

### `mergeArrays(array1, array2)`
Merges arrays removing duplicates.

```javascript
mergeArrays([1, 2, 3], [3, 4, 5]);
```

### `sumArray(array)` / `averageArray(array)`
Calculates sum or average of numeric array.

```javascript
sumArray([1, 2, 3, 4]);
averageArray([10, 20, 30]);
```

### `arrayDifference(array1, array2)`
Returns elements in array1 not in array2.

```javascript
arrayDifference([1, 2, 3], [2, 3, 4]);
```

### `removeFalsyValues(array)`
Filters out falsy values.

```javascript
removeFalsyValues([0, 1, false, 2, '', 3, null, undefined]);
```

### `groupBy(array, key)`
Groups array of objects by property.

```javascript
groupBy([{ type: 'A', val: 1 }, { type: 'B', val: 2 }], 'type');
```

## Function Utilities

### `debounce(function, delay = 300)`
Delays function execution until after delay milliseconds.

```javascript
const debouncedSearch = debounce(searchFunction, 500);
```

### `throttle(function, limit)`
Ensures function executes at most once per limit milliseconds.

```javascript
const throttledScroll = throttle(handleScroll, 100);
```

## HTTP/Network

### `reqFlow(url, options = {})`
Simplified fetch wrapper that throws on non-OK responses and parses JSON.

```javascript
const data = await reqFlow('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' })
});
```

## Miscellaneous

### `greet({ name, age })`
Console logs greeting with optional destructured parameters.

```javascript
greet({ name: 'Alice', age: 30 });
greet();
```

### `getType(value)`
Returns lowercase type string.

```javascript
getType([]);
getType({});
getType(null);
```

### `getRandomInRange(min, max)`
Returns random float in range.

```javascript
getRandomInRange(1, 10);
```

### `round(number, decimals = 2)`
Rounds to specified decimal places.

```javascript
round(3.14159, 2);
```

### `generateUUID()`
Generates RFC4122 compliant UUID v4.

```javascript
const id = generateUUID();
```

### `formatDate(date)`
Formats date as MM/DD/YYYY.

```javascript
formatDate(new Date());
```

## Regular Expressions

Pre-compiled regex patterns accessible via `regexes` object:

- `regexes.email` - Email validation
- `regexes.phone` - International phone numbers
- `regexes.url` - HTTP/HTTPS URLs

```javascript
const { regexes } = require('ultan');
regexes.email.test('user@example.com');
```

## Constants

### `DaysOfWeek`
Frozen object with weekday names.

```javascript
const { DaysOfWeek } = require('ultan');
console.log(DaysOfWeek.MONDAY);
```

### `HttpStatus`
Common HTTP status codes.

```javascript
const { HttpStatus } = require('ultan');
if (response.status === HttpStatus.NOT_FOUND) { }
```

## License

MIT