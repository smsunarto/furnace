import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
  fonts: {
    heading: 'Inter',
  },
  styles: {
    global: () => ({
      body: {
        bg: '#000',
      },
    }),
  },
})

export default theme
