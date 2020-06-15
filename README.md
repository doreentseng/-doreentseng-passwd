# @doreentseng/passwd

> Random password generator and validation.

[![NPM](https://img.shields.io/npm/v/@doreentseng/passwd.svg)](https://www.npmjs.com/package/@doreentseng/passwd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Notice
This npm is still developing. 
1. It follows the static rules so far.
2. When the password is not valid, it returns a static sentence.

I'm going to fix these two problems in the late version.

## Rules so far
A random password with the following rules:
1. 8~16 long
2. At least 1 uppercase letter, 1 lower case letter and 1 number
3. At least 1 symbol ~!@#$%^&*()-_+
4. Spaces not allowed
5. The first character cannot be a number or a symbol

## Install

```bash
npm install --save @doreentseng/passwd
```

## Usage

```jsx
import React from 'react';

import { generate, validate } from '@doreentseng/passwd';

import React, { useEffect, useState } from 'react'
import { generate, validate } from '@doreentseng/passwd'

const Example = () => {
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
export default Example
```

## License

MIT © [](https://github.com/)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
