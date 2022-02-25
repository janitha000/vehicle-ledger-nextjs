import * as React from "react";
import { VechicleStateContext } from "../../context/VehicleContext";
import VehicleCard from "../common/card/VehicleCard";
import styles from './AverageCard.module.css'

const AverageCard = () => {
  const { state: { vehicleItems }, } = React.useContext(VechicleStateContext);
  const averages = React.useMemo(() => {
    if (vehicleItems && vehicleItems.length > 0) {
        console.log(vehicleItems)
      const totalCost = vehicleItems.reduce(
        (a, b) => a + (b.amount) ? b.amount : 0,
        0
      );
      const totalKm = vehicleItems.reduce((a, b) => a + b.usage, 0);
      console.log(totalCost)
      console.log(totalKm)
      return { totalCost, totalKm, average: (totalCost / totalKm).toFixed(2) };
    }
  }, [vehicleItems])

  return (
    <div className={styles.average}>
      {averages && averages.average && <>
        <VehicleCard header={"Average cost per km"} value={averages.average} unit={"LKR"} />
        <VehicleCard header={"Total cost"} value={averages.totalCost.toString()} unit={"LKR"} />
        <VehicleCard header={"Total usage"} value={averages.totalKm.toString()} unit={"Km"} /></>}

    </div>
  );
}


export default AverageCard