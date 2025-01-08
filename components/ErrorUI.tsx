import RetryButton from './RetryButton'

interface ErrorUIProps {
  error?: string
  title?: string
}

export function ErrorUI({ 
  error = 'Failed to load, please try again later',
  title = 'An error has occurred'
}: ErrorUIProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24">
          <svg className="text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="text-red-500 text-center max-w-md">{error}</div>
        <RetryButton />
      </div>
    </div>
  )
}