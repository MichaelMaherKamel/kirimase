import SignIn from '@/components/auth/SignIn'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center justify-center'>
        <SignIn />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-900'>Hello World!</h1>
      </div>
    </main>
  )
}
