import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import * as dateFormat from 'dateformat'
import { BusinessException } from 'common/exception/business.exception'

@Catch(HttpException, BusinessException)
export class AnyExceptionFilter implements ExceptionFilter {
    catch(execption: HttpException | BusinessException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        // 守卫在判断未登录时会直接调用 response.send()作出相应, 此处做判断避免报错
        if (response.headersSent) return
        // 业务异常 直接用约定的json格式返回
        if (execption instanceof BusinessException) {
            response.status(200).send({
                result: null,
                summary: execption.getResponse(),
                status: execption.getStatus()
            })
            return
        }
        response.status(execption.getStatus()).send({
            timestamp: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            path: request.url || request.req.url,
            error: execption.message.error,
            message: execption.message.message,
            statusCode: execption.message.statusCode
        })
    }
}
