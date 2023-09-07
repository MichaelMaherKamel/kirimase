import SignIn from '@/components/auth/SignIn'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1>Hello Next.js!</h1>
      <Image src='/logo.svg' alt='logo' width={100} height={100} />
      <SignIn />
    </main>
  )
}
