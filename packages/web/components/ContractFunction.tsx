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
  stateMutatability: 'view' | 'nonpayable' | 'payable'
  type: 'function' | 'constructor' | 'event' | 'fallback'
}

type Input = {
  internalType: string
  name: string
  type: string
}

const ContractFunction: React.FC<Props> = ({
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
  const [value, setValue] = useState()
  console.log('🚀 ~ value', value)

  const { data, status } = useContractRead({
    addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
    contractInterface: abi,
    functionName: name,
    // enabled: false,
  })

  return (
    <>
      <h1>
        <b>{name}</b>
      </h1>
      <button
        onClick={() => setValue(data)}
        style={{ border: '1px solid #eaeaea', padding: '0.5rem 1rem' }}
      >
        call
      </button>
      <p>status: {status}</p>
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
  const [value, setValue] = useState()

  const { config, error } = usePrepareContractWrite({
    addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
    contractInterface: abi,
    functionName: name,
    args: [value],
  })
  const { data, status, write } = useContractWrite(config)

  const txHash = status === 'success' ? data.hash : ''

  const handleChange = (event) => {
    const value = event.target.value
    setValue(value)
  }

  const disabled = (inputs.length > 0 && !value) || !write

  return (
    <>
      <h1>
        <b>{name}</b>
      </h1>
      {inputs.map((input) => {
        const arg = input as Input
        return (
          <div key={input.name} style={{ display: 'flex', gap: '12px' }}>
            <p>{input.name}:</p>
            <input
              name={input.name}
              onChange={handleChange}
              placeholder={input.type}
              type="text"
            />
          </div>
        )
      })}
      <button
        disabled={disabled}
        onClick={() => write()}
        style={{
          border: '1px solid #eaeaea',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: '0.5rem 1rem',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        call
      </button>
      <p>status: {status}</p>
      {txHash && (
        <a
          href={`https://ropsten.etherscan.io/tx/${txHash}`}
          style={{ color: '#92fca4' }}
          target="_blank"
        >
          view in block explorer
        </a>
      )}
    </>
  )
}

export default ContractFunction
