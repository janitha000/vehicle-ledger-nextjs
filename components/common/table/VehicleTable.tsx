import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { VehicleData } from "../../../models/VehicleData";
import ConfirmationPopUp from "../confirmation/ConfirmationPopUp";

interface Props {
  tableHeaders: TableHeader[];
  tableRows: VehicleData[];
  deleteItemClick: (item: VehicleData) => void;
}

export interface TableHeader {
  key: number;
  value: string;
}

const VehicleTable: React.FC<Props> = ({
  tableHeaders,
  tableRows,
  deleteItemClick,
}) => {
  const onDeleteClick = (id: string) => {
    const item = tableRows.filter((x) => x.id === id);
    deleteItemClick(item[0]);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders &&
                tableHeaders.map((header) => (
                  <TableCell align="right" key={header.key}>
                    {header.value}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows &&
              tableRows.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(row.date).toDateString()}
                  </TableCell>
                  <TableCell align="right">{row.expense}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.od_meter}</TableCell>
                  <TableCell align="right">{row.usage}</TableCell>
                  <TableCell align="right">
                    <ConfirmationPopUp
                      mainVal="Delete"
                      secondaryVal="Are you sure you want to delete this item?"
                      headerVal="Delete Item"
                      handleAgree={() => onDeleteClick(row.id)}
                    />
                    {/* <Button
                      onClick={() => onDeleteClick(row.id)}
                      color="secondary"
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(VehicleTable);
