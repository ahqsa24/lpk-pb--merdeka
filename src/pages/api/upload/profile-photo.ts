import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads/profiles');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        filename: (name: string, ext: string, part: any, form: any) => {
            return `profile-${Date.now()}${ext}`;
        }
    });

    try {
        const [fields, files] = await form.parse(req);
        // files.file might be an array or single object depending on version/config
        // In v3 with multiples: false (default), it's array of files.
        const file = Array.isArray(files.file) ? files.file[0] : (files.file as any);
        // Also check for 'image' field
        const imageFile = file || (Array.isArray(files.image) ? files.image[0] : (files.image as any));

        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded. Use field name "file" or "image".' });
        }

        const fileName = path.basename(imageFile.filepath);
        const fileUrl = `/uploads/profiles/${fileName}`;

        console.log('File uploaded to:', fileUrl);

        return res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: 'Upload failed', error: String(error) });
    }
}
