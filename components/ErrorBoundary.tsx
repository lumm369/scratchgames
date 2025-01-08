'use client'

import React from 'react'
import { NoGamesUI } from './NoGamesUI'

interface Props {
  fallback?: React.ReactNode
  children?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 可以在这里记录错误日志
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <NoGamesUI 
          error={this.state.error?.message || 'An unknown error has occurred'} 
          title="An error has occurred" 
        />
      )
    }

    return this.props.children
  }
}

// 使用方式
export default ErrorBoundary