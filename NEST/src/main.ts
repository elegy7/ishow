import { AnyExceptionFilter } from 'common/filter/any-exception.filter'
import { NestFactory } from '@nestjs/core'
import { MainModule } from 'main.module'
import { RespMiddleware } from 'common/middleware/resp.middleware'
import { join } from 'path'
import { ValidPipe } from 'common/pipe/valid.pipe'
import * as ExpressSession from 'express-session'

async function bootstrap() {
    const app = await NestFactory.create(MainModule)
    app.use(RespMiddleware)
    app.use(ExpressSession({ secret: 'meiyoumima' }))
    app.useGlobalFilters(new AnyExceptionFilter())
    app.useGlobalPipes(new ValidPipe({ skipMissingProperties: true, groups: ['nogroup'] }))

    app.useStaticAssets(join(__dirname, '../../WEB/dist'), {
        prefix: '/'
    })
    app.useStaticAssets(join(__dirname, '../../APP/dist'), {
        prefix: '/app'
    })
    app.useStaticAssets(join(__dirname, '../public'), {
        prefix: '/public'
    })
    console.log('NEST START WITH PORT 3000')
    await app.listen(3000)
}
bootstrap()
/* interface obj {
    name: string
    id: number
}
class Man implements obj {
    id = 142857
    name = '123'
    age = '22'
    constructor(name?, id?) {
        this.id = this.id || id
        this.name = this.name || name
    }
}
function name(params: obj) {
    console.log(params)
}
name({ name: '11', id: 22 })
const man = new Man()
console.log(man, man.id, man.name, man.age, Man.name)

interface eg {
    length: number
}
class Test implements eg {
    parameters: any
    length = 233
    constructor(parameters) {
        this.parameters = parameters
    }
}
const test = new Test(1)
console.log('test', test)
function getLength<T extends eg>(arg: T): number {
    return arg.length
}
function copyFields<T extends U, U>(target: T, source: U): T {
    for (const key in source) {
        target[key] = (source as T)[key]
    }
    return target
}

const x = { a: 1, b: 2, c: 3, d: 4 }
console.log(copyFields(x, { b: 10, d: 20 }))
console.log(getLength('33'))

let cat: [string, number, number]
cat = ['11', 11, 111]
cat.push('abc')
console.log(cat)

const Days = new function Days() {}()
Days[(Days.Sun = 0)] = 'Sun'
console.log(Days)

function testArr(...arg1) {
    console.log([...new Set([...arguments])], arguments)
}
testArr(1, 2, 3, 3, 2, 4, 1)

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: boolean): boolean
function reverse(x: number | string | boolean): number | string | boolean {
    return x
}

console.log(typeof reverse(true))

function toBoolean(something: string | number): any {
    return (something as string).length
}
console.log(typeof toBoolean('123')) */
