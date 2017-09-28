export class Router {
    use(router: string, Fun: Function) {
        this[router] = Fun
    }
}

