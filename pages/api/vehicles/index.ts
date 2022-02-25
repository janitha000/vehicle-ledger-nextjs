import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../util/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const vehicles = await db.collection('vehicles').get();
            const vehicleData = vehicles.docs.map(vehicle => ({
                id: vehicle.id,
                ...vehicle.data()
            }));
            res.status(200).json(vehicleData);
        }
        else if (req.method === "POST") {
            const { id } = await db.collection('vehicles').add({
                ...req.body,
                created: new Date().toISOString(),
            });
            res.status(200).json({ id });
        }
    } catch (e) {
        res.status(400).end();
    }
}

export default handler;