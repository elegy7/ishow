import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { IsString, IsInt, IsNumber, IsDefined } from 'class-validator'
import { Show } from 'modules/show/show.entity'
import { Image } from 'modules/image/image.entity'

@Entity()
export class Item {
    @IsInt({ always: true })
    @IsDefined({ groups: ['remove', 'update'] })
    @PrimaryGeneratedColumn()
    id: number

    @IsString({ always: true })
    @IsDefined({ groups: ['add'] })
    @Column()
    itemType: string

    @IsInt({ always: true })
    @IsDefined({ groups: ['add'] })
    @Column('int')
    pageIndex: number

    @IsString({ always: true })
    @Column({ default: 'none' })
    animate: string

    @IsInt({ always: true })
    @Column('int')
    zIndex: number

    @IsInt({ always: true })
    @Column('int')
    speed: number

    @IsInt({ always: true })
    @Column('int')
    delay: number

    @IsNumber({}, { always: true })
    @Column('int')
    width: number

    @IsNumber({}, { always: true })
    @Column('int', { nullable: true })
    height: number

    @IsNumber({}, { always: true })
    @Column('int')
    translateY: number

    @IsNumber({}, { always: true })
    @Column('int')
    translateX: number

    @Column('text')
    text: string

    @Column()
    color: string

    @Column()
    bgColor: string

    @Column()
    borderColor: string

    @Column()
    fontSize: string

    @Column()
    radius: string

    @Column()
    btnType: string

    @Column()
    textAlign: string

    @Column()
    textWeight: string

    @Column()
    href: string

    @ManyToOne(type => Image)
    @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
    image: Image

    @ManyToOne(type => Show, show => show.pages)
    show: Show

    /* dto */
    @IsDefined({ groups: ['query'] })
    @IsInt({ always: true })
    showId: number

    @IsInt({ always: true })
    imageId: number
}
