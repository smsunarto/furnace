import { useState } from 'react'
import { ContractFunction } from '../components/ContractFunction'
import { useContractEvent } from 'wagmi'

// Import your contract's ABI here.
import GreeterABI from '../abi/Greeter.sol/Greeter.json'
const ABIs = [GreeterABI.abi]

export default function Home() {
  const [value, setValue] = useState()

  ABIs.map((abi) => {
    useContractEvent({
      addressOrName: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      contractInterface: abi,
      eventName: 'GMEverybodyGM',
      listener: (event) => {
        console.log(event)
        setValue(event[0].event)
      },
    })
  })

  return (
    <>
      <h1>♨️ incoming events ♨️</h1>
      <p>{value}</p>
      <br />
      <h1>♨️ Contracts ♨️</h1>
      {ABIs.map((abi) => {
        return (
          <>
            <h2>♨️ Functions ♨️</h2>
            {abi.map((item) => {
              console.log(item)
              if (!item.name) return
              return (
                <div key={item.name}>
                  <ContractFunction
                    inputs={item.inputs}
                    name={item.name}
                    stateMutatability={item.stateMutability ?? ''}
                    type={item.type}
                  />
                </div>
              )
            })}
          </>
        )
      })}
    </>
  )
}
