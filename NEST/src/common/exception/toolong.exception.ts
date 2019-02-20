import { HttpException, HttpStatus } from '@nestjs/common'
export class ToolongException extends HttpException {
    constructor(err_value: any) {
        super(
            {
                error: `Value too long, limit 255 but get ${
                    err_value.value.length
                }`,
                statusCode: HttpStatus.BAD_REQUEST,
                err_value
            },
            HttpStatus.BAD_REQUEST
        )
    }
}
