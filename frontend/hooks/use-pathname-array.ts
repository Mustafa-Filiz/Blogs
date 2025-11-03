import { usePathname } from 'next/navigation'

export const useDynamicPathname = (path: string) => {
  const p = usePathname()

  return p.split('/')
  
}