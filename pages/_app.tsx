import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VehicleContextProvider } from '../context/VehicleContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <VehicleContextProvider><Component {...pageProps} /></VehicleContextProvider> 
}

export default MyApp

