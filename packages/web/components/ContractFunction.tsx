import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import GreeterAbi from '../abi/Greeter.sol/Greeter.json'
const abi = GreeterAbi.abi

type Props = {
  inputs: Input[]
  name: string
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
  if (type !== 'function') return null
  const Content = stateMutatability === 'view' ? ContractRead : ContractWrite
  return (
    <div
      style={{
        // borderBottom: '1px solid gray',
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
    addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
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
    <Box backgroundColor="whiteAlpha.200" borderRadius="12px" padding="24px">
      <Heading fontSize="lg" fontFamily="IBM Plex Mono">
        {name}
      </Heading>
      <Button my="6px" onClick={handleRead}>
        call
      </Button>
      {value && <Text>Output: {value}</Text>}
    </Box>
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
    addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
    contractInterface: abi,
    functionName: name,
    args: [value],
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  // console.log(inputs)

  return (
    <Box backgroundColor="whiteAlpha.200" borderRadius="12px" padding="24px">
      <Heading fontSize="lg" fontFamily="IBM Plex Mono">
        {name}
      </Heading>
      {inputs &&
        inputs.map((input) => {
          return (
            <Flex
              alignItems="center"
              key={input.name}
              style={{ display: 'flex', gap: '12px' }}
            >
              <Text>{input.name}:</Text>
              <Input
                name={input.name}
                onChange={handleChange}
                placeholder={input.type}
                maxWidth="144px"
                type="text"
                variant="filled"
              />
            </Flex>
          )
        })}

      <Button disabled={!write} onClick={() => write?.()}>
        call
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </Box>
  )
}
