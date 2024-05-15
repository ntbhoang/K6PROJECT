import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<6000'], // In case we have an unavailable page 503, the avg duration is a problem
        'http_req_duration{expected_response:true}': ['p(95)<6000'], 
        'group_duration{group:::Main page}': ['p(95)<9000'], // set thresholds metrics for group and sub-group
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });

        // sub-group
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=1000ms');
        });
        
    });

    
    group('News page', function () {
        http.get('https://run.mocky.io/v3/407f15e8-ff69-427a-becb-c554760357ba');
    });
    
    sleep(1);
}