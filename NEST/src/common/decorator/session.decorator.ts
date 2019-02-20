import { createParamDecorator } from '@nestjs/common'

export const SessionDecorator = createParamDecorator((data, req) => {
    return req.session[data]
})
export const SesD = SessionDecorator
