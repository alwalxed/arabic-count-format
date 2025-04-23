# Arabic Count

A TypeScript utility for correct Arabic number–noun grammar.

## Installation

```bash
npm i arabic-count
# or
bun i arabic-count
yarn add arabic-count
pnpm add arabic-count
```

## Usage

```typescript
import { getArabicCountPhrase, type ArabicNounForms } from "arabic-count";

const carForms: ArabicNounForms = {
  singular: "سيارة",
  dual: "سيارتان",
  plural: "سيارات",
};

// Basic usage
getArabicCountPhrase({ count: 0, nounForms: carForms }); // "لا سيارة"
getArabicCountPhrase({ count: 1, nounForms: carForms }); // "سيارة"
getArabicCountPhrase({ count: 2, nounForms: carForms }); // "سيارتان"
getArabicCountPhrase({ count: 7, nounForms: carForms }); // "٧ سيارات"
getArabicCountPhrase({ count: 15, nounForms: carForms }); // "١٥ سيارة"

// With additional options
getArabicCountPhrase({
  count: 1,
  nounForms: carForms,
  alwaysShowNumber: true,
  locale: "ar-SA",
}); // => "١ سيارة"
```

## API Reference

### `getArabicCountPhrase(options)`

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

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/arabic-count/blob/main/LICENSE) file for details.
