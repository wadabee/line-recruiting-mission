import { parse } from "csv-parse";
import { readFileSync } from "fs";
import path from "path";
import { InputFormat } from "./@types/TaxiPricingCalculator";
import calculate from "./TaxiPricingCalculator";

(() => {
  const csvFilePath = path.resolve(__dirname, "data/input.csv");
  const fileContent = readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
    },
    (error, result: InputFormat[]) => {
      if (error) {
        console.error(error);
      }

      calculate(result);
    }
  );
})();
