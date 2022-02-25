import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../util/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            const { id } = req.query;
            const doc = await db.collection('vehicles').doc(id as string).get();
            if (!doc.exists) {
                res.status(404).end();
            } else {
                res.status(200).json(doc.data());
            }
        }
        else if (req.method === "DELETE") {
            const { id } = req.query;
            const doc = await db.collection('vehicles').doc(id as string).get();
            res.status(200).end();
        }

    } catch (e) {
        res.status(400).end();
    }
}

export default handler;