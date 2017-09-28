import * as SocketIOClient from "socket.io-client"

export class Client {
    socket: SocketIOClient.Socket
    globalReqID: number = 0
    queue: object = {}
    routers: string[] = []

    constructor(opts: any) {
        let url = opts.url
        if (!url) {
            throw new Error('No url param!')
        }
        this.socket = SocketIOClient(url)
    }

    getMsgID(): number {
        this.globalReqID++;
        return this.globalReqID;

    }

    signRouter(router: string) {
        if (this.routers.indexOf(router) > -1) return;

        this.routers.push(router)
        this.socket.on(router, (data: any) => {
            let id = data.id
            this.queue[id] && (typeof this.queue[id] === 'function') && this.queue[id](data.msg || data)
        });

    }

    request(router: string, msg: any, cb: Function) {
        if (typeof cb !== "function") {
            throw new Error('cb must be function')
        }
        let id: number = this.getMsgID();
        this.queue[id] = cb
        this.signRouter(router)
        this.socket.emit(router, { id, msg })
    }
}