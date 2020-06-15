const chars1 = "abcdefghijkmnopqrstuvwxyz"; // without l
const chars2 = "ABCDEFGHJKLMNPQRZTUVWXYZ"; // without I, O
const chars3 = "123456789"; // without 0
const chars4 = "~!@#$%^&*()-_+";
const chars = [chars1, chars2, chars3, chars4];

export const generate = () => {
    let passwd = '';
    let string = '';
    
    for (let i = 0; i < 4; i++) {
        // Add at least 1 character from lowerCharacters, upperCharacters, numbers and symbols
        string += chars[i].charAt(Math.floor(Math.random() * chars[i].length))
    }

    // Add more random 4~11 characters 
    const more = Math.floor(Math.random() * 8) + 4;

    for (let i = 0; i < more; i++) {
        const charsIndex = Math.floor(Math.random() * 4);
        string += chars[charsIndex].charAt(Math.floor(Math.random() * chars[charsIndex].length))
    }

    // Rearrange the characters in random order
    string = string.split('');
    while (string.length > 0) {
        passwd += string.splice(string.length * Math.random() << 0, 1);
    }

    // Add 1 [a-zA-Z] as the first character if the first one is not [a-zA-Z]
    if (/^[A-Za-z]/.test(passwd) === false) {
        const index = Math.floor(Math.random() * 2)
        passwd = chars[index].charAt(Math.floor(Math.random() * chars[index].length)) + passwd
    }
    console.log(passwd);
    return passwd;
}