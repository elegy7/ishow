import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CoreService } from 'modules/core/core.service'

@Injectable()
export class ShowGuard implements CanActivate {
    constructor(private readonly coreService: CoreService, private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp()
        const request = http.getRequest()
        const response = http.getResponse()
        const isSelfShow = await this.coreService.checkAuth(
            request.session.showId,
            request.session.user
        )
        return isSelfShow
    }
}
