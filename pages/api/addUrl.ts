import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { url } = JSON.parse(req.body)
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url
    }

    const urlExists = await prisma.link.findMany({ 
        where: { 
            url: {
                equals: url
            }
        }
    })
    if (urlExists.length > 0) {
        return res.status(201).json(urlExists[0].slug)
    }
    
    let slug = nanoid(10)
    let slugExists = await prisma.link.findMany({ 
        where: { 
            slug: {
                equals: slug
            }
        }
    })
    while (slugExists.length > 0) {
        slug = nanoid(10)
        slugExists = await prisma.link.findMany({
            where: { 
                slug: {
                    equals: slug
                }
            }
        })
    }

    try {
        await prisma.link.create({
            data: {
                url: url,
                slug: slug
            }
        })

        return res.status(200).json(slug)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
}