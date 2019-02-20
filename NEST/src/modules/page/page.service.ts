import { Injectable } from '@nestjs/common'
import { Repository, DeleteResult, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Show } from 'modules/show/show.entity'
import { Page } from 'modules/page/page.entity'

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>
    ) {}

    // 添加一个页面
    async addPage(showId: number, imageId: number): Promise<any> {
        // 查询这个show下的所有页面
        const result = await this.pageRepository.find({ show: { id: showId } })
        // 获取当前最大pageIndex值
        const maxPageIndex = result.length ? Math.max(...result.map(item => item.pageIndex)) : 0
        // 保存新页面
        const page = await this.pageRepository.save({
            pageIndex: maxPageIndex + 1,
            image: {
                id: imageId
            },
            show: {
                id: showId
            }
        })
        return {
            id: page.id,
            pageIndex: page.pageIndex,
            imageId: page.image.id,
            showId: page.show.id
        }
    }

    // 修改页面
    async updatePage(pageId: number, set: any): Promise<UpdateResult> {
        return await this.pageRepository
            .createQueryBuilder('page')
            .update(Page)
            .set(set)
            .where('page.id=:pageId', { pageId })
            .execute()
    }

    // 删除一个页面
    async removePage(pageId: number, showId: number): Promise<DeleteResult> {
        return await this.pageRepository
            .createQueryBuilder('page')
            .delete()
            .where('page.id=:pageId and page.showId=:showId', { pageId, showId })
            .execute()
    }
}
