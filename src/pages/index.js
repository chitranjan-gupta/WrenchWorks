import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className="flex flex-row justify-center items-center w-full h-full"
    >
      <h1 className=' text-9xl'>Wrench Works</h1>
    </main>
  )
}
