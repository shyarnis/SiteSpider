const { crawlPage } = require("./crawler.js");
const {
    printReport,
    exportToCSV,
    exportToXLSX,
} = require("./reportGenerator.js");

async function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node main.js <website_url> [report_format]");
        process.exit(1);
    }

    const baseURL = process.argv[2];
    const reportFormat = process.argv[3] || "console"; // Default to console output if no format is specified

    console.log(`Started crawling at: ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    // Output based on the specified report format
    switch (reportFormat.toLowerCase()) {
        case "csv":
            exportToCSV(pages);
            console.log("Report saved as report.csv");
            break;
        case "xlsx":
            exportToXLSX(pages);
            console.log("Report saved as report.xlsx");
            break;
        default:
            console.log("Displaying report in the console:");
            printReport(pages);
            break;
    }
}

main();
