const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const hostPathName = `${urlObject.hostname}${urlObject.pathname}`;

    // if pathName of host ended with slash.
    if (hostPathName.length > 0 && hostPathName.slice(-1) === "/") {
        return hostPathName.slice(0, -1);
    }

    return hostPathName;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");

    for (const linkElement of linkElements) {
        if (linkElement.href.startsWith("/")) {
            // relative URL
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error with relative URL: ${error.message}`);
            }
        } else {
            // absolute URL
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error with absolute URL: ${error.message}`);
            }
        }
    }
    return urls;
}

module.exports = { normalizeURL, getURLsFromHTML };
