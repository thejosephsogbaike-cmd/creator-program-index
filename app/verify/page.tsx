import { Suspense } from 'react'
import { VerifyContent } from './VerifyContent'

export default function VerifyPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-gray-500 text-sm">Verifying…</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  )
}
