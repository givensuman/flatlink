import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navbar from '../components/Navbar'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>link shortener 🤏| flatlink</title>
    </Head>
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center w-full min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
    </>
  )
}

export default MyApp
