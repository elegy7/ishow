import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsString, IsNumber, IsDefined, IsInt } from 'class-validator'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @IsString({ always: true })
    @Column()
    src: string

    @IsDefined({ always: true })
    @Column({
        type: 'varchar',
        default: 'default',
        comment: 'default:普通 page:页面',
        name: 'usefor'
    })
    use: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime: string

    /* dto */
    @IsDefined({ groups: ['upload'] })
    @IsInt({ always: true })
    @Column('int')
    showId: number

    @IsDefined({ groups: ['crop'] })
    @IsNumber({}, { always: true })
    path: string
}
