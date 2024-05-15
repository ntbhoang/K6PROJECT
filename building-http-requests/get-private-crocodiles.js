import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const k6URL = 'https://test-api.k6.io';

    const body = JSON.stringify({
        username: "Max_12355423",
        password: "123456"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const res = http.post(`${k6URL}/auth/token/login/`, body, params);
    const accessToken = res.json().access;

    let getResults = http.get(`${k6URL}/my/crocodiles/`,
    {
        headers: {
            Authorization: 'Bearer ' + accessToken  

        }
    });
    check(getResults, {
        'Status is 200': (res) => res.status === 200,
        'An empty list': (res) => res.json().length === 0
    })
}

// k6 run -http-debug="full" 