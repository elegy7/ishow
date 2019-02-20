import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { IsInt, IsDefined } from 'class-validator'
import { Show } from 'modules/show/show.entity'
import { Image } from 'modules/image/image.entity'

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    @IsDefined({ groups: ['update', 'remove'] })
    id: number

    @IsInt({ always: true })
    @Column('int')
    pageIndex: number

    @ManyToOne(type => Image)
    @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
    image: Image

    @ManyToOne(type => Show, show => show.pages)
    show: Show

    // dto
    @IsInt({ always: true })
    @IsDefined({ groups: ['add', 'remove'] })
    showId: number

    @IsInt({ always: true })
    @IsDefined({ groups: ['add', 'update'] })
    imageId: number
}
