import type { NextPage } from 'next'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Props {
    params: {
        slug: string
    }
}

export const getServerSideProps = async ({ params }: Props) => {
    const { slug } = params
    
    const data = await prisma.link.findFirst({ where: {
        slug: {
            equals: slug
        }
    }})

    if (data) {
        try {
            return {
                redirect: {
                    destination: data.url
                }
            }
        } catch(err) {
            console.error(err)
            return {
                redirect: {
                    destination: '/'
                }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
}

const Slug: NextPage = () => {
    return (<>
        <div className="flex flex-col justify-center">
            <h1 className="text-4xl mb-6">
                Link not found
            </h1>
            <Link href="/">
                <button className="bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300">
                    Go back
                </button>
            </Link>
        </div>
    </>)
}

export default Slug