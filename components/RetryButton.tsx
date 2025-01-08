'use client'

type RetryButtonProps = {
  onRetry?: () => void
  className?: string
  text?: string
}

export default function RetryButton({ 
  onRetry = () => window.location.reload(),
  className = '',
  text = 'Retry'
}: RetryButtonProps) {
  return (
    <button 
      onClick={onRetry}
      className={`mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors ${className}`}
    >
      {text}
    </button>
  )
}