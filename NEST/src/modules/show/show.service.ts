import { Injectable } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Show } from 'modules/show/show.entity'
import { User } from 'modules/user/user.entity'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}
    async getShowById(showId: number): Promise<Show> {
        const show = await this.showRepository.findOne(
            {
                id: showId
            },
            {
                relations: ['pages', 'pages.image']
            }
        )
        if (!show) return
        show.pages.forEach(page => {
            page['src'] = page.image.src
            page.image = undefined
        })
        show.pages.sort((item, item2) => item.pageIndex - item2.pageIndex)
        return show
    }
    async getShowsByUserId(userId: number): Promise<Show[]> {
        const user = await this.userRepository.findOne({ id: userId }, { relations: ['shows'] })
        return user.shows
    }

    async getSystemShow(): Promise<Show[]> {
        return await this.showRepository.find({ type: 0 })
    }

    async createShow(showDto: Show): Promise<Show> {
        return await this.showRepository.save(showDto)
    }

    async removeShow(showId: number): Promise<Show> {
        const show = await this.showRepository.findOne(showId, {
            relations: ['pages', 'items']
        })
        await this.pageRepository.remove(show.pages)
        await this.itemRepository.remove(show.items)
        return await this.showRepository.remove(show)
    }

    async save(showDto: Show): Promise<UpdateResult> {
        return await this.showRepository
            .createQueryBuilder('show')
            .update(Show)
            .set({
                title: showDto.title,
                iconUrl: showDto.iconUrl,
                musicUrl: showDto.musicUrl,
                desc: showDto.desc
            })
            .where('id=:id', { id: showDto.id })
            .execute()
    }
}
