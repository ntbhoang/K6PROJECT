import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const k6Url = 'https://test-api.k6.io';
    const body = JSON.stringify({
        username: "Max_12355423",
        password: "123456"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const res = http.post(`${k6Url}/auth/token/login/`, body, params);
    

    check(res, {
        'status is 200': (res) => res.status === 200,
        'Access token ': (res) => res.body.includes('eyJhbGciOiJIU'),
    });

}

// k6 run -http-debug="full" 