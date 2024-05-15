import http from 'k6/http';
import { check } from 'k6';

export default function () {

    credentials =  {
        username: "test_" + Date.now(),
        password: "secret_" + Date.now()
    }
    
    const res = http.post('https://test-api.k6.io/user/register/', 
                        JSON.stringify(credentials), 
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

    check(res, {
        'status is 201': (res) => res.status === 201,
        'Name is Max_12355423': (res) => res.json().username === 'Max_12355423',
    });

}

// k6 run -http-debug="full" 