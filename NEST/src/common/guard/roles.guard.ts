import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getClass())
        if (!roles) return true
        const http = context.switchToHttp()
        const request = http.getRequest()
        const response = http.getResponse()
        if (!request.session.user && !roles.includes('PubModule')) {
            response.send({
                status: 'SESSION_TIMEOUT',
                summary: '会话超时，请重新登录'
            })
            return
        }
        const userRoles = request.session.roles || ['PubModule']
        const hasRole = () => userRoles.some(item => roles.includes(item))
        return userRoles && hasRole()
    }
}
