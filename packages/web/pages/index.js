import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GreeterAbi from '../abi/Greeter.sol/Greeter.json'

export default function Home() {
  const abi = GreeterAbi.abi
  console.log('🚀 ~ Home ~ abi', abi)

  return (
    <div>
      <Head>
        <title>furnace</title>
        <meta name="description" content="scaffold-eth but better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>functions</h1>
        {abi.map((item) => {
          if (!item.name) return
          return (
            <div
              key={item.name}
              style={{
                borderBottom: '1px solid gray',
                padding: '2rem 0',
              }}
            >
              <h1>
                <b>{item.name}</b>
              </h1>
              {item.inputs.map((input) => {
                return (
                  <div
                    key={input.name}
                    style={{ display: 'flex', gap: '12px' }}
                  >
                    <p>{input.name}:</p>
                    <input
                      name={input.name}
                      placeholder={input.type}
                      type="text"
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </main>

      <footer className={styles.footer}>hi</footer>
    </div>
  )
}
