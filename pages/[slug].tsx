import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const Slug: NextPage = () => {

    const router = useRouter()

    const handleGetUrl = async () => {
        return await fetch('/api/getUrl', {
            method: 'POST',
            body: JSON.stringify({
                slug: router.query.slug
            })
        })
            .then(res => res.json())
    }

    const { data, isSuccess, isLoading, isError } = useQuery('get url', handleGetUrl)
    
    useEffect(() => { isSuccess && window.location.assign('https://www.google.com/') }, [data, isSuccess])

    if (isLoading) {
        return (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white" role="status"
            style={{ borderTopColor: "transparent" }} />
        )
    }

    return (<></>)
}

export default Slug