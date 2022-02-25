import React, { createContext, useContext, useReducer } from "react";
import { VehicleData } from "../models/VehicleData";

interface VehicleState {
    vehicleItems : VehicleData[];
    inputYear : number;
    inputMonth: number,
    selectedVehicle : VehicleData | {};
    recallApi : boolean;
}

interface IVehicleStateContextProps {
    state: VehicleState;
}

interface IVehicleDispatchContextProps {
  dispatch: (action: VehicleAction) => void;
}

type VehicleAction = | {  type: "setVehicleItems" | "setYear" | "setMonth" | "setSelectedVehicle" | "deleteVehicleData" | "recallApi", payload: any }


const iniialState : VehicleState = {
  vehicleItems: [],
  inputYear: new Date().getFullYear(),
  inputMonth: new Date().getMonth(),
  selectedVehicle: {},
  recallApi: false
};

export const VechicleStateContext = createContext({} as IVehicleStateContextProps);
export const VechicleDispatchContext = createContext({} as IVehicleDispatchContextProps);

const vehicleReducer = (state : VehicleState, action: VehicleAction) => {
  switch (action.type) {
    case "setVehicleItems":
      return {
        ...state,
        vehicleItems: action.payload,
      };
    case "setYear":
      return {
        ...state,
        inputYear: action.payload,
      };
    case "setMonth":
      return {
        ...state,
        inputMonth: action.payload,
      };
    case "setSelectedVehicle":
      return {
        ...state,
        selectedVehicle: action.payload,
      };
    case "deleteVehicleData":
      let filteredItems = state.vehicleItems.filter(x => x.id !== action.payload)
      return {
        ...state,
        vehicleItems: filteredItems,
      };
    case "recallApi":
      let recall = !state.recallApi
      return {
        ...state,
        recallApi: recall,
      };

  }
  return state;
};

export const VehicleContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(vehicleReducer, iniialState);
  return (
    <VechicleDispatchContext.Provider value={{  dispatch }}>
    <VechicleStateContext.Provider value={{  state }}>
      {children}
    </VechicleStateContext.Provider>
    </VechicleDispatchContext.Provider>
  );
};
