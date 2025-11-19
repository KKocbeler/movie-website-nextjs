import ListPage from '@/components/sections/listpage/ListPage'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ListPage title='Movies' type='movie'/>
    </Suspense>
  )
}

export default page