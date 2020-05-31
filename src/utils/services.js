import axios from 'axios';
import {
    CHECK_TOKEN
} from '../config/api';
export function checkToken(token) {
    if (!token) {
        return Promise.reject({
            code: 401,
            data: null,
            errors: {
                token: 'missing token',
            },
            message: 'missing token'
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    user: {
                        email: 'aniketjha898@gmail.com',
                        username: 'aniketjha898',
                        userId: 'quoquoi1310989011',
                        isAuthenticated: false, 
                    }, 
                },
                code: 200,
                message: 'dashboard'
            });
        }, 100);
    });
    // const urlCheckToken = 'http://localhost:1234' ||  CHECK_TOKEN + '?token=' + token;
    // return axios
    // .get(urlCheckToken);
};