import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString, IsEmail, IsDefined, IsInt } from 'class-validator'
import { Show } from 'modules/show/show.entity'
import { ExcludeTrans } from 'common/transformer/exclude.transformer'

const GenderTrans = {
    from(val) {
        if (val === 0) return '未公开'
        if (val === 1) return '男'
        if (val === 2) return '女'
    },
    to(val) {
        if (val === '') return 0
        if (val === 'male') return 1
        if (val === 'fmale') return 2
    }
    /* to(val) {
        return val
    } */
}

@Entity()
export class User {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id: number

    @IsDefined({ groups: ['register', 'checkname'] })
    @IsString({ always: true })
    @Column({ unique: true, nullable: true })
    username: string

    @IsEmail(null, { message: '邮箱格式不正确', always: true })
    @IsDefined({ groups: ['registerByEmail', 'checkemail'] })
    @Column({ unique: true, nullable: true })
    email: string

    @IsString({ groups: ['login'] })
    @Column({ length: 32, transformer: ExcludeTrans })
    password: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createTime: string

    @IsString({ always: true })
    @Column({
        type: 'int',
        nullable: true,
        default: 0,
        comment: '0:未公开1:男2:女',
        transformer: GenderTrans
    })
    gender: number

    @Column({ type: 'int', default: 1, comment: '1:正常0:禁用', transformer: ExcludeTrans })
    state: number

    @Column({ type: 'int', default: 1, comment: '1:普通用户0:管理员' })
    type: number

    @OneToMany(type => Show, show => show.user)
    shows: Show[]

    /* DTO part */
    @IsString({ always: true })
    loginame: string

    showId: number
}
