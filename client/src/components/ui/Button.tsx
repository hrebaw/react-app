import { CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  variant?: Variant
  onClick?: () => void
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

const base: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.06em',
  padding: '8px 18px',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.15s',
}

const variants: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--color-ink)',
    color: 'var(--color-parchment)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-ink)',
    border: 'var(--border-subtle)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-muted)',
    padding: '8px 4px',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
}

export function Button({ variant = 'secondary', onClick, children, type = 'button', disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], opacity: disabled ? 0.4 : 1 }}
    >
      {children}
    </button>
  )
}