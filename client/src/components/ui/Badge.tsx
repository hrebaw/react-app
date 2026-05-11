type Status = 'To Buy' | 'Not Started' | 'Reading' | 'Finished'

const config: Record<Status, { label: string; bg: string; color: string }> = {
  'To Buy':      { label: 'To buy',      bg: 'var(--color-amber-light)', color: '#854F0B' },
  'Not Started': { label: 'Not started', bg: 'var(--color-parchment)',   color: 'var(--color-muted)' },
  'Reading':     { label: 'Reading',     bg: 'var(--color-teal-light)',  color: '#0F6E56' },
  'Finished':    { label: 'Finished',    bg: '#F1EFE8',                  color: 'var(--color-muted)' },
}

type Props = {
  status: Status
}

export function Badge({ status }: Props) {
  const { label, bg, color } = config[status] ?? {
    label: status,
    bg: 'var(--color-parchment)',
    color: 'var(--color-muted)',
  }

  return (
    <span style={{
      background: bg,
      color,
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: 'var(--radius-sm)',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}