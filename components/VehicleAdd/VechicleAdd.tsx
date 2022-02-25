import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../../util/constants";
import useInput from "../../hooks/UseInput";
import { Vehicle } from "../../models/Vehicle";
import { useRouter } from "next/router";
import styles from './VechicleAdd.module.css'

const VehicleAdd = () => {
  const [redirect, setRedirect] = useState(false)
  const name = useInput()
  const phone = useInput()
  const model = useInput()
  const number = useInput()
  const router = useRouter()

  const onAdd = async () => {
    if (name.value == undefined || phone.value == undefined || model.value == undefined || number.value == undefined) return;
    const payload = { name: name.value, phone: phone.value, model: model.value, number: number.value };
    await SaveVehicle(payload);
  }

  const SaveVehicle = async (payload : Vehicle)  => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`api/vehicles`, requestOptions);
    setRedirect(true)
  };

  if (redirect) router.push('/');

  return (
    <div className={styles.vehicleAdd}>
      <TextField
        required
        id="outlined-required"
        label="User Name"
        defaultValue=""
        {...name}
      />
      <TextField
        required
        id="outlined-required"
        label="Phone Number"
        defaultValue=""
        {...phone}
      />
      <TextField
        required
        id="outlined-required"
        label="Vehicle Model"
        defaultValue=""
        {...model}
      />
      <TextField
        required
        id="outlined-required"
        label="Vehicle Number"
        defaultValue=""
        {...number}
      />

      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default VehicleAdd;
