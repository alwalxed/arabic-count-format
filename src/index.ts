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
   * Optional locale for number formatting (defaults to "ar-SA")
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
 * Type guard to validate ArabicNounForms structure
 */
function isValidNounForms(nounForms: unknown): nounForms is ArabicNounForms {
  if (nounForms == null || typeof nounForms !== "object") {
    return false;
  }

  const forms = nounForms as Record<string, unknown>;

  return (
    typeof forms.singular === "string" &&
    typeof forms.dual === "string" &&
    typeof forms.plural === "string" &&
    forms.singular.trim().length > 0 &&
    forms.dual.trim().length > 0 &&
    forms.plural.trim().length > 0
  );
}

/**
 * Validates and normalizes the locale parameter
 */
function validateLocale(locale: string): string {
  const normalizedLocale = locale.trim();

  if (normalizedLocale.length === 0) {
    throw new Error("Locale cannot be empty");
  }

  if (!Intl.NumberFormat.supportedLocalesOf(normalizedLocale).length) {
    throw new Error(`Unsupported locale: "${ normalizedLocale }". Please use a valid locale identifier.`);
  }

  return normalizedLocale;
}

/**
 * Returns the grammatically correct Arabic phrase for a given count and noun.
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
 * formatArabicCount({ count: 0, nounForms: carForms }); // => "لا سيارة"
 * formatArabicCount({ count: 1, nounForms: carForms }); // => "سيارة"
 * formatArabicCount({ count: 2, nounForms: carForms }); // => "سيارتان"
 * formatArabicCount({ count: 7, nounForms: carForms }); // => "٢ سيارات"
 * formatArabicCount({ count: 15, nounForms: carForms }); // => "٢٥ سيارة"
 *
 * // With options
 * formatArabicCount({
 *   count: 1,
 *   nounForms: carForms,
 *   alwaysShowNumber: true
 * }); // => "٢ سيارة"
 *
 * @throws Will throw an error if options are invalid or missing required properties
 */
export function formatArabicCount(options: ArabicCountPhraseOptions): string {
  if (options == null || typeof options !== "object") {
    throw new Error("Options parameter is required and must be an object");
  }

  const { count, nounForms, locale = "ar-SA", alwaysShowNumber = false } = options;

  if (typeof count !== "number") {
    throw new Error(`Count must be a number, received: ${ typeof count }`);
  }

  if (!Number.isFinite(count)) {
    throw new Error("Count must be a finite number (not NaN, Infinity, or -Infinity)");
  }

  if (!isValidNounForms(nounForms)) {
    throw new Error("nounForms must be an object with non-empty string properties: singular, dual, and plural");
  }

  const singular = nounForms.singular.trim();
  const dual = nounForms.dual.trim();
  const plural = nounForms.plural.trim();

  const validatedLocale = validateLocale(locale);

  const absoluteCount = Math.abs(count);
  const formattedNumber = new Intl.NumberFormat(validatedLocale).format(absoluteCount);
  const isWholeNumber = Number.isInteger(absoluteCount);

  if (!isWholeNumber) {
    return `${ formattedNumber } ${ singular }`;
  }

  const wholeCount = absoluteCount;

  switch (true) {
    case wholeCount === 0:
      return alwaysShowNumber ? `${ formattedNumber } ${ singular }` : `لا ${ singular }`;

    case wholeCount === 1:
      return alwaysShowNumber ? `${ formattedNumber } ${ singular }` : singular;

    case wholeCount === 2:
      return alwaysShowNumber ? `${ formattedNumber } ${ dual }` : dual;

    case wholeCount >= 3 && wholeCount <= 10:
      return `${ formattedNumber } ${ plural }`;

    default: // 11 and above
      return `${ formattedNumber } ${ singular }`;
  }
}
