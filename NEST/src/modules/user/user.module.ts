import { Module } from '@nestjs/common'
import { UserController } from 'modules/user/user.controller'
import { UserService } from 'modules/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
