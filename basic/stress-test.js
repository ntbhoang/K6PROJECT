import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    // Only run stress test after successfully completion of a load test
    // The aim of stress is to test the application under/above the average conditions
    stages: [
        {
            duration: '10s',
            target: 1000
        },
        {
            duration: '30s',
            target: 1000
        },
        {
            duration: '10s',
            target: 0
        },
    ],
    // vus: 100,
    //duration: '30m'

};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
    sleep(1)
    http.get('https://test-api.k6.io/public/crocodiless/');
    sleep(2);
}