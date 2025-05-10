import { useState } from "react";
import PersianDatePicker from "./lib/PersianDatePicker";

const MyComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className="App">
      <div>
        <div>
          <h2>انتخاب تاریخ شمسی</h2>
          <PersianDatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholder="تاریخ را انتخاب کنید"
            minDate="2023-01-01"
            maxDate="2025-12-31"
          />
          {selectedDate && <p>تاریخ انتخاب شده: {selectedDate.toString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
