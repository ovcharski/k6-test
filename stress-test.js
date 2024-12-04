import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 100 },   // Ramp up
        { duration: '5m', target: 500 },   // Sudden high load
        { duration: '3m', target: 1000 },  // Extreme stress
        { duration: '2m', target: 0 }      // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],  // 95% requests under 1 second
        http_req_failed: ['rate<0.05']      // Max 5% failure rate
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
            'User-Agent': 'K6 Stress Test',
            'Accept': 'application/json'
        }
    };

    const res = http.get(`${baseUrl}${randomEndpoint}`, params);
    
    if (res.status !== 200) {
        console.error(`Stress test: Request failed with status ${res.status}`);
    }

    sleep(Math.random() * 2);
}