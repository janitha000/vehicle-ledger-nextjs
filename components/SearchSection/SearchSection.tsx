import { useContext, useEffect, useState } from "react";
import useSWR from 'swr'
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { API_URL } from "../../util/constants";
import { VechicleDispatchContext } from "../../context/VehicleContext";
import fetcher from "../../util/fetcher";
import  styles from "./SearchSection.module.css";
import { Vehicle } from "../../models/Vehicle";
import Link from "next/link";
import VechicleDataC from "../VechcleData/VehicleData";



const SearchSection: React.FC = () => {
  const { data, error } = useSWR<Vehicle[]>(`${API_URL}/vehicles`, fetcher);

  const { dispatch } = useContext(VechicleDispatchContext);
  const [vehicle, setVehicle] = useState("");
  const [openVehicleData, setOpenVehicleData] = useState(false)
  const [reRender, setRerender] = useState(false)


  const handleChange = (event : any) => {
    setVehicle(event.target.value);
    const selectedVehicle = data!.filter((x) => x.id === event.target.value);
    dispatch({ type: "setSelectedVehicle", payload: selectedVehicle[0] });
  };

  const onOpenClick = () => {
    console.log(openVehicleData)
    setOpenVehicleData((prev) => !prev)
  }

  const reRenderFn = () => {
    console.log(reRender)
    setRerender((prev) => !prev)
    console.log(reRender)

  }

  return (
    <>
      <div className={styles.searchSection}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Vehicle Number
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={vehicle}
            label="Vehicle"
            onChange={handleChange}
            fullWidth
          >
            {data &&
              data.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.number}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={onOpenClick}>
          {!openVehicleData ? "Show" : "Hide"}  Vehicle Info
        </Button>

        <Link href={"/add"}>
          <Button variant="contained" >
            Add New Vehicle
          </Button>
        </Link>

      </div>
      <div className={styles.searchVehicle}>
        <VechicleDataC isOpen={openVehicleData} reRender={reRenderFn} />

      </div>

    </>

  );
};

export default SearchSection;
