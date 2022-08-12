'use strict';

const { mySql } = require('../../utils/sql');

// utils
const encryption = require('../../utils/encryption');
const regExp = require('../../utils/regexp');

// controller
const user = {
    // 22.08.08 by Steve
    signUp: (req, res) => {
        const body = req.body;
        const { email, password, name } = body;
        // 22.08.12 by Steve / To-do: 암호화 적용    
        const params = [email, password, name];

        if(!email.trim() || !password.trim() || !name.trim()) {
            res.status(400).json({
                sucess: false,
                message: "필수 항목이 모두 입력되지 않았습니다. 다시 한번 확인해주세요.",
            })
        }
        if(email.trim() && password.trim() && name.trim()) {
            // 22.08.12 by Steve / To-do: 정규식 적용
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
    },

    signIn: (req, res) => {
        const body = req.body;
        const { email, password } = body;
        // 패스워드 암호화
        const params = [email, password];

        if(!email.trim() || !password.trim()) {
            res.status(417).json({
                sucess: false,
                message: "필수 항목이 모두 입력되지 않았습니다. 다시 한번 확인해주세요.",
            })
        }
        if(email.trim() && password.trim()) { 
            // To-do: 정규식 적용
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
                        if(params[0] === result[0].email && params[1] !== result[0].password) {
                            res.status(403).json({
                                sucess: false,
                                message: "잘못된 패스워드입니다.",
                            });
                        }
                        if(params[0] === result[0].email && params[1] === result[0].password) {
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

module.exports = { user };