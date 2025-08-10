// TestSimpleButton.tsx - Componente de prueba simple sin estilos vanilla-extract
import React from 'react'

interface TestButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function TestSimpleButton({ children, onClick, variant = 'primary' }: TestButtonProps) {
  const styles: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: variant === 'primary' ? '#3B82F6' : '#6B7280',
    color: 'white',
    transition: 'all 0.2s ease',
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = variant === 'primary' ? '#2563EB' : '#4B5563'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = variant === 'primary' ? '#3B82F6' : '#6B7280'
  }

  return (
    <button 
      style={styles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
