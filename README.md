
# @doreentseng/react-passwd

> Random Password Generator and Validation.

[![NPM](https://img.shields.io/npm/v/@doreentseng/passwd.svg)](https://www.npmjs.com/package/@doreentseng/passwd)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

### Random Password Generator
- Fixed Length
- Maximum Length and Minimum Length
- Custom Characters

### Password Validation
- Validata Empty 
- Validate Length
- Validate Characters
- Custom Error Messages

## DEMO

Link: [https://codesandbox.io/s/random-password-generator-npm-o1253](<https://codesandbox.io/s/random-password-generator-npm-o1253> "doreentseng")

## Install

~~~ shell_session
npm install --save @doreentseng/passwd
~~~ 

## Usage

### Generation

~~~ javascript
import React, { useEffect, useState } from 'react';
import { generate } from '@doreentseng/passwd';

const Example = () => {
  const [passwd, setPasswd] = useState('');

  const onClickGenerate = () => {
    setPassword(
      generatePassword({
        uppercase: true, // default is true so this line can be removed
        lowercase: false, // the password will not contain any lowercase
        // numbers: true, // default is true so this line can be removed
        symbols: "_-@!", // custom symbols
        maxLength: 20,
        minLength: 8
      })
    );
  };

  const handleChange = e => {
    const value = e.target.value;
    setPasswd(value);
  }

  return (
    <div>
      <input value={passwd} onChange={handleChange} />
      <br />
      <button onClick={onClickGenerate}>Generate</button>
    </div>
  )
}
export default Example;
~~~

### Validation

~~~ javascript
validation({ value, ...rules }); // error codes array: ["101", "103"]
~~~

~~~ javascript
import React, { useEffect, useState } from 'react';
import { generate } from "./password";

const Example {
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const maxLength = 20;
  const minLength = 8;

  const rules = useMemo(
    () => ({
      uppercase: true, // default is true so this line can be removed
      lowercase: true, // the password will not contain any lowercase
      // numbers: true, // default is true so this line can be removed
      symbols: "_-@!", // custom symbols
      maxLength,
      minLength
    }),
    []
  );

  /** 
   * validation returns error codes, you can edit your error messages
   * e.g. ['101', '103']
   */
  const handleError = (codes) => {
    let errors = [];
    for (let i = 0; i < codes.length; i++) {
      switch (codes[i]) {
        case "101":
          errors.push("Required");
          break;
        case "102":
          if (minLength === maxLength) {
            errors.push(`Must be ${minLength} characters.`);
          } else {
            errors.push(`Must be between ${minLength}~${maxLength} characters.`);
          }
          break;
        case "103":
          errors.push("At least one uppercase.");
          break;
        case "104":
          errors.push("At least one lowercase.");
          break;
        case "105":
          errors.push("At least one number.");
          break;
        case "106":
          errors.push("At least one symbol.");
          break;
        case "107":
          errors.push("No other characters are allowed.");
          break;
        default:
          break;
      }
    }
    return errors;
  };

  useEffect(() => {
    const errorCodes = validate({
      value: password,
      ...rules
    });
    const errorList = handleError(errorCodes);
    setError(errorList);
  }, [password, rules]);

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <div id="main">
      <h3>Random password generator</h3>
      <ol>
        <li>Must be between 8~20 characters.</li>
        <li>At least one upper-case, one lower-case and one number.</li>
        <li>
          At least one of these special characters: - or _. No other special
          characters are allowed.
        </li>
      </ol>
      <div id="container-passwd">
        <input value={password} onChange={handleChange} />
      </div>
      <p style={{ textAlign: "center" }}>Password length: {password.length}</p>

      {!!error && error.length > 0 ? (
        <ul>
          {error.map((item, i) => (
            <li key={i} style={{ color: "red" }}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "green" }}>OK</p>
      )}
    </div>
  );
}
~~~

## Props

***Notice!** If you use `generate()` and `validate()` on the same password, you should make sure their props are the same.

### Generator Props

***Notice!** If `maxLength` is the same with `minLength`, the password will get a fixed length.

| Name      | Required | Default Value | Type           | Description |
|-----------|:--------:|:-------------:|:--------------:|-------------|
| uppercase |          | true          | Boolean/String | By default `true`, the password will contain uppercase `ABCDEFGHJKLMNPQRZTUVWXYZ` (without I, O). If set `false`, the password will not contain any uppercase character. You can customize it like `{uppercase: "ABC"}` |
| lowercase |          | true          | Boolean/String | By default `true`, the password will contain lowercase `abcdefghijkmnopqrstuvwxyz` (without l). If set `false`, the password will not contain any lowercase character. You can customize it like `{lowercase: "abc"}` |
| numbers   |          | true          | Boolean/String | By default `true`, the password will contain numbers `123456789` (without 0). If set `false`, the password will not contain any number. You can customize it like `{numbers: "012"}` |
| symbols   |          | true          | Boolean/String | By default `true`, the password will contain symbols `-_`. If set `false`, the password will not contain any symbol. You can customize it like `{symbols: "-_@!"}` |
| maxLength | √        |               | Integer        | The maximum length of the password. At least `4`.
| minLength | √        |               | Integer        | The maximum length of the password. At least `4`.

### Validation Props

***Notice!** Props `uppercase`, `lowercase`, `numbers` and `symbols` are totally the same as in **Generator Props**.

| Name      | Required | Default Value | Type           | Description                      |
|-----------|:--------:|:-------------:|:--------------:|----------------------------------|
| value     |   √      |               | String         | Password value.                  |
| uppercase |          | true          | Boolean/String | The same as **Generator Props**. |
| lowercase |          | true          | Boolean/String | The same as **Generator Props**. |
| numbers   |          | true          | Boolean/String | The same as **Generator Props**. |
| symbols   |          | true          | Boolean/String | The same as **Generator Props**. |
| maxLength |   √      |               | Integer        | The same as **Generator Props**. |
| minLength |   √      |               | Integer        | The same as **Generator Props**. |

### Validation Error Codes

| Code | Description                       |
|------|-----------------------------------|
| 101  | The password is required.         |
| 102  | Length does not match.            |
| 103  | Uppercase does not match.         |
| 104  | Lowercase does not match.         |
| 105  | Numbers does not match.           |
| 106  | Symbols does not match.           |
| 107  | Other characters are not allowed. |

## License

MIT © [](https://github.com/)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
