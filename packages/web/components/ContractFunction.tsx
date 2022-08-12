import React, { useState } from 'react'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'
import GreeterAbi from '../abi/Greeter.sol/Greeter.json'
const abi = GreeterAbi.abi

type Props = {
  inputs: Input[]
  name?: string
  stateMutatability: string
  type: string
}

type Input = {
  internalType: string
  name: string
  type: string
}

export const ContractFunction: React.FC<Props> = ({
  inputs,
  name,
  stateMutatability,
  type,
}) => {
  if (type !== 'function') return
  const Content = stateMutatability === 'view' ? ContractRead : ContractWrite
  return (
    <div
      style={{
        borderBottom: '1px solid gray',
        padding: '2rem 0',
      }}
    >
      <Content
        inputs={inputs}
        name={name}
        stateMutatability={stateMutatability}
        type={type}
      />
    </div>
  )
}

const ContractRead: React.FC<Props> = ({
  inputs,
  name,
  stateMutatability,
  type,
}) => {
  const { refetch, data, isLoading, isError } = useContractRead({
    addressOrName: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    contractInterface: abi,
    functionName: name,
    enabled: false,
  })

  const [value, setValue] = useState(data)

  const handleRead = async () => {
    const { data } = await refetch()
    setValue(data)
  }

  return (
    <>
      <h1>
        <b>{name}</b>
      </h1>
      <button
        onClick={() => handleRead()}
        style={{ border: '1px solid #eaeaea', padding: '0.5rem 1rem' }}
      >
        call
      </button>
      {value && <p>Output: {value}</p>}
    </>
  )
}

const ContractWrite: React.FC<Props> = ({
  inputs,
  name,
  stateMutatability,
  type,
}) => {
  const [value, setValue] = useState('')

  const { config } = usePrepareContractWrite({
    addressOrName: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    contractInterface: abi,
    functionName: name,
    args: [value],
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  console.log(inputs)

  return (
    <>
      <h1>
        <b>{name}</b>
      </h1>
      {inputs &&
        inputs.map((input) => {
          return (
            <div key={input.name} style={{ display: 'flex', gap: '12px' }}>
              <p>{input.name}:</p>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  name={input.name}
                  onChange={handleChange}
                  placeholder={input.type}
                />
              </div>
            </div>
          )
        })}

      <button
        disabled={!write}
        onClick={() => write?.()}
        style={{
          border: '1px solid #eaeaea',
          cursor: !write ? 'not-allowed' : 'pointer',
          padding: '0.5rem 1rem',
          opacity: !write ? 0.5 : 1,
        }}
      >
        call
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  )
}
