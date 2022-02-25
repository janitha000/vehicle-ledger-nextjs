import * as React from "react";
import { VechicleStateContext } from "../../context/VehicleContext";
import VehicleCard from "../common/card/VehicleCard";
import styles from './AverageCard.module.css'

const AverageCard = () => {
  const { state: { vehicleItems }, } = React.useContext(VechicleStateContext);
  const averages = React.useMemo(() => {
    if (vehicleItems && vehicleItems.length > 0) {
        
      const totalKm = vehicleItems.reduce((a, b) => a + b.usage, 0);
      const totalCost = vehicleItems.map(x => x.amount).reduce((a,b) => a + b,0);
      const average = (totalCost === 0 || totalKm === 0) ? "0" : (totalCost / totalKm).toFixed(2)
      console.log(totalCost)
      console.log(totalKm)
      return { totalCost, totalKm, average};
    }
  }, [vehicleItems])

  return (
    <div className={styles.average}>
      {averages && averages.average && <>
        <VehicleCard header={"Average cost per km"} value={averages.average.toString()} unit={"LKR"} />
        <VehicleCard header={"Total cost"} value={averages.totalCost.toString()} unit={"LKR"} />
        <VehicleCard header={"Total usage"} value={averages.totalKm.toString()} unit={"Km"} /></>}

    </div>
  );
}


export default AverageCard