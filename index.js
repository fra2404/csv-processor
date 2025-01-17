const fs = require("fs");
const csv = require("csv-parser");

// I decided to implement it this way to handle cases where there are values that match multiple characteristics.
// For example, if I were to insert a sixth line identical to the fourth, both would be printed.

const CSV_HEADERS = [
  "Id",
  "Article Name",
  "Quantity",
  "Unit price",
  "Percentage discount",
  "Buyer",
];

function processCSV(filePath) {
  const records = [];

  fs.createReadStream(filePath)
    .pipe(
      csv({
        headers: CSV_HEADERS,
        skipLines: 1, // Skip the first line because it contains the column names
      })
    )
    .on("data", (row) => {
      try {
        const record = parseRow(row);
        records.push(record);
      } catch (error) {
        console.error("Error processing row:", row, error);
      }
    })
    .on("end", () => {
      if (records.length === 0) {
        console.log("No records found in the CSV file.");
        return;
      }

      logHighestRecords(records);
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error);
    });
}

function parseRow(row) {
  const quantity = parseInt(row.Quantity, 10);
  const unitPrice = parseFloat(row["Unit price"]);
  const percentageDiscount = parseFloat(row["Percentage discount"]);

  const totalWithoutDiscount = quantity * unitPrice;
  const discountAmount = (totalWithoutDiscount * percentageDiscount) / 100;
  const totalWithDiscount = totalWithoutDiscount - discountAmount;

  return {
    id: row.Id,
    articleName: row["Article Name"],
    quantity,
    unitPrice,
    percentageDiscount,
    buyer: row.Buyer,
    totalWithoutDiscount,
    totalWithDiscount,
    discountAmount,
    difference: totalWithoutDiscount - totalWithDiscount,
  };
}

function logHighestRecords(records) {
  const highestTotalValue = Math.max(
    ...records.map((record) => record.totalWithDiscount)
  );
  const highestTotalRecords = records.filter(
    (record) => record.totalWithDiscount === highestTotalValue
  );

  const highestQuantityValue = Math.max(
    ...records.map((record) => record.quantity)
  );
  const highestQuantityRecords = records.filter(
    (record) => record.quantity === highestQuantityValue
  );

  const highestDifferenceValue = Math.max(
    ...records.map((record) => record.difference)
  );
  const highestDifferenceRecords = records.filter(
    (record) => record.difference === highestDifferenceValue
  );

  console.log("Records with the highest total amount:", highestTotalRecords);
  console.log("Records with the highest quantity:", highestQuantityRecords);
  console.log(
    "Records with the highest difference between total without discount and total with discount:",
    highestDifferenceRecords
  );
}

const filePath = process.argv[2];
if (filePath) {
  processCSV(filePath);
} else {
  console.log("Please provide a file path as an argument.");
}
