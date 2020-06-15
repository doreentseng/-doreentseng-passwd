import React, { useEffect, useState } from 'react'
import { generate, validate } from '@doreentseng/passwd'

const App = () => {
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let updated = validate(passwd);
    if (!updated) updated = 'OK';
    setError(updated);
  }, [passwd])

  const onClickGenerate = () => {
    setPasswd(generate);
  }

  const handleChange = e => {
    const value = e.target.value;
    setPasswd(value);
  }

  return (
    <div>
      <input value={passwd} onChange={handleChange} />
      <br />
      <b>{error}</b>
      <button onClick={onClickGenerate}>Generate</button>
    </div>
  )
}
export default App