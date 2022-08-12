'use strict';

const { mySql } = require('../../utils/sql');

// utils
const encryption = require('../../utils/encryption');
const regExp = require('../../utils/regexp');

// controller
const user = {
    // 22.08.08 by Steve / signUp API 기능 구현
    signUp: (req, res) => {
        const body = req.body;
        const { email, password, name } = body;
        // 22.08.12 by Steve / signUp - password 암호화 적용    
        const params = [email, encryption.hash(password), name];

        if(!email.trim() || !password.trim() || !name.trim()) {
            res.status(400).json({
                sucess: false,
                message: "필수 항목이 모두 입력되지 않았습니다. 다시 한번 확인해주세요.",
            })
        }
        if(email.trim() && password.trim() && name.trim()) {
            // 22.08.12 by Steve / signUp - email 정규 표현식 적용
            if(!regExp.isEmail(email)) {
                res.status(400).json({
                    sucess: false,
                    message: "이메일 형식이 맞지 않습니다. 다시 한번 확인해주세요.",
                })      
            }
            if(regExp.isEmail(email)) {
                // 22.08.12 by Steve / signUp - password 정규 표현식 적용
                if(!regExp.isPassword(password)) {
                    res.status(400).json({
                        sucess: false,
                        message: "패스워드 형식이 맞지 않습니다. 다시 한번 확인해주세요.",
                    })
                }
                if(regExp.isPassword(password)) {
                    mySql.lookUp('users', params[0], 'email', '*')
                    .then((result) => {
                        if(result.length !== 0) {
                            console.log("result: ", result);
                            res.status(200).json({
                                sucess: false,
                                message: "중복된 이메일 입니다.",
                            });
                        }
                        if(result.length === 0) {
                            mySql.insertUser(...params)
                            .then((data) => {
                                console.log("result: ", data);
                                mySql.lookUp('users', params[0], 'email', '*')
                                .then((result) => {
                                    console.log("result: ", result);
                                    res.status(200).json({
                                        sucess: true,
                                        message: "회원가입이 완료되었습니다",
                                        result: result[0],
                                    });
                                }).catch((err) => {
                                    console.error("result: ", err);
                                    res.status(500).json({
                                        sucess: false,
                                        message: "서버 에러 입니다.",
                                    })
                                })
                            }).catch((err) => {
                                console.error("result: ", err);
                                res.status(500).json({
                                    sucess: false,
                                    message: "서버 에러 입니다.",
                                })
                            })
                        }
                    }).catch((err) => {
                        console.error("result: ", err);
                        res.status(500).json({
                            sucess: false,
                            message: "서버 에러 입니다.",
                        });
                    })
                }      
            }
        }
    },

    // 22.08.08 by Steve / signIn API 기능 구현
    signIn: (req, res) => {
        const body = req.body;
        const { email, password } = body;
        // 22.08.12 by Steve / signIn - password 암호화 적용
        const params = [email, encryption.hash(password)];

        if(!email.trim() || !password.trim()) {
            res.status(417).json({
                sucess: false,
                message: "필수 항목이 모두 입력되지 않았습니다. 다시 한번 확인해주세요.",
            })
        }
        if(email.trim() && password.trim()) { 
            // 22.08.12 by Steve / signIn - email 정규 표현식 적용
            if(!regExp.isEmail(email)) {
                res.status(400).json({
                    sucess: false,
                    message: "이메일 형식이 맞지 않습니다. 다시 한번 확인해주세요.",
                })      
            }
            if(regExp.isEmail(email)) {
                mySql.lookUp('users', params[0], 'email', '*')
                .then((result) => {
                    if(result.length === 0) {
                        console.log("result: ", result);
                        res.status(404).json({
                            sucess: false,
                            message: "회원정보를을 찾을 수 없습니다.",
                        });
                    }
                    if(result.length !== 0) {
                        mySql.lookUp('users', params[0], 'email', '*')
                        .then((result) => {
                            // 22.08.12 by Steve / 기존의 password 확인 코드 주석처리(추후 삭제 예정)
                            // if(params[0] === result[0].email && params[1] !== result[0].password) {
                            if(params[0] === result[0].email && !encryption.match(password, result[0].password)) {
                                res.status(403).json({
                                    sucess: false,
                                    message: "잘못된 패스워드입니다.",
                                });
                            }
                            // 22.08.12 by Steve / 기존의 password 확인 코드 주석처리(추후 삭제 예정)
                            // if(params[0] === result[0].email && params[1] === result[0].password) {
                            if(params[0] === result[0].email && encryption.match(password, result[0].password)) {
                                res.status(200).json({
                                    sucess: true,
                                    message: "로그인에 성공하였습니다.",
                                    accessToken: 'accessToken',
                                    result: result[0],
                                }); 
                            }
                        }).catch((err) => {
                            console.error("result: ", err);
                            res.status(500).json({
                                sucess: false,
                                message: "서버 에러 입니다.",
                            })
                        })
                    }
                }).catch((err) => {
                    console.error("result: ", err);
                    res.status(500).json({
                        sucess: false,
                        message: "서버 에러 입니다.",
                    });
                }) 
            }
        }
    }
}

module.exports = { user };