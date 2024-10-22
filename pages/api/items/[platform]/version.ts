// /pages/api/items/[platform]/[version].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Item, { IItem } from '../../../../models/Item';

// Define TypeScript type for response
type DataResponse = {
    success: boolean;
    data?: IItem[];
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponse>
) {
    const { platform, version } = req.query;

    await dbConnect();

    try {
        const items = await Item.find({ platform, version });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: (error as Error).message,
        });
    }
}
