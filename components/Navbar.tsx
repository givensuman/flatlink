import React from 'react'
import Link from 'next/link'

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="p-2 mx-2 hover:bg-slate-200 rounded-md focus:ring-4 focus:ring-sky-300 text-gray-800 outline-none"
        >
            {children}
        </button>
    )
}

const Navbar = () => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-end items-center p-3 mb-36 md:space-x-10 lg:space-x-20">
            <Link href="/">
                <h1 className="text-4xl font-bold flex flex-row mr-auto select-none mx-2 cursor-pointer">
                    <span className="text-blue-400">flat</span>
                    <span className="text-sky-400">link</span>
                </h1>
            </Link>
            <div className="flex flex-row items-center">
            <Link href="/">
                <Button>
                    Privacy
                </Button>
            </Link>
            <Link href="/">
                <Button>
                    Github
                </Button>
            </Link>
            <Button>
                Theme
            </Button>
            </div>
        </div>
    )
}

export default Navbar