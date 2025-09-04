# Arabic Count Formatter

A minimal, zero-dependency utility for pluralizing Arabic nouns across singular, dual, and plural forms, including 0 and 11+ counts.

## Features

- Provides the correct Arabic noun forms for any numeric count.
- Supports singular, dual, plural, and specific rules for counts of 0, 2, and 11 or more.
- Handles Arabic number formatting and locale settings (ar-SA, en-US).
- Optionally displays the number for counts of 1 and 2.
- Lightweight and requires no dependencies.

## Installation

```bash
npm i arabic-count-format
# or
yarn add arabic-count-format
# or
pnpm add arabic-count-format
# or
bun add arabic-count-format
```

## Usage

```typescript
import { formatArabicCount, type ArabicNounForms } from "arabic-count-format";

const carForms: ArabicNounForms = {
  singular: "سيارة",
  dual: "سيارتان",
  plural: "سيارات",
};

formatArabicCount({ count: 0, nounForms: carForms }); // "لا سيارة"
formatArabicCount({ count: 1, nounForms: carForms }); // "سيارة"
formatArabicCount({ count: 2, nounForms: carForms }); // "سيارتان"
formatArabicCount({ count: 7, nounForms: carForms }); // "٧ سيارات"
formatArabicCount({ count: 15, nounForms: carForms }); // "١٥ سيارة"

// With options
formatArabicCount({
  count: 1,
  nounForms: carForms,
  alwaysShowNumber: true,
  locale: "ar-SA",
}); // => "١ سيارة"
```

## API

### `formatArabicCount(options)`

Returns the grammatically correct Arabic phrase for a given count and noun.

#### Options

| Parameter          | Type              | Description                                      | Default    |
| ------------------ | ----------------- | ------------------------------------------------ | ---------- |
| `count`            | `number`          | The numeric count of items                       | (required) |
| `nounForms`        | `ArabicNounForms` | The various forms of the Arabic noun             | (required) |
| `locale`           | `string`          | Locale for number formatting                     | `"ar-SA"`  |
| `alwaysShowNumber` | `boolean`         | Whether to include the number for counts 1 and 2 | `false`    |

#### ArabicNounForms

| Property   | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `singular` | `string` | Singular form of the noun (e.g., "سيارة")         |
| `dual`     | `string` | Dual form of the noun (e.g., "سيارتان")           |
| `plural`   | `string` | Plural form of the noun for 3-10 (e.g., "سيارات") |

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or PR.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
