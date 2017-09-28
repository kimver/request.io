import { Client } from '../lib/client'

//init client
const client = new Client({ url: "http://localhost:3000" })

setTimeout(() => {
    client.request('login', { id: 110, pwd: 'abcd' }, body => {
        console.log(body)
    })
}, 3000)