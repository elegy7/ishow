import { Injectable } from '@nestjs/common'
import { User } from 'modules/user/user.entity'
import { FileSystem } from 'common/util/fileSystem'
import Md5 from 'common/util/md5'
import * as path from 'path'
import * as fs from 'fs'
import * as gm from 'gm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Image } from 'modules/image/image.entity'
import { Show } from 'modules/show/show.entity'
import { Item } from 'modules/item/item.entity'
import { Page } from 'modules/page/page.entity'
import { BusinessException } from 'common/exception/business.exception'

const imageMagick = gm.subClass({ imageMagick: true })
const UPLOAD_PATH = 'public/upload/'
const fileSystem = new FileSystem()

interface FileDto {
    originalname: string
    buffer: string
}

@Injectable()
export class CoreService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>
    ) {}

    async root(): Promise<any> {
        /* 通过item表修改image表的showId */
        /* const itemCount = await this.itemRepository.find({
            where: { itemType: 'image' },
            relations: ['image', 'show']
        })
        let time = 0
        return new Promise(resolve => {
            itemCount.forEach(async item => {
                const image = await this.imageRepository.findOne({ id: item.image.id })
                image.showId = item.show.id
                await this.imageRepository.save(image)
                time++
                if (time === itemCount.length) {
                    console.log('invoke')
                    resolve(null)
                    return
                }
            })
        }) */
        /* 通过page表修改image表的usefor */
        /* const pages = await this.pageRepository.find({
            relations: ['image']
        })
        pages.forEach(async page => {
            const image = await this.imageRepository.findOne(page.image.id)
            image.use = 'page'
            await this.imageRepository.save(image)
        }) */
        /* 删除指定目录里没有记录在库的冗余图片 */
        /* const ppp = 'd:/Projects/ishow/NEST/public/upload/admin_3/'
        const files = fs.readdirSync(ppp)
        files.forEach(async file => {
            if (file.indexOf('.jpg') === -1 && file.indexOf('.png') === -1) {
                return
            }
            const result = await this.imageRepository
                .createQueryBuilder('image')
                .where('image.src like :src', { src: '%' + file + '%' })
                .getOne()
            if (!result) {
                console.log(ppp + file)
                fileSystem.deleteFile(ppp + file)
            }
        }) */
        return null
    }
    /**
     * 文件上传
     * @param user
     * @param showId
     * @param files
     */
    async upload<T extends FileDto>(user: User, showId: number, files: T[]): Promise<string[]> {
        const filesPath = []
        // 根据用户名和应用id递归创建目录
        const dirpath = path.join(
            process.cwd(),
            UPLOAD_PATH,
            user.username + '_' + showId.toString()
        )
        console.log('dirpath', dirpath)
        const err = await fileSystem.mkdirs(dirpath, 0)
        if (err) throw new BusinessException(err)
        /* 文件上传操作 */
        return new Promise((resolve, reject) => {
            files.forEach(async content => {
                // 生成完整的图片路径及名称
                const dirname =
                    `${dirpath}/upload_` +
                    Md5(new Date().getTime() + (Math.random() * 10000).toFixed(4)) +
                    `.${content.originalname.split('.')[1]}`
                const imgData = new Buffer(content.buffer, 'base64')
                // 将得到的文件路径进行处理, 放入数组准备返回
                filesPath.push(dirname.replace(path.join(process.cwd()), '').replace(/\\/g, '/'))
                // 保存图片文件
                fs.writeFile(dirname, imgData, err => {
                    if (err) reject(err)
                    else resolve(filesPath)
                })
            })
        })
    }
    /**
     * 图片裁剪
     * @param fields
     */
    async crop<T extends FileDto>(fields: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            imageMagick(fields.path)
                .crop(fields.w, fields.h, fields.x1, fields.y1)
                .resize(fields.targetW, fields.targetH, '!')
                .autoOrient()
                .write(fields.path, err => {
                    if (err) reject(err)
                    else resolve('/' + fields.path)
                })
        })
    }

    /**
     * 图片删除
     * @param fields
     */
    async removeFile(path: string): Promise<any> {
        let isUsing: any
        // 在page表中查图片是否被使用
        isUsing = await this.pageRepository
            .createQueryBuilder('page')
            .innerJoinAndSelect('page.image', 'image')
            .where('image.src=:path', { path })
            .getOne()
        if (isUsing) {
            throw new BusinessException('这张图片正用作某个背景图，不能直接删除')
        }
        // 在item表中查图片是否被使用
        isUsing = await this.itemRepository
            .createQueryBuilder('item')
            .innerJoinAndSelect('item.image', 'image')
            .where('image.src=:path', { path })
            .getOne()
        if (isUsing) {
            throw new BusinessException('这张图片中恒用作某个图片组件，不能直接删除')
        }
        // 在show表中查图片是否被使用
        isUsing = await this.showRepository.findOne({ iconUrl: path })
        if (isUsing) {
            throw new BusinessException('这张图片正用作某个分享图片，不能直接删除')
        }
        const err = fileSystem.removeFile(path)
        if (err) {
            throw new BusinessException(err)
        }
        return null
    }
    /**
     * 删除目录下所有冗余MP3文件
     * @param dir
     */
    async removeUnuseFile(dir: string) {
        const ddir = fs.readdirSync(dir)
        const arr = []
        ddir.forEach(folderName => {
            const filesName = fs.readdirSync(path.join(dir, folderName))
            filesName.forEach(fileName => {
                if (fileName.indexOf('.mp3') !== -1) {
                    arr.push(path.join(dir, folderName, fileName))
                }
            })
        })
        arr.forEach(async url => {
            const musicUrl = url.replace(path.join(process.cwd()), '').replace(/\\/g, '/')
            const result = await this.showRepository.findOne({ musicUrl })
            if (!result) {
                fileSystem.removeFile(url)
            }
        })
    }
    /**
     * 判断是否拥有权限 有返回true, 没有返回false
     */
    async checkAuth(showId: number, user: User): Promise<boolean> {
        const result = await this.showRepository.findOne({ id: showId, user: { id: user.id } })
        return !!result
    }
}
