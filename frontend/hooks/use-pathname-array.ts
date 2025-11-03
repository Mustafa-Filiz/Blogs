import { usePathname } from 'next/navigation'

export const usePathnameArray = () => {
  const p = usePathname()

  return p.split('/').slice(1)

}