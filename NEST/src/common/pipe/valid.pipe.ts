import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
    ValidationPipe
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ToolongException } from 'common/exception/toolong.exception'
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'

export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean
    disableErrorMessages?: boolean
}

@Injectable()
export class ValidPipe extends ValidationPipe {
    constructor(options?: ValidationPipeOptions) {
        options.skipMissingProperties =
            typeof options.skipMissingProperties === 'undefined'
                ? true
                : options.skipMissingProperties
        super(options)
    }
    async transform(value, metadata: ArgumentMetadata) {
        const { metatype } = metadata
        if (!metatype || !this.toValid(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object, this.validatorOptions)
        if (errors && errors.length > 0) {
            throw new BadRequestException(JSON.stringify(errors[0].constraints))
        }
        let toolong_val
        for (const key in value) {
            if (value[key] && value[key].length && value[key].length > 255) {
                toolong_val = { key, value: value[key] }
                break
            }
        }
        if (toolong_val) {
            throw new ToolongException(toolong_val)
        }
        return value
    }

    private toValid(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.find(type => metatype === type)
    }
}
