import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useCopyToClipboard, useEventListener } from 'usehooks-ts'
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi'

const Home: NextPage = () => {

  const [ input, setInput ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    input.length > 0 && setErrorMessage(null)
  }, [input])

  const isValidUrl = (url: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator
    return !!pattern.test(url)
  }

  const handleSubmit = async () => {
    if (input.length > 0 && isValidUrl(input)) {
      return await fetch('/api/addUrl', {
        method: 'POST', 
        body: JSON.stringify({
          url: input
        })
      })
        .then(res => {
          setErrorMessage(null)
          return res.json()
        })
        .catch(() => setErrorMessage('Something went wrong'))
    } else {
      if (input.length === 0) {
        setErrorMessage('No URL provided')
      }
      else if (!isValidUrl(input)) {
        setErrorMessage('Not a valid URL')
      }
    }
  }

  const { mutate, data: slug, isSuccess, isLoading, reset } = useMutation('submit', handleSubmit)

  useEventListener('keydown', e => {
    e.key === 'Enter' && mutate()
  })

  const [ _, copy ] = useCopyToClipboard()
  const [isCopied, setIsCopied ] = useState(false)
  const handleCopy = () => {
    copy(`localhost:3000/${slug}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  if (isSuccess && slug) {
    return (<AnimatePresence>
      <motion.div
        key="copy url"
        className="flex flex-col items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div 
          className="bg-sky-100 p-4 rounded-md cursor-pointer hover:bg-slate-200 mb-2 w-64 flex justify-center px-3"
          onClick={handleCopy}
        >
          localhost:3000/{slug}
        </div>
        <div className="flex flex-row w-full space-x-1">
          <button 
            className="bg-sky-400 py-2 px-4 rounded-md w-1/2 hover:bg-sky-500 text-white focus:ring-sky-200 focus:ring-4 flex items-center justify-center"
            onClick={handleCopy}
          >
            {!isCopied ? 
            <>
              <HiClipboardCopy className="mr-1" />
              Copy
            </> : 
            <>
              <HiClipboardCheck className="mr-1" />
              Copied!
            </>
            }
          </button>
          <button 
            className="hover:bg-slate-200 py-2 rounded-md w-1/2 text-gray-800"
            onClick={() => {
              setInput("")
              reset()
            }}
          >
            Start over
          </button>
        </div>
      </motion.div>
    </AnimatePresence>)
  }

  return (<AnimatePresence>
    <motion.div
      key="enter url"
      className="flex flex-col"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-4xl mb-4 font-bold space-x-2">
        <span className="text-blue-400">link</span>
        <span className="text-sky-400">shortener</span>
        <span>🤏</span>
      </h1>
      <div className="flex flex-row space-x-2">
        <input
          className="border-2 border-gray-200 rounded-lg outline-none focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-200 p-2 w-60 max-w-full"
          spellCheck="false"
          placeholder="Your URL"
          onInput={handleInput}
          value={input}
          disabled={isLoading}
        />
        <button
          className="bg-sky-400 text-white py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 w-24"
          onClick={() => mutate()}
        >
          {isLoading ?
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white" role="status"
            style={{ borderTopColor: "transparent" }} />
          : "Shorten"
          }
        </button>
      </div>
      {errorMessage && 
        <label className="text-red-400 mt-2">
          {errorMessage}
        </label>
      }
    </motion.div>
  </AnimatePresence>)
}

export default Home
