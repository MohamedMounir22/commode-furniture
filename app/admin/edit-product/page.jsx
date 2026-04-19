import { Suspense } from 'react'
import EditProductForm from './EditProductForm'

export const dynamic = 'force-dynamic'

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto p-10"><div className="flex justify-center items-center h-64">Loading...</div></div>}>
      <EditProductForm />
    </Suspense>
  )
}
