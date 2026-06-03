export default function LoadingSpinner({ size = 36, color = 'var(--color-primary)' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '3px solid var(--color-border)',
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }}
    />
  )
}
