# @mohsensami/persian-datepicker

A beautiful and customizable Persian (Jalali) DatePicker component for React applications.

## Features

- 🎯 Easy to use and integrate
- 📅 Full Persian (Jalali) calendar support
- 🎨 Customizable styling
- 📱 Responsive design
- ⚡️ Built with TypeScript
- 🔒 Date range validation
- 🌐 RTL support

## Installation

```bash
npm install @mohsensami/persian-datepicker
# or
yarn add @mohsensami/persian-datepicker
```

## Usage

```tsx
import { useState } from "react";
import PersianDatePicker from "@mohsensami/persian-datepicker";

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <PersianDatePicker
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholder="تاریخ را انتخاب کنید"
      minDate="2023-01-01"
      maxDate="2025-12-31"
    />
  );
};
```

## Props

| Prop            | Type                     | Default                  | Description                        |
| --------------- | ------------------------ | ------------------------ | ---------------------------------- |
| value           | `Date \| string \| null` | -                        | The selected date value            |
| onChange        | `(date: Date) => void`   | -                        | Callback when date changes         |
| className       | `string`                 | `""`                     | Additional class for the container |
| placeholder     | `string`                 | `"تاریخ را انتخاب کنید"` | Input placeholder text             |
| inputClass      | `string`                 | `""`                     | Additional class for the input     |
| calendarClass   | `string`                 | `""`                     | Additional class for the calendar  |
| disabled        | `boolean`                | `false`                  | Disable the date picker            |
| minDate         | `Date \| string`         | -                        | Minimum selectable date            |
| maxDate         | `Date \| string`         | -                        | Maximum selectable date            |
| showTodayButton | `boolean`                | `true`                   | Show/hide today button             |
| todayButtonText | `string`                 | `"امروز"`                | Text for today button              |

## Styling

The component comes with default styles, but you can customize it using the provided class names:

- `.persian-date-picker` - Main container
- `.date-input` - Input field
- `.calendar` - Calendar container
- `.calendar-header` - Calendar header
- `.calendar-backdrop` - Backdrop when calendar is open

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

## License

MIT © [Mohsen Sami](https://github.com/mohsensami)
