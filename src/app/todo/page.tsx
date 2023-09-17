import TodList from '@/components/todo/TodList'
import NewTodModal from '@/components/todo/TodModal'
import { getTods } from '@/lib/api/todo/queries'
import { checkAuth } from '@/lib/auth/utils'

export default async function Todo() {
  await checkAuth()
  const { todo } = await getTods()

  return (
    <main className='max-w-3xl mx-auto p-5 md:p-0 sm:pt-4'>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-2xl my-2'>Todo</h1>
        <NewTodModal />
      </div>
      <TodList todo={todo} />
    </main>
  )
}
