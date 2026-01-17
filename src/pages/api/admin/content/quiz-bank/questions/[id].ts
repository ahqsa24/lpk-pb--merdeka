import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { content, options, correct_answer, explanation, type_id } = req.body;

            const optionsString = typeof options === 'string' ? options : JSON.stringify(options);

            const question = await prisma.question_bank.update({
                where: { id: BigInt(String(id)) },
                data: {
                    content,
                    options: optionsString,
                    correct_answer,
                    explanation,
                    type_id: type_id ? BigInt(type_id) : undefined
                }
            });
            return res.json(serializeBigInt(question));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating question' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.question_bank.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting question' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);
