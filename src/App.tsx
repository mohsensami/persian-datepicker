import { useState } from "react";
import PersianDatePicker from "./lib/PersianDatePicker";

const MyComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div dir="ltr">
          <h2>انتخاب تاریخ شمسی</h2>
          <PersianDatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholder="تاریخ را انتخاب کنید"
            minDate=""
            maxDate=""
          />
          {JSON.stringify(selectedDate)}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
