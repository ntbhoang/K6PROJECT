import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_errors: ['count==0'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
    }
    
};

let http_errors = new Counter('http_errors');


export default function () {
    let res = http.get('https://run.mocky.io/v3/2d26549a-e927-4dd1-8f2e-dcc90a728d86');
    if (res.error) {
        http_errors.add(1);
    }

    check(res, {
        'status is 200': (res) => res.status === 200
    });
    
    http.get('https://run.mocky.io/v3/edfb84df-84c9-46b2-9989-c9792478ed2c?mocky-delay=2000ms');
}