import { NextApiRequest, NextApiResponse } from "next";
import { VehicleData } from "../../../../../models/VehicleData";
import db from '../../../../../util/db';
import admin from 'firebase-admin'

interface InsertVehicleBody {
    date: Date;
    id: string;
    od_meter: number;
    usage: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            const { id, month, year } = req.query;
            const vehicleData = await GetVehicleData(id as string, month as string, year as string);
            res.status(200).json(vehicleData);
        }

        else if (req.method === "POST") {
            const body: InsertVehicleBody = req.body;
            const { id } = req.query;
            const newId = await AddVehicleData(body, id as string);
            res.status(200).json({ newId });
        }

    } catch (e) {
        console.log(e)
        res.status(400).end();
    }
}

export default handler;


const GetVehicleData = async (id: string, month: string, year: string) => {
    let inputMonth = parseInt(month as string);
    let calculatedMonth = (inputMonth < 10) ? `0${inputMonth + 1}` : `${inputMonth + 1}`

    let normalMonths = ["04", "06", "09", "11"]
    let greatMonths = ["01", "03", "05", "07", "08", "10", "12"]

    const startDate = new Date(`${year}-${calculatedMonth}-01`);
    const endtDate = (normalMonths.includes(calculatedMonth)) ? new Date(`${year}-${calculatedMonth}-30Z23:23:23`)
        : ((greatMonths.includes(calculatedMonth)) ? new Date(`${year}-${calculatedMonth}-31Z23:23:23`) : new Date(`${year}-${calculatedMonth}-28Z23:23:23`));

    const vechicleDataList = await db.collection(`/vehicles/${id}/vehicledata`)
        .where('date', '>', startDate)
        .where('date', '<=', endtDate)
        .orderBy('date', 'desc')
        .orderBy('od_meter', 'desc').get();

    const vehicleData = vechicleDataList.docs.map(vehicle => ({
        id: vehicle.id,
        ...vehicle.data(),
        date: new Date(vehicle.data().date._seconds * 1000),
    }));

    return vehicleData;
}

const AddVehicleData = async (vehicle: InsertVehicleBody, vehicleId: string): Promise<string> => {
    let month = new Date(vehicle.date).getMonth().toString();
    let year = new Date(vehicle.date).getFullYear().toString();;
    const vehicleData = await GetVehicleData(vehicleId, month, year);
    if (vehicleData.length > 0 && new Date(vehicleData[0].date) > new Date(vehicle.date)) {
        let lessRecord = vehicleData.filter(x => new Date(x.date) > new Date(vehicle.date)).pop() as VehicleData;
        console.log(vehicleData)


        await db.collection(`vehicles`).doc(vehicleId).collection('vehicledata').doc(lessRecord!.id)
            .update({ usage: lessRecord!.od_meter - vehicle.od_meter });
    }
    // else if (vehicle.usage === 0 && vehicleData.length === 0) {
    //     if (parseInt(month) === 0) year = (parseInt(year) - 1).toString();

    //     let vehicleData = await GetVehicleData(vehicleId, month, year);

    // }

    const { id } = await db.collection(`vehicles`).doc(vehicleId).collection('vehicledata').add({
        ...vehicle,
        date: admin.firestore.Timestamp.fromDate(new Date(vehicle.date)),
        created: new Date().toISOString(),
    });

    return id;

}