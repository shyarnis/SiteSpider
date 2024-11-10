# SiteSpider

SiteSpider is a lightweight, asynchronous web crawler built using Node.js. This tool allows users to crawl websites, collect all unique URLs, and generate reports on the links discovered. 

## Features

- **Multi-Threaded Crawling**: Uses asynchronous requests to maximize crawling speed.
- **Link Discovery**: Extracts both relative and absolute URLs from each crawled page.
- **URL Hits Tracking**: Counts and tracks how many times each URL appears within the site
- **HTML-Only Parsing**: Skips non-HTML pages to focus solely on web content.
- **Reporting**: Exports crawl results to a CSV file or Excel file for easy analysis and documentation.

## Installation

To get started, clone this repository and install the required dependencies:

```bash
git clone https://github.com/shyarnis/SiteSpider.git
cd SiteSpider
yarn install 
```

## Usage
To start the web crawler, run the following command:

```bash
yarn start <website_url> [report_format]
```
- `<website_url>`: Base URL of the site you want to crawl.
- `[report_format]`(optional):  Specify console, csv, or xlsx. Defaults to console if not provided. 


## Examples
- Crawl and output report in the console.
```bash
yarn start https://tinyclouds.org
```

- Crawl and save the report as the CSV file.
```bash
yarn start https://tinyclouds.org csv
```

- Crawl and save the report as the Excel file.
```bash
yarn start https://tinyclouds.org xlsx
```

The report are saved at output directory of the application.