import { AnyExceptionFilter } from 'common/filter/any-exception.filter'
import { NestFactory } from '@nestjs/core'
import { MainHmrModule } from 'main.module.hmr'
import { RespMiddleware } from 'common/middleware/resp.middleware'
import { resolve } from 'path'
import { ValidPipe } from 'common/pipe/valid.pipe'
import * as favicon from 'express-favicon'
import * as ExpressSession from 'express-session'

declare const module: any
async function bootstrap() {
    const app = await NestFactory.create(MainHmrModule)

    app.use(RespMiddleware)
    app.use(ExpressSession({ secret: 'meiyoumima' }))
    app.use(favicon(resolve(process.cwd(), './public/images/logo.png')))
    app.useGlobalFilters(new AnyExceptionFilter())
    app.useGlobalPipes(new ValidPipe({ skipMissingProperties: true, groups: ['nogroup'] }))

    app.useStaticAssets(resolve(process.cwd(), './dist/dist/src/views'), {
        prefix: '/view'
    })
    app.useStaticAssets(resolve(process.cwd(), '../WEB/dist'), {
        prefix: '/web'
    })
    app.useStaticAssets(resolve(process.cwd(), '../APP/dist'), {
        prefix: '/app'
    })

    app.useStaticAssets(resolve(process.cwd(), './public'), {
        prefix: '/public'
    })

    console.log('NEST START WITH PORT 285')
    await app.listen(285)
    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
bootstrap()
