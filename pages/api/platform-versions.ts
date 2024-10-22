// /pages/api/platform-versions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import PlatformVersion, {
    IPlatformVersion,
} from '../../models/PlatformVersion';

type DataResponse = {
    success: boolean;
    data?: IPlatformVersion[];
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponse>
) {
    await dbConnect();

    try {
        const platforms = await PlatformVersion.find({});
        res.status(200).json({ success: true, data: platforms });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: (error as Error).message,
        });
    }
}