'use strict';

// 22.08.12 by Steve / To-do: 정규 표현식은 client의 정규식과 확인 필요
const regExp = {
    isEmail: (asValue) => {
        const re = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;;
        return re.test(asValue);
    },
    isPassword: (asValue) => {
        const re = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        return re.test(asValue);
    },
};

module.exports = regExp;