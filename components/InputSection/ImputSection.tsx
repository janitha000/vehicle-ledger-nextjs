import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import VCalendar from "../common/calendar/VCalender";
import styles from "./InputSection.module.css";
import { VechicleDispatchContext, VechicleStateContext } from "../../context/VehicleContext";
import { VehicleData } from "../../models/VehicleData";
import useInput from "../../hooks/UseInput";
import { Vehicle } from "../../models/Vehicle";
import { mutate } from "swr";

const InputSection = () => {
  const [date, setDate] = React.useState(new Date());
  const usageValue = React.useRef(0);
  const expense = useInput();
  const amount = useInput();
  const odMeter = useInput();
  const { state: { selectedVehicle, vehicleItems, inputYear, inputMonth } } = React.useContext(VechicleStateContext);
  const {  dispatch } = React.useContext(VechicleDispatchContext);

  usageValue.current = React.useMemo(() => {
    return odMeter.value && vehicleItems && vehicleItems.length > 0
      ? odMeter.value - vehicleItems.filter(x => new Date(x.date) <= date)[0]?.od_meter
      : 0
  }, [odMeter, vehicleItems]);

  const onAdd = async () => {
    if (date.toDateString() == null || expense.value == null || usageValue.current < 0) return;
    const payload = {
      vehicle_id: (selectedVehicle as VehicleData).id,
      date: date.toISOString(),
      expense: expense.value,
      amount: parseInt(amount.value) ?? 0,
      od_meter: parseInt(odMeter.value),
      usage: usageValue.current,
    };

    await SaveVehicleData(payload);
  };

  const SaveVehicleData = async (payload : any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`api/vehicles/${(selectedVehicle as Vehicle).id}/vehicledata`, requestOptions);
    mutate(`api/vehicles/${(selectedVehicle as VehicleData).id}/vehicledata?month=${inputMonth}&year=${inputYear}`, )
  };
  const onDateSelect = (pickedDate : Date | null) => {
    setDate(pickedDate!);
  };

  return (
    <div className={styles.input_section}>
      <VCalendar onDateSelect={onDateSelect} />

      <TextField
        required
        id="outlined-required"
        label="Expenses"
        defaultValue=""
        {...expense}
      />
      <TextField
        required
        id="outlined-required"
        label="Amount"
        type="number"
        defaultValue=""
        {...amount}
      />
      <TextField
        required
        id="outlined-required"
        label="OD Meter"
        type="number"
        defaultValue=""
        {...odMeter}
      />
      <TextField
        id="outlined-required"
        label="Usage"
        value={usageValue.current}
        InputProps={{
          readOnly: true,
        }}
      />
      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default InputSection;
