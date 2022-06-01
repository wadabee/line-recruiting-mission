import { InputFormat } from "../@types/TaxiPricingCalculator";
import calculate from "../TaxiPricingCalculator";

describe("TaxiPricingCalculator", () => {
  describe("validationテスト", () => {
    const expectError = (data: InputFormat[]) => {
      expect(() => {
        calculate(data);
      }).toThrowError();
    };

    test("データが0件", () => {
      const TEST_DATA: InputFormat[] = [];
      expectError(TEST_DATA);
    });

    test("データが1件", () => {
      const TEST_DATA: InputFormat[] = [["10:00:00.000", "0.0"]];
      expectError(TEST_DATA);
    });

    test("時刻形式不正", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["XX:00:00.000", "1.0"],
      ];
      expectError(TEST_DATA);
    });

    test("時刻形式不正", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["0100:00.000", "1.0"],
      ];
      expectError(TEST_DATA);
    });

    test("時刻形式不正", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["01:00:00", "1.0"],
      ];
      expectError(TEST_DATA);
    });

    test("数値形式不正", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["01:00:00.000", "0.01"],
      ];
      expectError(TEST_DATA);
    });

    test("数値形式不正", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["01:00:00.000", "1"],
      ];
      expectError(TEST_DATA);
    });

    test.todo("1行目の走行距離が0ではない");
    test.todo("乗車時間が100時間以上");
    test.todo("走行距離が100以上");
    test.todo("総走行距離が0");
  });
});
