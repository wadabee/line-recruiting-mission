import Distance from "../Distance";

describe("Distance", () => {
  describe("constructor", () => {
    describe("00.0形式ではない", () => {
      const expectError = (testData: string) => {
        expect(() => {
          new Distance(testData);
        }).toThrowError("00.0形式で入力してください");
      };

      test("小数点がない", () => {
        expectError("000");
      });
      test("桁数が異なる", () => {
        expectError("1.1");
        expectError("12.12");
        expectError("123.1");
      });
    });
    describe("正しいフォーマット", () => {
      test("正しいフォーマット", () => {
        expect(() => {
          new Distance("12.3");
        }).not.toThrowError();
      });
    });
  });
});
