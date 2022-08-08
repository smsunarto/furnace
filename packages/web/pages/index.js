import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GreeterAbi from '../abi/Greeter.sol/Greeter.json'
import ContractFunction from '../components/ContractFunction'
import { useContractEvent } from 'wagmi'

const abi = GreeterAbi.abi
console.log('🚀 ~ Home ~ abi', abi)

export default function Home() {
  const [value, setValue] = useState()

  useContractEvent({
    addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
    contractInterface: abi,
    eventName: 'GMEverybodyGM',
    listener: (event) => {
      console.log(event)
      setValue(event[0].event)
    },
  })
  return (
    <div>
      <Head>
        <title>♨️ furnace</title>
        <meta name="description" content="scaffold-eth but better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>♨️ incoming events ♨️</h1>
        <p>{value}</p>
        <br />
        <h1>♨️ functions ♨️</h1>
        {abi.map((item) => {
          if (!item.name) return
          return (
            <div key={item.name}>
              <ContractFunction
                inputs={item.inputs}
                name={item.name}
                stateMutatability={item.stateMutability}
                type={item.type}
              />
            </div>
          )
        })}
      </main>

      <footer className={styles.footer}>hi</footer>
    </div>
  )
}
