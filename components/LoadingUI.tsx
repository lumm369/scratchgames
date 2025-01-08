export function LoadingUI() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
      <p className="ml-4 text-lg text-gray-600 animate-pulse">Loading...</p>
    </div>
  )
}