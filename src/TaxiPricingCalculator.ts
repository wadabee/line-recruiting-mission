import { InputFormat } from "./@types/TaxiPricingCalculator";
import Distance from "./valueObject/Distance";
import RecordTime from "./valueObject/RecordTime";

class TaxiPricingCalculator {
  private price_: number;
  constructor(input: InputFormat[]) {
    if (input.length < 2) {
      throw new Error("データ無し");
    }

    this.price_ = 410;

    input.forEach((item) => {
      const recordTime = new RecordTime(item[0]);
      const distance = new Distance(item[1]);
    });
  }

  public getPrice() {
    return this.price_;
  }
}

export default TaxiPricingCalculator;
