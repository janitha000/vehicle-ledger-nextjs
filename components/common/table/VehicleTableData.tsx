import React from "react";

interface props {
  value: string;
}
const VehicleTableData: React.FC<props> = ({ value }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{value}</div>
    </td>
  );
};

export default VehicleTableData;
