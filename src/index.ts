/**
 * Arabic noun forms for count-based grammatical agreement.
 */
export interface ArabicNounForms {
  /**
   * Singular form of the noun (e.g., "سيارة")
   */
  singular: string;
  /**
   * Dual form of the noun (e.g., "سيارتان")
   */
  dual: string;
  /**
   * Plural form of the noun for 3-10 (e.g., "سيارات")
   */
  plural: string;
}

/**
 * Options for the formatArabicCount function.
 */
export interface ArabicCountPhraseOptions {
  /**
   * The numeric count of items
   */
  count: number;

  /**
   * The various forms of the Arabic noun depending on the count
   */
  nounForms: ArabicNounForms;

  /**
   * Optional locale for number formatting (defaults to "ar-EG")
   */
  locale?: string;

  /**
   * Whether to include the number in the output for counts 1 and 2
   * By default, count=1 returns just the singular form without a number,
   * and count=2 returns just the dual form without a number
   */
  alwaysShowNumber?: boolean;
}

/**
 * Returns the grammatically correct Arabic phrase for a given count and noun.
 *
 * Arabic has complex rules for noun-number agreement:
 * - 0: "لا" + singular
 * - 1: singular
 * - 2: dual
 * - 3-10: plural
 * - 11+: singular
 *
 * @param options - Configuration options for generating the Arabic count phrase
 * @returns A string that correctly combines the number and noun based on Arabic grammar rules
 *
 * @example
 * const carForms = {
 *   singular: "سيارة",
 *   dual: "سيارتان",
 *   plural: "سيارات"
 * };
 *
 * // Basic usage
 * formatArabicCount({ count: 0, nounForms: carForms }); // => "لا سيارة"
 * formatArabicCount({ count: 1, nounForms: carForms }); // => "سيارة"
 * formatArabicCount({ count: 2, nounForms: carForms }); // => "سيارتان"
 * formatArabicCount({ count: 7, nounForms: carForms }); // => "٧ سيارات"
 * formatArabicCount({ count: 15, nounForms: carForms }); // => "١٥ سيارة"
 *
 * // With additional options
 * formatArabicCount({
 *   count: 1,
 *   nounForms: carForms,
 *   alwaysShowNumber: true
 * }); // => "١ سيارة"
 *
 * @throws Will throw an error if options are invalid or missing required properties
 */
export function formatArabicCount(options: ArabicCountPhraseOptions): string {
  const {
    count,
    nounForms,
    locale = "ar-EG",
    alwaysShowNumber = false,
  } = options;

  if (nounForms == null) {
    throw new Error("nounForms is required");
  }

  if (typeof nounForms !== "object") {
    throw new Error("nounForms must be an object");
  }

  if (!nounForms.singular || !nounForms.dual || !nounForms.plural) {
    throw new Error(
      "nounForms must contain singular, dual, and plural properties"
    );
  }

  if (typeof count !== "number" || isNaN(count)) {
    throw new Error("count must be a valid number");
  }

  const absoluteCount = Math.abs(count);

  const arabicNumber = new Intl.NumberFormat(locale).format(absoluteCount);

  const integerCount = Math.floor(absoluteCount);

  if (integerCount === 0) {
    return `لا ${nounForms.singular}`;
  } else if (integerCount === 1) {
    return alwaysShowNumber
      ? `${arabicNumber} ${nounForms.singular}`
      : nounForms.singular;
  } else if (integerCount === 2) {
    return alwaysShowNumber
      ? `${arabicNumber} ${nounForms.dual}`
      : nounForms.dual;
  } else if (integerCount >= 3 && integerCount <= 10) {
    return `${arabicNumber} ${nounForms.plural}`;
  } else {
    return `${arabicNumber} ${nounForms.singular}`;
  }
}
