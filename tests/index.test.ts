import { describe, expect, test } from "bun:test";
import { type ArabicNounForms, formatArabicCount } from "../src";

describe("formatArabicCount", () => {
  const carForms: ArabicNounForms = {
    singular: "سيارة",
    dual: "سيارتان",
    plural: "سيارات",
  };

  const fractionalTests: [ number, string ][] = [
    [ 3.7, "٣٫٧ سيارة" ],
    [ -2.5, "٢٫٥ سيارة" ],
    [ 0.1, "٠٫١ سيارة" ],
  ];

  test.each([
    [ 0, "لا سيارة" ],
    [ 1, "سيارة" ],
    [ 2, "سيارتان" ],
    [ 5, "٥ سيارات" ],
    [ 10, "١٠ سيارات" ],
    [ 11, "١١ سيارة" ],
    [ 15, "١٥ سيارة" ],
    [ -3, "٣ سيارات" ],
  ])("handles count %d correctly", (count, expected) => {
    expect(formatArabicCount({ count, nounForms: carForms })).toBe(expected);
  });

  test.each([
    [ 1, "١ سيارة" ],
    [ 2, "٢ سيارتان" ],
    [ 0, "٠ سيارة" ], // zero with alwaysShowNumber
  ])("respects alwaysShowNumber option for count %d", (count, expected) => {
    expect(formatArabicCount({ count, nounForms: carForms, alwaysShowNumber: true })).toBe(expected);
  });

  test("respects custom locale", () => {
    expect(formatArabicCount({ count: 3, nounForms: carForms, locale: "en-US" })).toBe("3 سيارات");
    expect(formatArabicCount({ count: 7, nounForms: carForms, locale: "ar-EG" })).toBe("٧ سيارات");
  });

  test("handles fractional numbers correctly (defaults to singular)", () => {
    for (const [ count, expected ] of fractionalTests) {
      expect(formatArabicCount({ count, nounForms: carForms })).toBe(expected);
    }
  });

  test("throws error for invalid nounForms", () => {
    expect(() => formatArabicCount({ count: 1, nounForms: null as any })).toThrow();
    expect(() => formatArabicCount({ count: 1, nounForms: {} as any })).toThrow();
    expect(() => formatArabicCount({ count: 1, nounForms: { singular: "test" } as any })).toThrow();
    expect(() =>
      formatArabicCount({
        count: 1,
        nounForms: { singular: " ", dual: " ", plural: " " } as any,
      }),
    ).toThrow();
  });

  test("throws error for invalid count", () => {
    expect(() => formatArabicCount({ count: Number.NaN, nounForms: carForms })).toThrow();
    expect(() => formatArabicCount({ count: Number.POSITIVE_INFINITY, nounForms: carForms })).toThrow();
    expect(() => formatArabicCount({ count: Number.NEGATIVE_INFINITY, nounForms: carForms })).toThrow();
  });

  test("throws error for invalid or empty locale", () => {
    expect(() => formatArabicCount({ count: 1, nounForms: carForms, locale: "" })).toThrow();
    expect(() => formatArabicCount({ count: 1, nounForms: carForms, locale: "invalid-locale" })).toThrow();
  });

  test("trims whitespace in nounForms", () => {
    const forms: ArabicNounForms = {
      singular: " سيارة ",
      dual: " سيارتان ",
      plural: " سيارات ",
    };
    expect(formatArabicCount({ count: 1, nounForms: forms })).toBe("سيارة");
    expect(formatArabicCount({ count: 2, nounForms: forms })).toBe("سيارتان");
    expect(formatArabicCount({ count: 5, nounForms: forms })).toBe("٥ سيارات");
  });
});
