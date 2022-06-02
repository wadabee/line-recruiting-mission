import { InputFormat } from "../@types/TaxiPricingCalculator";
import TaxiPricingCalculator from "../TaxiPricingCalculator";

describe("TaxiPricingCalculator", () => {
  describe("validationテスト", () => {
    const expectError = (data: InputFormat[]) => {
      expect(() => {
        new TaxiPricingCalculator(data);
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

    test("1行目の走行距離が0ではない", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.1"],
        ["01:00:00.000", "0.2"],
      ];
      expectError(TEST_DATA);
    });

    test("走行距離が0", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["01:00:00.000", "0.0"],
      ];
      expectError(TEST_DATA);
    });

    test("時系列順になっていない", () => {
      const TEST_DATA: InputFormat[] = [
        ["00:00:00.000", "0.0"],
        ["00:00:02.000", "1.0"],
        ["00:00:01.000", "2.0"],
      ];
      expectError(TEST_DATA);
    });
  });
});
