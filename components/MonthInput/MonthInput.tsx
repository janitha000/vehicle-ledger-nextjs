import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import { VechicleDispatchContext } from "../../context/VehicleContext";

const MonthInput = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { dispatch } = React.useContext(VechicleDispatchContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("2012-03-01")}
          maxDate={new Date("2023-06-01")}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            dispatch({ type: "setYear", payload: newValue?.getFullYear() });
            dispatch({ type: "setMonth", payload: newValue?.getMonth() });
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default React.memo(MonthInput);
