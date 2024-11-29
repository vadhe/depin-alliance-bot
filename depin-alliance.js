import axios from 'axios';
const url = 'https://api.depinalliance.xyz/users/';
import { readFile } from 'fs/promises';

const login = async () => {
    const init = await readFile('initData.txt', 'utf8')
    try {
        console.log(init)
        const res = await axios.post(`${url}auth`, {
            "initData": ""
        })
        return res.data.data.accessToken
    } catch {
        console.log("failed to login")
    }
}
const claim = async () => {
    const token = await login()
    let headers = {
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36 Telegram-Android/11.3.3 (Realme RMX3235; Android 11; SDK 30; AVERAGE)'
    };
    try {
        const res = await axios.get(`${url}claim`, { headers })
        console.log(res.data.data)
    } catch {
        console.log("failed to claim")
    }
}
(async () => {
    const main = async () => {
        while (true) {
            claim()     
            await new Promise(resolve => setTimeout(resolve, 32400000));
        }
    }
    main()
})();
