import { Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'

import React, { useState } from 'react'
import { useContractEvent } from 'wagmi'
import { ContractFunction } from '../components/ContractFunction'

// Import your contract's ABI here.
import GreeterABI from '../abi/Greeter.sol/Greeter.json'
const ABIs = [GreeterABI.abi]

const Debug: NextPage = () => {
  const [value, setValue] = useState()

  ABIs.map((abi) => {
    useContractEvent({
      addressOrName: '0xB41DB45C57347669704C6E05305273A6b21e4b71',
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
      <Flex>
        <Flex direction="column" flex={0.5}>
          <Heading>Incoming Events</Heading>
          <p>{value}</p>
        </Flex>
        <Flex direction="column" flex={1}>
          <Heading>Functions</Heading>
          {ABIs.map((abi, i) => {
            return (
              <React.Fragment key={i}>
                {abi.map((item) => {
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
              </React.Fragment>
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default Debug
