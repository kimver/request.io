import * as SocketIO from "socket.io"
import * as Debug from "debug"
import { Router } from "./router"

const debug = Debug('request.io')

// export class Option {
//     newInstance?: boolean
//     port?: number
//     io?: SocketIO.Server
// }

export class Server {
    io: SocketIO.Server
    /**
     *  newInstance/port/io
     */
    constructor(opts: any) {
        if (opts.newInstance) {
            this.io = SocketIO()
            this.io.listen(opts.port || 3000)
        } else {
            this.io = opts.io
        }

        if (!this.io) {
            throw new Error("no io instance found!")
        }
    }

    use(routers: Router) {
        debug('routes:', routers)
        this.io.on("connection", (client: SocketIO.Socket) => {
            debug('one user connection.')
            for (let router in routers) {
                client.on(router, (ctx: any) => {
                    ctx.send = (res: any) => {
                        let params = { id: ctx.id, msg: res }
                        debug('params:', params)
                        client.emit(router, params)
                    }

                    routers[router](ctx)
                })
            }
        })
    }
}