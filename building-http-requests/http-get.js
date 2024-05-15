import http from 'k6/http';
import { check } from 'k6';

export default function () {
    
    const crocodiles = http.get('https://test-api.k6.io/public/crocodiles/').json();
    let crocodileId = crocodiles[0].id;
    let res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (res) => res.status === 200,
        'Crocodile is Bert': (res) => res.body.includes('Bert'),
        'Name is Bert': (res) => res.json().name === 'Bert',
    });

}

// k6 run -http-debug="full" 