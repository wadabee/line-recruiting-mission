import { InputFormat } from "../@types/TaxiPricingCalculator";
import TaxiPricingCalculator from "../TaxiPricingCalculator";

describe("TaxiPricingCalculator", () => {
  const formatTime = (date: Date): string => {
    const format = (n: number): string => {
      return ("0" + n).slice(-2);
    };

    return `${format(date.getHours())}:${format(date.getMinutes())}:${format(
      date.getSeconds()
    )}.000`;
  };

  // 通常料金のデータ作成
  const getNormalSpeed = (start: string, distance: number): InputFormat[] => {
    const ret: InputFormat[] = [[start, "0.0"]];

    const date_ = new Date("2000/01/01 " + start);
    const count = Math.floor(distance / 10);
    for (let i = 0; i < count; i++) {
      date_.setSeconds(date_.getSeconds() + 1);
      ret.push([formatTime(date_), "10.0"]);
    }

    const fraction = distance % 10;
    if (fraction !== 0) {
      date_.setSeconds(date_.getSeconds() + 1);
      ret.push([formatTime(date_), fraction.toFixed(1)]);
    }

    return ret;
  };

  // inputの合計距離が意図した数値であるか確認する
  const expectTotalDistance = (input: InputFormat[], total: number) => {
    let sum = 0;
    input.forEach((item) => {
      sum += Number.parseFloat(item[1]);
    });
    expect(sum).toBe(total);
  };

  describe("テストUtilityのテスト", () => {
    describe("formatTime", () => {
      test("0の場合", () => {
        const date = new Date("2000/01/01 00:00:00");
        expect(formatTime(date)).toBe("00:00:00.000");
      });

      test("1桁の場合", () => {
        const date = new Date("2000/01/01 01:02:03");
        expect(formatTime(date)).toBe("01:02:03.000");
      });

      test("2桁の場合", () => {
        const date = new Date("2000/01/01 12:34:56");
        expect(formatTime(date)).toBe("12:34:56.000");
      });
    });
  });

  describe("通常料金", () => {
    test("走行距離が1052m以下の場合は410_最小", () => {
      const data: InputFormat[] = [
        ["05:00:00.000", "0.0"],
        ["05:00:01.000", "0.1"],
      ];

      const calculator = new TaxiPricingCalculator(data);
      expect(calculator.getPrice()).toBe(410);
    });
    test("走行距離が1052m以下の場合は410_最大", () => {
      const data: InputFormat[] = getNormalSpeed("05:00:00.000", 1052);
      expectTotalDistance(data, 1052);

      const calculator = new TaxiPricingCalculator(data);
      expect(calculator.getPrice()).toBe(410);
    });
    test("走行距離が1052mを超えると237mごとに80円アップ_2メーター_最小", () => {
      const data: InputFormat[] = getNormalSpeed("05:00:00.000", 1052.1);
      expectTotalDistance(data, 1052.1);

      const calculator = new TaxiPricingCalculator(data);
      expect(calculator.getPrice()).toBe(490);
    });
    test("走行距離が1052mを超えると237mごとに80円アップ_2メーター_最大", () => {
      const data: InputFormat[] = getNormalSpeed("05:00:00.000", 1289);
      expectTotalDistance(data, 1289);

      const calculator = new TaxiPricingCalculator(data);
      expect(calculator.getPrice()).toBe(490);
    });
    test("走行距離が1052mを超えると237mごとに80円アップ_3メーター_最小", () => {
      const data: InputFormat[] = getNormalSpeed("05:00:00.000", 1289.1);
      expectTotalDistance(data, 1289.1);

      const calculator = new TaxiPricingCalculator(data);
      expect(calculator.getPrice()).toBe(570);
    });

    test.todo("深夜に記録開始かつ通常時間に記録終了の場合は通常料金");
    test.todo("通常時間に記録開始かつ深夜に記録終了の場合は通常料金");
  });
  describe("深夜料金", () => {
    test.todo("１メーター");
    test.todo("2メーター");
    test.todo("3メーター");
    test.todo("通常料金との混在");
  });

  describe("低速走行", () => {
    test.todo("１メーター");
    test.todo("2メーター");
    test.todo("3メーター");
    test.todo("通常料金のみ");
    test.todo("深夜料金のみ");
    test.todo("通常と深夜の混在");
  });
});
