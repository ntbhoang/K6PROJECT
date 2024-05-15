import exec from 'k6/execution';
import http from "k6/http";



export function setup() {
    let res = http.get('https://test.k6.local/status');
    if (res.error) 
        exec.test.abort('Aborting test. Application is down!!!')
}

export default function () {
    http.get('https://test.k6.local/some-page');
    sleep(1);
}