import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '10m', target: 100 },   // Steady load
        { duration: '6h', target: 100 }     // Extended sustained load
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // Response time
        http_req_failed: ['rate<0.01'],    // Failure rate
        iteration_duration: ['max<500'],   // Max iteration time
        checks: ['rate>0.99']              // High success rate
    }
}

const endpoints = [
    '/shop/',
    '/shop/product-category/clothing',
    '/shop/product-category/jenkins-artwork',
    '/shop/product/hoodie-with-zipper',
    '/shop/product/jenkins-superhero'
];

export default function() {
    const baseUrl = 'https://ovcharski.com';
    const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    
    const params = {
        headers: {
            'User-Agent': 'K6 Soak Test',
            'Accept': 'application/json'
        }
    };

    const res = http.get(`${baseUrl}${randomEndpoint}`, params);
    
    if (res.status !== 200) {
        console.error(`Soak test: Request failed with status ${res.status}`);
    }

    sleep(Math.random() * 3);
}