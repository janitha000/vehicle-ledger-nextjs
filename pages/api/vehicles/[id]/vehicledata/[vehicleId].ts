import { NextApiRequest, NextApiResponse } from "next";
import { VehicleData } from "../../../../../models/VehicleData";
import db from "../../../../../util/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "DELETE") {
            const { id, vehicleId, month, year } = req.query;

            console.log(id)

            const vehicleData = await GetVehicleData(id as string, month as string, year as string) as VehicleData[];
            const deletingItem = await GetVehicleDataById(id as string, vehicleId as string)

            console.log(vehicleData)
            if (deletingItem && vehicleData.length > 0 && vehicleData[0].od_meter > deletingItem!.od_meter) {
                let lessRecord = vehicleData.filter(x => x.od_meter > deletingItem!.od_meter).pop()
                let greatRecord = vehicleData.filter(x => x.od_meter < deletingItem!.od_meter)[0]

                console.log(lessRecord)
                console.log(greatRecord)

                if (lessRecord !== undefined && greatRecord !== undefined) {
                    await db.collection('vehicles').doc(id as string).collection('vehicledata').doc(lessRecord.id).update({ usage: Math.abs(lessRecord.od_meter - greatRecord.od_meter) })
                }
            }
            const doc = await db.collection('vehicles').doc(id as string).collection('vehicledata').doc(vehicleId as string).delete();
            res.status(200).end();

        }

    } catch (e) {
        res.status(400).end();
    }
}

export default handler;

const GetVehicleData = async (id: string, month: string, year: string) => {
    let inputMonth = parseInt(month as string);
    let calculatedMonth = (inputMonth < 10) ? `0${inputMonth + 1}` : `${inputMonth + 1}`

    const startDate = new Date(`${year}-${calculatedMonth}-01`);
    const endtDate = new Date(`${year}-${calculatedMonth}-31`);

    const vechicleDataList = await db.collection(`/vehicles/${id}/vehicledata`)
        .where('date', '>', startDate)
        .where('date', '<', endtDate)
        .orderBy('date', 'desc')
        .orderBy('od_meter', 'desc').get();

    const vehicleData = vechicleDataList.docs.map(vehicle => ({
        id: vehicle.id,
        ...vehicle.data(),
        date: new Date(vehicle.data().date._seconds * 1000),
    }));

    return vehicleData;
}

const GetVehicleDataById = async (id: string, vehicleDataId: string) => {
    const vehicleItem = await db.collection('vehicles').doc(id).collection('vehicledata').doc(vehicleDataId).get();
    if (!vehicleItem.exists) {
        return null;
    } else {
        return vehicleItem.data();
    }
}