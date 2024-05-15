import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    // Soak test is to stress the steady stage to find out whether the application still perform good 
    // after a long period of time.
    stages: [
        {
            duration: '5m',
            target: 1000
        },
        {
            duration: '24h',
            target: 10000
        },
        {
            duration: '5m',
            target: 0
        },
    ],

};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
    sleep(1)
    http.get('https://test-api.k6.io/public/crocodiless/');
    sleep(2);
}