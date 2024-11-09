const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        aHits = a[1];
        bHits = b[1];

        return b[1] - a[1];
    });

    return pagesArr;
}

function printReport(pages) {
    console.log("==========");
    console.log("  REPORT  ");
    console.log("==========");

    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }

    console.log("==========");
    console.log("END REPORT");
    console.log("==========");
}

// Ensure the output directory exists at root of the application.
const dirname = "../output";
const outputDir = path.join(__dirname, dirname);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

function exportToCSV(pages) {
    const sortedPages = sortPages(pages);

    const filename = path.join(outputDir, "report.csv");
    const header = "URL, Hits\n";
    const rows = sortedPages.map(([url, hits]) => `${url},${hits}`).join("\n");
    const csvContent = header + rows;

    fs.writeFile(filename, csvContent, "utf-8", (err) => {
        if (err) {
            console.error(`Error writing CSV file: ${err.message}`);
        } else {
            console.log(`Report exported to ${filename}`);
        }
    });
}

function exportToXLSX(pages) {
    const filename = path.join(outputDir, "report.xlsx");
    const sortedPages = sortPages(pages);
    const worksheetData = [["URL", "Hits"], ...sortedPages];
    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workbook, worksheet, "Report");
    xlsx.writeFile(workbook, filename);
    console.log(`Report exported to ${filename}`);
}

module.exports = { sortPages, printReport, exportToCSV, exportToXLSX };
