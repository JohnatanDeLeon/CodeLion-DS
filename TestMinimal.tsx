// TestMinimal.tsx - Prueba absolutamente mínima
import React from 'react'

// SOLO importar tipos, NO el componente completo
import type { ButtonProps } from '@johnatandeleon/design-system'

const TestMinimal: React.FC = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', color: 'black' }}>
      <h2 style={{ color: 'red', fontSize: '24px' }}>🧪 Test Minimal</h2>
      <p style={{ color: 'blue' }}>¿Puedes ver este texto?</p>
      
      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'green', 
          color: 'white', 
          border: 'none',
          borderRadius: '4px'
        }}
        onClick={() => alert('Funciona!')}
      >
        Test Button Local
      </button>
    </div>
  )
}

export default TestMinimal
