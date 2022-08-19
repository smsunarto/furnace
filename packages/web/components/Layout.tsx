import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Center marginTop={4}>
        <Flex backgroundColor="#db3933" borderRadius={8} padding={2}>
          <NextLink href={'/'} passHref>
            <Button>Home</Button>
          </NextLink>
          <div style={{ width: '12px' }} />
          <NextLink href={'/debug'} passHref>
            <Button>Debug</Button>
          </NextLink>
        </Flex>
        <Box position="absolute" right="12px">
          <ConnectButton />
        </Box>
      </Center>
      <main>
        <Box padding={6}>{children}</Box>
      </main>
    </div>
  )
}

export default Layout
