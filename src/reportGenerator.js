const fs = require("fs");
const xlsx = require("xlsx");

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

    // exportToCSV(sortedPages, "report.csv");
    // exportToExcel(sortedPages, "report.xlsx");
}

// function exportToCSV(sortedPages, filename) {
//     const header = "URL, Hits\n";
//     const rows = sortedPages.map(([url, hits]) => `${url},${hits}`).join("\n");
//     const csvContent = header + rows;

//     fs.writeFile(filename, csvContent, "utf-8", (err) => {
//         if (err) {
//             console.error(`Error writing CSV file: ${err.message}`);
//         } else {
//             console.log(`Report exported to ${filename}`);
//         }
//     });
// }

// function exportToExcel(sortedPages, filename) {
//     const worksheetData = [["URL", "Hits"], ...sortedPages];
//     const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, "Report");

//     xlsx.writeFile(workbook, filename);
//     console.log(`Report exported to ${filename}`);
// }

module.exports = { sortPages, printReport };
