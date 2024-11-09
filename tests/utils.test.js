const { normalizeURL, getURLsFromHTML } = require("../src/utils.js");
const { test, expect } = require("@jest/globals");

test("should normalize URL and strip protocol", () => {
    const input = "https://www.zenrows.com/blog/web-scraping-php";
    const expected = "www.zenrows.com/blog/web-scraping-php";
    const result = normalizeURL(input);
    expect(result).toEqual(expected);
});

test("should normalize URL and strip trailing /", () => {
    const input = "https://www.zenrows.com/blog/web-scraping-php/";
    const expected = "www.zenrows.com/blog/web-scraping-php";
    const result = normalizeURL(input);
    expect(result).toEqual(expected);
});

test("should normalize URL and lowercase", () => {
    const input = "https://www.ZENROWS.com/blog/web-scraping-php/";
    const expected = "www.zenrows.com/blog/web-scraping-php";
    const result = normalizeURL(input);
    expect(result).toEqual(expected);
});

test("should get URL from HTML absolute URL", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.zenrows.com/">
                Scrape Web Data 
            </a>
        </body>
    </html>    
    `;
    const inputBaseURL = "https://www.zenrows.com";
    const expected = ["https://www.zenrows.com/"];
    const result = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(result).toEqual(expected);
});

test("should get URL from HTML relative URL", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/blog/amazon-scraping-proxy/">
                Scrape Web Data 
            </a>
        </body>
    </html>    
    `;
    const inputBaseURL = "https://www.zenrows.com";
    const expected = ["https://www.zenrows.com/blog/amazon-scraping-proxy/"];
    const result = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(result).toEqual(expected);
});

test("should get URL from HTML mulitple URLs", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.zenrows.com/blog/web-scraping-python/">
                Web Scraping with Python
            </a>
            <a href="/pricing/scraper-api/">
                Scraper API Pricing
            </a>
        </body>
    </html>    
    `;
    const inputBaseURL = "https://www.zenrows.com";
    const expected = [
        "https://www.zenrows.com/blog/web-scraping-python/",
        "https://www.zenrows.com/pricing/scraper-api/",
    ];
    const result = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(result).toEqual(expected);
});

test("should not get URL from invalid URL", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                404 Not Found 
            </a>
        </body>
    </html>    
    `;
    const inputBaseURL = "https://www.zenrows.com";
    const expected = [];
    const result = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(result).toEqual(expected);
});
