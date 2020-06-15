import React from 'react'
import { useMyHook } from '@doreentseng/passwd'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App