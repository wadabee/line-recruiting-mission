import Distance from "../Distance";

describe("Distance", () => {
  describe("constructor", () => {
    describe("00.0形式ではない", () => {
      const expectError = (testData: string) => {
        expect(() => {
          new Distance(testData);
        }).toThrowError("00.0形式または、0.0形式で入力してください");
      };

      test("小数点がない", () => {
        expectError("000");
      });
      test("桁数が異なる", () => {
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
      test("正しいフォーマット", () => {
        expect(() => {
          new Distance("1.2");
        }).not.toThrowError();
      });
    });
  });

  describe("toNumber", () => {
    test("Number型でdistanceを取得", () => {
      const dis = new Distance("12.3");
      expect(dis.toNumber()).toBe(12.3);
    });
  });

  describe("add", () => {
    test("加算されること", () => {
      const disTarget = new Distance("10.0");
      const dis1 = new Distance("32.1");
      const dis2 = new Distance("40.0");

      disTarget.add(dis1);
      expect(disTarget.toNumber()).toBe(42.1);

      disTarget.add(dis2);
      expect(disTarget.toNumber()).toBe(82.1);
    });
  });
});
