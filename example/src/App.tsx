import { useState } from "react";
import PersianDatePicker from "@mohsensami/persian-datepicker";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div dir="ltr">
        <h2>انتخاب تاریخ شمسی</h2>
        <PersianDatePicker
          value={date}
          onChange={setDate}
          placeholder="تاریخ را انتخاب کنید"
          // Remove minDate and maxDate if you don't need them
          // Or set them to actual Date objects if you want to limit the date range
          // minDate={new Date(2020, 0, 1)} // Example: Jan 1, 2020
          // maxDate={new Date(2030, 11, 31)} // Example: Dec 31, 2030
        />
        {JSON.stringify(date)}
      </div>
    </div>
  );
}

export default App;
