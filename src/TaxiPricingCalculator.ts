import { InputFormat } from "./@types/TaxiPricingCalculator";
import Distance from "./valueObject/Distance";
import RecordTime from "./valueObject/RecordTime";

class TaxiPricingCalculator {
  private price_: number;
  private totalDistance_: Distance;

  constructor(input: InputFormat[]) {
    if (input.length < 2) {
      throw new Error("データ無し");
    }

    this.price_ = 410;
    this.totalDistance_ = new Distance("0.0");

    input.forEach((item, idx) => {
      const recordTime = new RecordTime(item[0]);
      const distance = new Distance(item[1]);

      if (idx === 0 && distance.toNumber() !== 0) {
        throw new Error("一行目の走行距離が0ではありません");
      }

      this.totalDistance_.add(distance);
    });

    if (this.totalDistance_.toNumber() === 0) {
      throw new Error("合計走行距離が0です");
    }
  }

  public getPrice() {
    // TODO:refactor
    const total = this.totalDistance_.toNumber() - 1052;
    if (total > 0) {
      return this.price_ + 80 * (Math.floor(total / 237) + 1);
    } else {
      return this.price_;
    }
  }
}

export default TaxiPricingCalculator;
