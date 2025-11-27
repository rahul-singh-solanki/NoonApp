import  { useRef, useCallback } from 'react'

function useDebounce<T extends (...args: any[]) => any>(value: T, delay: number): (...args: Parameters<T>) => void {
  const timerRef = useRef<number>(null)

  const fn = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      value(...args)
    }, delay)
  }, [value, delay])

  return fn
}

export default useDebounce