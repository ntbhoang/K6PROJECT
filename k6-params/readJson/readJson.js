import http from "k6/http";
import { check } from "k6";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from "k6/data";


const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

console.log(userCredentials);

export default function () {
    let randomCredential = randomItem(userCredentials);
    let credentials;
    userCredentials.forEach((item) => {
        credentials = {
            username: randomCredential.username,
            password: randomCredential.password,
        };
    });

    let res = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log(res.status);

    check(res, {
        'status is 201': (r) => r.status === 201
    });

    /* res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });
    
    const accessToken = res.json().access; 
    */
}