import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    stages: [
        {
            duration: '2h',
            target: 10000
        },
    ],
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1');
    sleep(1);
}