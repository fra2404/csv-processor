# CSV Processor

This application processes a CSV file containing information about articles, including their quantity, unit price, percentage discount, and buyer. It calculates the total amount with and without discount for each article and identifies the records with the highest total amount, highest quantity, and highest difference between total without discount and total with discount.

## Features

- Parses a CSV file with predefined headers.
- Calculates total amounts with and without discount for each article.
- Identifies and logs records with the highest total amount, highest quantity, and highest difference between total without discount and total with discount.

## Design Decision

It was chosen to return an array of objects because there might be multiple values that match those characteristics. This is not the case with the current test CSV. However, if we were to insert a sixth row identical to the fourth in the test CSV, we would have two values corresponding to the last two logs.

## CSV Headers

The CSV file should have the following headers:

- `Id`
- `Article Name`
- `Quantity`
- `Unit price`
- `Percentage discount`
- `Buyer`

## Example CSV

```csv
Id,Article Name,Quantity,Unit price,Percentage discount,Buyer
1,Coke,10,1,0,Mario Rossi
2,Coke,15,2,0,Luca Neri
3,Fanta,5,3,2,Luca Neri
4,Water,20,1,10,Mario Rossi
5,Fanta,1,4,15,Andrea Bianchi
```

## How to Run

1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/fra2404/csv-processor.git
   cd csv processor
   ```
2. Ensure you have Node.js installed.
3. Navigate to the project directory.

   ```bash
   cd csv-processor
   ```

4. Install the required dependencies by running:
   ```bash
   npm install
   ```
5. Run the application with the path to your CSV file as an argument:
   ```bash
   node index.js path/to/your/csv/file.csv
   ```

## Example Command

```bash
node index.js test.csv
```
