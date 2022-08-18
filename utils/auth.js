'use strict';

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

// 22.08.16 by Steve / To-do: passport jwt & passport kakao 적용
const auth = async(req, res, next) => {
    const accessToken = req.header("accessToken");

    if(accessToken === null || accessToken === undefined) {
        res.status(403).json({
            status: false,
            message: "권한 오류"
        });
    }
    if(accessToken !== null || accessToken !== undefined) {
        try {
            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, jwtConfig, (err, decode) => {
                    if(err) {
                        reject(err);
                    }
                    if(!err) {
                        resolve(decode);
                    }
                });
            });

            next();
        } catch(err) {
            res.status(403).json({
                status: false,
                message: "권한 오류"
            });
        }
    }
}

module.exports = auth;