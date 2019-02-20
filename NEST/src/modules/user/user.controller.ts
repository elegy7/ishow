import {
    Get,
    Controller,
    Post,
    UseGuards,
    ReflectMetadata,
    Body,
    UsePipes,
    Query,
    UploadedFiles,
    FilesInterceptor,
    UseInterceptors,
    Session,
    Res
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { RolesGuard } from 'common/guard/roles.guard'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { User } from 'modules/user/user.entity'

@Controller('/api/user')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['PubModule'])
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/login')
    async login(@Res() res, @Body() userDto: User, @Session() session) {
        const query = {
            password: userDto.password
        }
        if (userDto.loginame.indexOf('@') === -1) {
            query['username'] = userDto.loginame
        } else {
            query['email'] = userDto.loginame
        }
        const result = await this.userService.getUser(new User(query))
        if (result) {
            session.showId = userDto.showId || session.showId
            session.user = result
            session.roles = [
                'CoreModule',
                'ShowModule',
                'ItemModule',
                'ImageModule',
                'PageModule',
                'PubModule'
            ]
            res.sent(result, 1, '登录成功')
        } else {
            res.sent(result, 0, '登录失败，请检查用户名或密码')
        }
    }

    @Post('/logout')
    async logout(@Res() res, @Session() session) {
        session.user = undefined
        session.roles = undefined
        res.sent(null)
    }

    @Post('/register')
    @UsePipes(new ValidPipe({ groups: ['register'] }))
    async register(@Res() res, @Body() userDto: User) {
        const result = await this.userService.register(userDto)
        if (result) {
            res.sent(result)
        } else {
            res.sent(result, 0, '注册失败')
        }
    }

    @Post('/registerByEmail')
    @UsePipes(new ValidPipe({ groups: ['registerByEmail'] }))
    async registerByEmail(@Res() res, @Body() userDto: User) {
        const result = await this.userService.register(userDto)
        if (result) {
            res.sent(result)
        } else {
            res.sent(result, 0, '注册失败')
        }
    }

    @Get('/checkname')
    @UsePipes(new ValidPipe({ groups: ['checkname'] }))
    async checkname(@Res() res, @Query() userDto: User) {
        const result = await this.userService.getUser(userDto)
        if (result) {
            res.sent(userDto.username, 0, '用户名已存在')
        } else {
            res.sent(userDto.username)
        }
    }

    @Get('/checkemail')
    @UsePipes(new ValidPipe({ groups: ['checkemail'] }))
    async checkemail(@Res() res, @Query() userDto: User) {
        const result = await this.userService.getUser(userDto)
        if (result) {
            res.sent(userDto.username, 0, '邮箱已存在')
        } else {
            res.sent(userDto.username)
        }
    }

    @Post('/uploadAvatar')
    @UseInterceptors(FilesInterceptor('files'))
    uploadAvatar(@Res() res, @UploadedFiles() files) {
        res.sent('???')
    }
}
