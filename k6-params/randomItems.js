import http from "k6/http";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';


export default function () {
   let res = http.get('https://test-api.k6.io/public/crocodiles/');
   const crocodileIds = res.json().map(croc => croc.id);
   console.log(crocodileIds);
   let crocodileId = randomItem(crocodileIds);

   res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

   check(res, {
    'crocodile has the correct id. ': (r) => r.json().id === crocodileId
   });
}