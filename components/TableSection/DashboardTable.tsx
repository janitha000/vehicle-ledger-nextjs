import React from "react";
import useSWR from "swr";
import { VechicleStateContext } from "../../context/VehicleContext";
import { VehicleData } from "../../models/VehicleData";
import fetcher from "../../util/fetcher";
import { TableHeader } from "../common/table/VehicleTable";
import VehicleTableData from "../common/table/VehicleTableData";
import TTable, {
  TableData,
  TTableHeaders,
  TTableRows,
} from "../common/TTable/TTable";

const DashboardTable = () => {
  const {
    state: { inputYear, inputMonth, selectedVehicle },
  } = React.useContext(VechicleStateContext);
  const { data, error } = useSWR<VehicleData[]>(
    `api/vehicles/${
      (selectedVehicle as VehicleData).id
    }/vehicledata?month=${inputMonth}&year=${inputYear}`,
    fetcher
  );

  const headers: TTableHeaders[] = [
    { key: 1, value: "Date", isAction: false },
    { key: 2, value: "Expense", isAction: false },
    { key: 3, value: "Amount(LKR)", isAction: false },
    { key: 4, value: "OD Meter", isAction: false },
    { key: 5, value: "Usage", isAction: false },
  ];

  //   const rows: TTableRows[] | undefined = React.useMemo(() => {
  //     let tableRows: TTableRows[] = [];
  //     if (data && data.length > 0) {
  //       data.forEach((item) => {
  //         let tableData: JSX.Element[] = [
  //           <VehicleTableData value={new Date(item.date).toDateString()} />,
  //           <VehicleTableData value={item.expense} />,
  //           <VehicleTableData value={item.amount?.toString()} />,
  //           <VehicleTableData value={item.od_meter.toString()} />,
  //           <VehicleTableData value={item.usage?.toString()} />,
  //         ];
  //         debugger;

  //         tableRows.push({ key: item.id, tableData });
  //       });
  //     }

  //     return tableRows!;
  //   }, [data]);

  const rows: TTableRows[] | undefined = React.useMemo(() => {
    let tableRows: TTableRows[] = [];
    if (data && data.length > 0) {
      data.forEach((item) => {
        let tableData: TableData[] = [
          { value: new Date(item.date).toDateString(), isAction: false },
          { value: item.expense, isAction: false },
          { value: item.amount?.toString(), isAction: false },
          { value: item.od_meter.toString(), isAction: false },
          { value: item.usage?.toString(), isAction: false },
        ];

        tableRows.push({ key: item.id, tableData });
      });
    }

    return tableRows!;
  }, [data]);

  return (
    <div>
      {data && data.length > 0 && <TTable rows={rows} headers={headers} />}
    </div>
  );
};

export default DashboardTable;
