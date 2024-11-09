const { sortPages } = require("../src/reportGenerator");
const { test, expect } = require("@jest/globals");

test("should sort 2 Pages", () => {
    const input = {
        "https://www.youtube.com": 1,
        "https://www.google.com": 3,
    };
    const expected = [
        ["https://www.google.com", 3],
        ["https://www.youtube.com", 1],
    ];
    const result = sortPages(input);
    expect(result).toEqual(expected);
});

test("should sort 5 Pages", () => {
    const input = {
        "https://www.youtube.com": 1,
        "https://www.google.com": 3,
        "https://www.google.com/about": 6,
        "https://www.google.com/path": 4,
    };
    const expected = [
        ["https://www.google.com/about", 6],
        ["https://www.google.com/path", 4],
        ["https://www.google.com", 3],
        ["https://www.youtube.com", 1],
    ];
    const result = sortPages(input);
    expect(result).toEqual(expected);
});
