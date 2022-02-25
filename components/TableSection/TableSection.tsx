import id from "date-fns/locale/id";
import * as React from "react";
import useSWR, { mutate } from "swr";
import { VechicleDispatchContext, VechicleStateContext } from "../../context/VehicleContext";
import { VehicleData } from "../../models/VehicleData";
import fetcher from "../../util/fetcher";
import VehicleTable from "../common/table/VehicleTable";

const TableSection = () => {
  const { state: { inputYear, inputMonth, selectedVehicle, recallApi } } = React.useContext(VechicleStateContext);
  const {dispatch} = React.useContext(VechicleDispatchContext)
  const {data, error} = useSWR<VehicleData[]>(`api/vehicles/${(selectedVehicle as VehicleData).id}/vehicledata?month=${inputMonth}&year=${inputYear}`, fetcher);

  React.useEffect(() => {
    dispatch({ type: "setVehicleItems", payload: data });
    console.log('dispatch vehicles')
  }, [data]);


  const createHeader = (value: string, key: number) => {
    return { key, value };
  };

  const headers = [
    createHeader("DateTime", 1),
    createHeader("Expense", 2),
    createHeader("Amount(LKR)", 3),
    createHeader("OD Meter", 4),
    createHeader("Usage", 5),
    createHeader("Actions", 6),
  ];

  const deleteItem = React.useCallback(async (item) => {
    console.log(item);
    await fetch(`api/vehicles/${(selectedVehicle as VehicleData).id}/vehicledata/${item.id}?month=${inputMonth}&year=${inputYear}`, { method: 'DELETE' });
    mutate(`api/vehicles/${(selectedVehicle as VehicleData).id}/vehicledata?month=${inputMonth}&year=${inputYear}`, )
    dispatch({ type: "deleteVehicleData", payload: item.id });
  }, [selectedVehicle, inputMonth, inputYear]);

  return (
    <div>
      {data && data.length > 0 && (
        <VehicleTable
          tableRows={data}
          tableHeaders={headers}
          deleteItemClick={deleteItem}
        />
      )}
    </div>
  );
};

export default TableSection;
