# Why use Ultan?

Ultan provides a collection of utility functions that can be used in various types of JavaScript projects. These functions are designed to provide convenient, reusable code that accomplishes tasks such as string manipulation, array manipulation, object manipulation, and more.

## Table of Contents
- [Why use Ultan?](#why-use-ultan)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [String Manipulation](#string-manipulation)
  - [Greeting](#greeting)
  - [Object Utils](#object-utils)
  - [Array Utils](#array-utils)
  - [Regular Expressions](#regular-expressions)
  - [Miscellaneous](#miscellaneous)
  - [Constants](#constants)


## Installation
```
  npm install ultan
```
## Usage
```
const { stringFormat, greet, mergeArrays, isEmpty, regexes } = require('ultan');

// String Manipulation
const formattedString = stringFormat('Hello, {0}! Welcome to {1}.', 'John', 'Ultan');
console.log(formattedString); // Output: "Hello, John! Welcome to Ultan."

// Greeting
greet({ name: 'Alice', age: 30 }); // Output: "Hello, Alice! You are 30 years old."
greet(); // Output: "Hello, User! You are unknown years old."

// Array Utils
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const mergedArray = mergeArrays(array1, array2);
console.log(mergedArray); // Output: [1, 2, 3, 4, 5]

// Object Utils
const obj = { name: 'John', age: 25 };
console.log(isEmpty(obj)); // Output: false

// Regular Expressions
const emailRegex = regexes.email;
const isValidEmail = emailRegex.test('john@example.com');
console.log(isValidEmail); // Output: true

```

## String Manipulation
- **stringFormat**: This function replaces placeholders in a given string with supplied arguments.
- **toTitleCase**: Converts a string to title case.
- **sanitizeString**: Sanitizes a string by replacing special characters with their HTML entities.
- **fromBase64 and toBase64**: Functions for base64 encoding and decoding.
- **countOccurrences**: Counts the number of occurrences of a substring in a string.

## Greeting
- **greet**: Greets a user with their name and age. If no name or age is supplied, defaults to "User" and "unknown" respectively.

## Object Utils
- **isEmpty**: Checks if an object is empty.
- **deepClone**: Creates a deep clone of an object.
- **setNestedProperty**: Sets a nested property of an object, given a 'dot notation' path.
- **getNestedProperty**: Retrieves a nested property of an object, given a 'dot notation' path.
- **objectToArray**: Converts an object to an array of key-value pairs.

## Array Utils
- **mergeArrays**: Merges two arrays, removing duplicates.
- **sumArray**: Calculates the sum of an array of numbers.
- **averageArray**: Calculates the average of an array of numbers.
- **arrayDifference**: Returns the difference between two arrays.
- **arrayToObject**: Converts an array of key-value pairs to an object.
- **groupBy**: Groups an array of objects by a specified key.
- **removeFalsyValues**: Removes all falsy values from an array.

## Regular Expressions
- **regexes**: A collection of regular expressions for matching email, phone number and URL.

## Miscellaneous
- **getRandomInRange**: Returns a random number within a given range.
- **getType**: Returns the data type of a variable.
- **formatDate**: Formats a date according to a specified format.
- **round**: Rounds a number to a specified number of decimal places.
- **generateUUID**: Generates a universally unique identifier (UUID).
- **reqFlow**: Sends an HTTP request and returns the response as JSON, or throws an error if the request fails.
- **debounce**: Debounce function to limit the rate at which a function can fire.
- **throttle**: Throttle function to ensure that a function does not run more often than the interval of time.

## Constants
- **DaysOfWeek**: An enumeration of the days of the week.
- **HttpStatus**: An enumeration of common HTTP status codes.
