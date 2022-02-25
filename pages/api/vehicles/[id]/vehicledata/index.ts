import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../../util/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const vechicleDataList = await db.collection(`/vehicles/${id}/vehicledata`).get();
        const vehicleData = vechicleDataList.docs.map(vehicle => ({
            id: vehicle.id,
            ...vehicle.data(),
            date: new Date(vehicle.data().date._seconds * 1000),
        }));
        res.status(200).json(vehicleData);
    } catch (e) {
        res.status(400).end();
    }
}

export default handler;