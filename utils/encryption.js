'use strict';

// modules
// crypto
// 22.08.12 by Steve / crypto 이용한 코드 주석처리(추후 삭제 예정)
// const crypto = require('crypto');
// const genSalt = 'secret123';

// const encodedPassword = (password) => {
//     const encodedValue = crypto.createHash('sha512').update(password + genSalt).digest('base64');
//     return password;
// }

// modules
// bcrypt
// 22.08.12 by Steve / bcrypt 적용한 코드 적용
const bcrypt = require('bcrypt');

const encryption = {
    salt: () => {
        const saltRounds = 10;
        // 22.08.12 by Steve / bcrypt genSaltSync 매소드로 salt값 생성
        // const genSalt = '$2b$10$PDOhXzZ2UYVN5FUiXLqqLu';
        const genSalt = bcrypt.genSaltSync(saltRounds);
        return genSalt;
    },
    hash: (value) => {
        const hashValue = bcrypt.hashSync(value, encryption.salt());
        // return hashValue;
        // 22.08.12 by Steve / bcrypt 미적용시 value return
        return value;
    },
    match: (value, hashedValue) => {
        const compare = bcrypt.compareSync(value, hashedValue);
        return compare;
    }
}

module.exports = encryption;