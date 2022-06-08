function detectError({ maxLength, minLength }) {
    if (!maxLength || !minLength) {
        throw Error("maxLength and minLength are required.");
    } else if (maxLength < minLength) {
        throw Error("maxLength must not smaller than minLength.");
    } else {
        return;
    }
}

let upperPool = "ABCDEFGHJKLMNPQRZTUVWXYZ"; // without I, O
let lowerPool = "abcdefghijkmnopqrstuvwxyz"; // without l
let numberPool = "123456789"; // without 0
let symbolPool = "_-";

function generateRandomPassword({
    uppercase = true, // false or undefined means default, or you can defines yours
    lowercase = true, // false or undefined means default, or you can defines yours
    numbers = true, // false or undefined means default, or you can defines yours
    symbols = true, // false or undefined means default, or you can defines yours
    // while maxLength === minLength, the length is static
    maxLength, // required, at least 4
    minLength // required, at least 4
}) {
    detectError({ maxLength, minLength });

    let pools = [];

    // Confirm available pool
    const trimPool = (target) => {
        if (target[0] === true) {
        pools.push(target[1]);
        } else if (!!target[0]) {
        pools.push(target[0]);
        }
    };
    const allPools = [
        [uppercase, upperPool],
        [lowercase, lowerPool],
        [numbers, numberPool],
        [symbols, symbolPool]
    ];
    let n = 0;
    while (n < allPools.length) {
        trimPool(allPools[n]);
        n++;
    }
    // console.log(pools); // available pools

    let string = "";
    let passwd = "";

    for (let i = 0; i < pools.length; i++) {
        // Add at least 1 character from lowerCharacters, upperCharacters, numbers and symbols
        string += pools[i].charAt(Math.floor(Math.random() * pools[i].length));
    }

    // Add more random characters
    let more = 0;
    if (maxLength === minLength) {
        more = maxLength - string.length;
    } else {
        // minLength-pools.length <= more <= maxLength-pools.length
        const max = maxLength - pools.length;
        const min = minLength - pools.length;
        more = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // console.log(more);
    for (let i = 0; i < more; i++) {
        const poolsIndex = Math.floor(Math.random() * pools.length);
        string += pools[poolsIndex].charAt(
        Math.floor(Math.random() * pools[poolsIndex].length)
        );
    }

    // Rearrange the characters in random order
    string = string.split("");
    while (string.length > 0) {
        passwd += string.splice((string.length * Math.random()) << 0, 1);
    }

    return passwd;
}

export function validatePassword({
    value, // required
    uppercase = true, // false or undefined means default, or you can defines yours
    lowercase = true, // false or undefined means default, or you can defines yours
    numbers = true, // false or undefined means default, or you can defines yours
    symbols = true, // false or undefined means default, or you can defines yours
    // while maxLength === minLength, the length is static
    maxLength, // required, at least 4
    minLength // required, at least 4
}) {
    detectError({ maxLength, minLength });

    let errorCode = [];

    if (!value) {
        errorCode.push("101");
        return errorCode;
    } else {
        if (value.length > maxLength || value.length < minLength) {
            errorCode.push("102");
        }

        let allRegsStr = "";

        const handleError = ({ type, oldV, newV, errCode }) => {
            if (!newV) return;
            let str = newV === true ? oldV : newV;
            if (type === "symbols") {
                str = str.split("").join("\\");
            }
            allRegsStr += `(?=.*?[${str}])`;
            // at least 1 of value of the type
            const reg = new RegExp(`[${str}]`);
            if (reg.test(value) === false) {
                errorCode.push(errCode);
            }
        };

        const allPools = [
        {
            type: "uppercase",
            oldV: upperPool,
            newV: uppercase,
            errCode: "103"
        },
        {
            type: "lowercase",
            oldV: lowerPool,
            newV: lowercase,
            errCode: "104"
        },
        {
            type: "numbers",
            oldV: numberPool,
            newV: numbers,
            errCode: "105"
        },
        {
            type: "symbols",
            oldV: symbolPool,
            newV: symbols,
            errCode: "106"
        }];

        let n = 0;
        while (n < allPools.length) {
            handleError(allPools[n]);
            n++;
        }

        // console.log(allRegsStr)
        if (!!allRegsStr) {
            const reg = new RegExp(`^${allRegsStr}`);
            if (reg.test(value) === false) {
                errorCode.push("107");
            }
        }
    }

    return errorCode;
}

export const generate = generateRandomPassword;
export const validate = validatePassword;  