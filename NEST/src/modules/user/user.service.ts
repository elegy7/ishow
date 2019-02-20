import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'modules/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUser(userDto: User): Promise<User> {
        return await this.userRepository.findOne(userDto)
    }

    async register(userDto: User): Promise<User> {
        return await this.userRepository.save(userDto)
    }
}
