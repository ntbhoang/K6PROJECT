import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const k6URL = 'https://test-api.k6.io';

    const body = JSON.stringify({
        username: "Max_12355423",
        password: "123456"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const crocodile = {
        name: "random croc_" + Date.now(),
        sex: "M",
        date_of_birth: "2024-01-01"
    }
    
    let res = http.post(`${k6URL}/auth/token/login/`, body, params);
    const accessToken = res.json().access;

    let postRes = http.post(`${k6URL}/my/crocodiles/`,
    crocodile,
    {
        headers: {
            Authorization: 'Bearer ' + accessToken  

        }
    });

    check(postRes, {
        'Status is 201': (res) => res.status === 201,
    });

    // Croc id
    const newCrocId = postRes.json().id;

    // Get created crocodile
    let privateRes =  http.get(`${k6URL}/my/crocodiles/${newCrocId}/`,
    {
        headers: {
            Authorization: 'Bearer ' + accessToken  

        }
    });

    check(privateRes, {
        'status is 200': (res) => res.status === 200,
        'Croc id': (res) => res.json().id === newCrocId
    })

    // Update croc information

    let putRes = http.put(`${k6URL}/my/crocodiles/${newCrocId}/`
                                            
                                                    ,
                                                    JSON.stringify({
                                                        name: "random croc_" + Date.now(),
                                                        sex: "F",
                                                        date_of_birth: "2024-01-02"
                                                    }),
                                                    {
                                                        headers: {
                                                            Authorization: 'Bearer ' + accessToken ,
                                                            "Content-Type": "application/json"
                                            
                                                        }
                                                    });

    check(putRes, {
        "status code is 200": (r) => r.status === 200
    });

    // PATCH - partially 

    let patchRes = http.patch(`${k6URL}/my/crocodiles/${newCrocId}/`,
                                                    JSON.stringify({
                                                        sex: "M",
                                                    }),
                                                    {
                                                        headers: {
                                                            Authorization: 'Bearer ' + accessToken ,
                                                            "Content-Type": "application/json"
                                            
                                                        }
                                                    });

    check(patchRes, {
        "Sex is M": (r) => r.json().sex === "M"
    });

    
}

// k6 run --http-debug="full" 