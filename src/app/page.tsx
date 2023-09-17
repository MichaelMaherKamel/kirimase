import SignIn from '@/components/auth/SignIn'
import { serverClient } from '@/lib/trpc/server'
import { GiClothes } from 'react-icons/gi'
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [site] = (await serverClient.site.getSite()).site
  return (
    <div>
      <div>
        <SignIn />
      </div>
      <div className='flex justify-center mx-5'>
        <GiClothes />
        {site.sitename}
      </div>
    </div>
  )
}
