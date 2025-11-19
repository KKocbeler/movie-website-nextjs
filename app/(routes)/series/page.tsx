import ListPage from '@/components/sections/listpage/ListPage';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ListPage title='Tv Series' type='tv'/>
    </Suspense>
  )
}

export default page