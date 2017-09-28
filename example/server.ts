import { Server } from "../lib/server"
import { Router } from "../lib/router"

const router = new Router()

router.use('login', ctx => {
    console.log('ctx params: ', ctx)
    ctx.send({ test: "test" })
})

const server = new Server({ newInstance: true })

server.use(router)