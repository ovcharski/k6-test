import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '10s'
}

export default () => {
    http.get('https://ovcharski.com/shop/');
    sleep(1);
}