import { Injectable } from '@nestjs/common'
import { Repository, DeleteResult, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from 'modules/item/item.entity'
import { Show } from 'modules/show/show.entity'
import { User } from 'modules/user/user.entity'

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>
    ) {}

    async getItemsByShowId(showId: number): Promise<Item[]> {
        const show = await this.showRepository.findOne(
            {
                id: showId
            },
            {
                relations: ['items', 'items.image']
            }
        )
        if (!show) return

        show.items.forEach(item => {
            item['src'] = item.itemType === 'image' ? item.image.src : ''
            item.image = undefined
        })
        return show.items
    }

    async addItem(itemDto: Item): Promise<Item> {
        const data = {
            show: {
                id: itemDto.showId
            }
        }
        data['image'] = itemDto.imageId ? { id: itemDto.imageId } : undefined
        return await this.itemRepository.save(Object.assign(data, itemDto))
    }

    async updateItem(itemDto: Item): Promise<UpdateResult> {
        return await this.itemRepository
            .createQueryBuilder('item')
            .update(Item)
            .set(itemDto)
            .where('item.id=:itemId', { itemId: itemDto.id })
            .execute()
    }

    async removeItem(itemId: number): Promise<DeleteResult> {
        return await this.itemRepository
            .createQueryBuilder('item')
            .delete()
            .where('item.id=:itemId', { itemId })
            .execute()
    }
}
