/**
 * Acesso protegido ao sessionStorage — em janela anônima ou com dados
 * bloqueados ele pode lançar erro; nesse caso o site segue normalmente.
 */
export const safeSession = {
  get(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value)
    } catch {
      /* armazenamento indisponível */
    }
  },
}
