import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Footer from '../components/common/footer/footer'
import SearchSection from '../components/SearchSection/SearchSection'
import { VechicleDispatchContext } from '../context/VehicleContext'
import { Vehicle } from '../models/Vehicle'
import styles from '../styles/Home.module.css'
import { API_URL } from '../util/constants'

interface Props {
  defaultVehicle: Vehicle
}

const Home: NextPage<Props> = ({defaultVehicle}) => {
  const {dispatch} = useContext(VechicleDispatchContext);

  useEffect(() => {
    if(defaultVehicle) dispatch({ type: "setSelectedVehicle", payload: defaultVehicle });
  }, [defaultVehicle])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
        <div className={styles.homeSearch}>
        <SearchSection />

        </div>
      </main>

      <Footer />
    </div>
  )
}

export const  getStaticProps : GetStaticProps = async (context)  => {
  const data= await fetch(`${API_URL}/vehicles`);
  const res = await data.json();
  const defaultVehicle : Vehicle = res[0];

  return {
    props: {
      defaultVehicle
    }, 
  }
}

export default Home
