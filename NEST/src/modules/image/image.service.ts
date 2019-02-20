import { Injectable } from '@nestjs/common'
import { Image } from 'modules/image/image.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { User } from 'modules/user/user.entity'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}
    async getImages(use: string): Promise<Image[]> {
        return await this.imageRepository.query(
            `select id, src, usefor, showId from image where image.usefor = '${use}'`
        )
    }

    async saveImages(srcs: string[], use: string, showId) {
        const images = srcs.map(src => {
            return {
                src,
                use,
                showId
            }
        })
        return await this.imageRepository.save(images)
        /* return await this.imageRepository.query(
            `select id, src, usefor, type, showId from image where image.usefor = '${use}'`
        ) */
    }

    async removeImage(src: string): Promise<DeleteResult> {
        const result = await this.imageRepository
            .createQueryBuilder('image')
            .delete()
            .where('image.src=:src', { src })
            .execute()
        return result
    }
}
