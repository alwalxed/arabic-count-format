import { describe, expect, test } from "bun:test";
import {
  type ArabicNounForms,
  getArabicCountPhrase,
} from "../src/arabic-count";

describe("getArabicCountPhrase", () => {
  const carForms: ArabicNounForms = {
    singular: "سيارة",
    dual: "سيارتان",
    plural: "سيارات",
  };

  test("handles zero correctly", () => {
    expect(getArabicCountPhrase({ count: 0, nounForms: carForms })).toBe(
      "لا سيارة"
    );
  });

  test("handles singular correctly", () => {
    expect(getArabicCountPhrase({ count: 1, nounForms: carForms })).toBe(
      "سيارة"
    );
  });

  test("handles dual correctly", () => {
    expect(getArabicCountPhrase({ count: 2, nounForms: carForms })).toBe(
      "سيارتان"
    );
  });

  test("handles small plurals (3-10) correctly", () => {
    expect(getArabicCountPhrase({ count: 5, nounForms: carForms })).toBe(
      "٥ سيارات"
    );
  });

  test("handles large numbers (11+) correctly", () => {
    expect(getArabicCountPhrase({ count: 15, nounForms: carForms })).toBe(
      "١٥ سيارة"
    );
  });

  test("handles negative numbers correctly", () => {
    expect(getArabicCountPhrase({ count: -3, nounForms: carForms })).toBe(
      "٣ سيارات"
    );
  });

  test("handles decimal numbers correctly", () => {
    expect(getArabicCountPhrase({ count: 3.7, nounForms: carForms })).toBe(
      "٣٫٧ سيارات"
    );
  });

  test("respects alwaysShowNumber option", () => {
    expect(
      getArabicCountPhrase({
        count: 1,
        nounForms: carForms,
        alwaysShowNumber: true,
      })
    ).toBe("١ سيارة");
    expect(
      getArabicCountPhrase({
        count: 2,
        nounForms: carForms,
        alwaysShowNumber: true,
      })
    ).toBe("٢ سيارتان");
  });

  test("respects custom locale", () => {
    expect(
      getArabicCountPhrase({ count: 3, nounForms: carForms, locale: "en-US" })
    ).toBe("3 سيارات");
  });

  test("throws error for invalid nounForms", () => {
    expect(() =>
      getArabicCountPhrase({ count: 1, nounForms: null as any })
    ).toThrow();
    expect(() =>
      getArabicCountPhrase({ count: 1, nounForms: {} as any })
    ).toThrow();
    expect(() =>
      getArabicCountPhrase({ count: 1, nounForms: { singular: "test" } as any })
    ).toThrow();
  });

  test("throws error for invalid count", () => {
    expect(() =>
      getArabicCountPhrase({ count: NaN, nounForms: carForms })
    ).toThrow();
  });
});
