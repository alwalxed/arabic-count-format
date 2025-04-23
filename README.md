# Arabic Count Format

A utility that returns grammatically correct Arabic noun forms based on numeric count. Handles singular, dual, plural, and special rules for numbers like 0, 2, and 11+

## Installation

```bash
npm i arabic-count-format
# or
bun i arabic-count-format
yarn add arabic-count-format
pnpm add arabic-count-format
```

## Usage

```typescript
import { formatArabicCount, type ArabicNounForms } from "arabic-count-format";

const carForms: ArabicNounForms = {
  singular: "سيارة",
  dual: "سيارتان",
  plural: "سيارات",
};

// Basic usage
formatArabicCount({ count: 0, nounForms: carForms }); // "لا سيارة"
formatArabicCount({ count: 1, nounForms: carForms }); // "سيارة"
formatArabicCount({ count: 2, nounForms: carForms }); // "سيارتان"
formatArabicCount({ count: 7, nounForms: carForms }); // "٧ سيارات"
formatArabicCount({ count: 15, nounForms: carForms }); // "١٥ سيارة"

// With additional options
formatArabicCount({
  count: 1,
  nounForms: carForms,
  alwaysShowNumber: true,
  locale: "ar-SA",
}); // => "١ سيارة"
```

## API Reference

### `formatArabicCount(options)`

Returns the grammatically correct Arabic phrase for a given count and noun.

#### Options

| Parameter          | Type              | Description                                      | Default    |
| ------------------ | ----------------- | ------------------------------------------------ | ---------- |
| `count`            | `number`          | The numeric count of items                       | (required) |
| `nounForms`        | `ArabicNounForms` | The various forms of the Arabic noun             | (required) |
| `locale`           | `string`          | Locale for number formatting                     | `"ar-EG"`  |
| `alwaysShowNumber` | `boolean`         | Whether to include the number for counts 1 and 2 | `false`    |

#### ArabicNounForms

| Property   | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `singular` | `string` | Singular form of the noun (e.g., "سيارة")         |
| `dual`     | `string` | Dual form of the noun (e.g., "سيارتان")           |
| `plural`   | `string` | Plural form of the noun for 3-10 (e.g., "سيارات") |

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or PR

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/arabic-count-format/blob/main/LICENSE) file for details.
