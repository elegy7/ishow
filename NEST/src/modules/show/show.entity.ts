import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { IsString, IsDefined, IsInt } from 'class-validator'
import { User } from 'modules/user/user.entity'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'
import { Image } from 'modules/image/image.entity'

@Entity({ name: 'shown' })
export class Show {
    @PrimaryGeneratedColumn()
    @IsDefined({ groups: ['query'] })
    id: number

    @IsString({ always: true })
    @Column({ default: '未定义标题' })
    title: string

    @IsString({ always: true })
    @Column()
    iconUrl: string

    @IsString({ always: true })
    @Column()
    musicUrl: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime: string

    @Column({ type: 'int', default: 1, comment: '1:普通0:系統' })
    type: number

    @Column('text')
    desc: string

    @ManyToOne(type => User, user => user.shows)
    user: User

    @OneToMany(type => Page, page => page.show)
    pages: Page[]

    @OneToMany(type => Item, item => item.show)
    items: Item[]
}
