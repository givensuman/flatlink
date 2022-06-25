import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { slug } = JSON.parse(req.body)

    // @ts-ignore
    const { url } = await prisma.link.findFirst({ where: {
        slug: slug
    }})

    return res.status(200).json({ url: url })
}
