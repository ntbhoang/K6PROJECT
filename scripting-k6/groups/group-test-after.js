import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<675'],
        'group_duration{group:::Main page}': ['p(95)<700'], // set thresholds metrics for group and sub-group
        'group_duration{group:::Main page::Assets}': ['p(95)<700'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        // sub-group
        group('Assets', function () {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prism.js');
        });
        
    });

    
    group('News page', function () {
        http.get('https://test.k6.io/static/news.php');
    });
    
    sleep(1);
}