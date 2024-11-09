const { normalizeURL, getURLsFromHTML } = require("./utils.js");

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);
    const normalizeCurrentURL = normalizeURL(currentURL);

    // Skip URLs that are not on the same domain as the base URL.
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages;
    }

    // Check if the URL has already been crawled;
    // if so, increment visit count and return
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++;
        return pages;
    }

    // First visit to URL.
    pages[normalizeCurrentURL] = 1;
    console.log(`Actively crawling: ${currentURL}`);

    try {
        const res = await fetch(currentURL);

        // check for unsuccessful response status.
        if (res.status > 399) {
            console.log(
                `Error in fetch with status code: ${res.status}, on page: ${currentURL}`
            );
            return pages;
        }

        // check that content type is HTML; skip non-HTML content.
        const contentType = res.headers.get("Content-Type");
        if (!contentType.includes("text/html")) {
            console.log(
                `Non HTML response, Content-Type: ${contentType}, on page: ${currentURL}`
            );
            return pages;
        }

        // parse HTML content of the page.
        const htmlBody = await res.text();

        // Extract URLs from the HTML content.
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        // Recursively crawl each discovered URL.
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    } catch (error) {
        console.log(`Error in Fetch: ${error.message}, on page: ${currentURL}`);
    }

    return pages;
}

module.exports = { crawlPage };
