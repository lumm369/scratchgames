import RetryButton from './RetryButton'

interface NoGamesUIProps {
  error?: string
  title?: string
}

export function NoGamesUI({ 
  error = 'There is no game data yet',
  title = 'No game found' 
}: NoGamesUIProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* 错误图标 */}
        <div className="w-24 h-24 text-red-500 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        {/* 错误标题 */}
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>
        
        {/* 错误信息 */}
        <div className="text-red-500 font-semibold text-lg animate-pulse">
          {error}
        </div>
        
        {/* 重试按钮 */}
        <RetryButton />
      </div>
    </div>
  )
}