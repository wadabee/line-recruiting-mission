import { InputFormat } from "./@types/TaxiPricingCalculator";
import Distance from "./valueObject/Distance";
import RecordTime from "./valueObject/RecordTime";

const calculate = (input: InputFormat[]) => {
  if (input.length < 2) {
    throw new Error("データ無し");
  }

  input.forEach((item) => {
    const recordTime = new RecordTime(item[0]);
    const distance = new Distance(item[1]);
  });
};

export default calculate;
