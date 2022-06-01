import RecordTime from "../RecordTime";

describe("RecordTime", () => {
  describe("constructor", () => {
    describe("hh:mm:ss.fff形式ではない", () => {
      const expectError = (testData: string) => {
        expect(() => {
          new RecordTime(testData);
        }).toThrowError("hh:mm:ss.fff形式で入力してください");
      };

      test("フォーマットが違う", () => {
        expectError("000000000");
      });
      test("桁数が異なる", () => {
        expectError("100:59:59.000");
        expectError("12:1:59.000");
        expectError("12:59:2.000");
        expectError("12:59:2.1234");
      });
      test("mmが60以上", () => {
        expectError("10:60:59.000");
      });
      test("ssが60以上", () => {
        expectError("10:59:60.000");
      });
    });
    describe("正しいフォーマット", () => {
      test("正しいフォーマット", () => {
        expect(() => {
          new RecordTime("12:34:56.123");
        }).not.toThrowError();
      });
    });
  });
});
