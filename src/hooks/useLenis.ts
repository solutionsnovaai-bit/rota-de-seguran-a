import type Lenis from 'lenis'
import { createContext, useContext } from 'react'

export const LenisContext = createContext<Lenis | null>(null)

/** Instância do scroll suave (nula quando o usuário prefere menos movimento). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}
