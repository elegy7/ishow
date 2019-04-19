export default function(filesName) {
    this.data = function() {
        let obj = {
            status: 0
        }
        obj[filesName] = []
        obj['oldValue'] = this.value ? this.value.split(',') : []
        obj['isRequire'] = this.validate && this.validate.indexOf('required') != -1

        obj['uploadHost'] = Common.SERVER + '/image/upload'
        obj['uploadFileHost'] = Common.SERVER + '/core/upload'
        /* obj['SecretId'] = 'AKIDvtjU6YQBXlsps39gRiuKz04FUsUfqbqM'
        obj['SecretKey'] = 'qj8Uh9UvrfLvNygOAwovxRtXXd6xjkq3'
        obj['Bucket'] = 'osc-test-1257123066'
        obj['Region'] = 'ap-guangzhou'
        obj['uploadHost'] = `http://${obj['Bucket']}.cos.${obj['Region']}.myqcloud.com`
        obj['loadHost'] = 'http://osc-test-1257123066.picgz.myqcloud.com' */
        return obj
    }
    this.methods = {
        removeFile: function(file) {
            this.$refs.Upload && this.$refs.Upload.remove(file)
        },
        removeFileUrl: function(fileurl) {
            const self = this
            Common.fetch({
                url: '/image/removeImage',
                data: {
                    path: fileurl
                },
                success() {
                    let arr = []
                    self.oldValue.forEach(item => {
                        if (item != fileurl) {
                            arr.push(item)
                        }
                    })
                    self.oldValue = arr
                    Common.msg('删除成功')
                }
            })
        },
        /**
         * Has changed
         * @param  Object|undefined   newFile   只读
         * @param  Object|undefined   oldFile   只读
         * @return undefined
         */
        inputFile: function(newFile, oldFile) {
            console.log('newFile', newFile)
            const size = (this.size / (1024 * 1024)).toFixed(1)
            if (newFile && newFile.error == 'size') {
                Common.msg(`文件大小不符，不能超过${size}M`, '', 'warning')
                return
            }
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                // 获得相应数据
                if (newFile.xhr) {
                    //  获得响应状态码
                    console.log('status', newFile.xhr.status)
                    this.status = newFile.xhr.status
                }
            }
        },
        /**
         * Pretreatment
         * @param  Object|undefined   newFile   读写
         * @param  Object|undefined   oldFile   只读
         * @param  Function           prevent   阻止回调
         * @return undefined
         */
        inputFilter: function(newFile, oldFile, prevent) {
            if (!newFile) return
            if (newFile && !oldFile) {
                // 过滤不是图片后缀的文件
                if (!/\.(mp3)$/i.test(newFile.name)) {
                    return prevent()
                }
            }

            // 创建 blob 字段 用于图片预览
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file)
            }
        },
        /**
         * Pretreatment
         * @param  Object|undefined   newFile   读写
         * @param  Object|undefined   oldFile   只读
         * @param  Function           prevent   阻止回调
         * @return undefined
         */
        imageFilter: function(newFile, oldFile, prevent) {
            if (!newFile) return
            if (newFile && !oldFile) {
                // 过滤不是图片后缀的文件
                if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                    return prevent()
                }
            }

            // 创建 blob 字段 用于图片预览
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file)
            }
        },
        checkUploadStatus() {
            /* var pass = true
            this.files.forEach(item => {
                if (item.progress != '100.00') {
                    pass = false
                }
            }) */
            const pass = this.uploaded
            if (!pass) console.log('有图片未上传，如若上传失败，请删除后重试')
            return pass
        },
        reset() {
            this[filesName] = []
            this['status'] = 0
        }
    }
    this.watch = {
        value(newval) {
            /* 初始化时将已存在的图片保存在oldValue中 */
            if ($.isEmptyObject(this[filesName]) && newval) {
                this.oldValue = newval.split(',')
            }
            if (newval) $(this.$el).clearValid()
        },
        files(newval) {
            //如果multiple是false files里面最多只有一个文件 多的会自动删除
            if (!this.multiple && newval.length > 1) {
                this.files = [newval[newval.length - 1]]
            }
            // 异步赋值到files时才会进入这里
            let arr = this.multiple ? $.extend([], this.oldValue) : []
            for (let i = 0; i < newval.length; i++) {
                let item = newval[i]
                if (item.response.status == 1) {
                    arr.push(...item.response.result.map(r => r.src))
                } else {
                    item.data = this.param
                }
            }
            if (this.status == 200) {
                this.$emit('input', arr.join(','))
                //如果全部上传 将新图转为老图
                if (this.$refs.Upload.uploaded) {
                    this.oldValue = [...new Set(this.oldValue.concat(arr))]
                }
            }
        }
    }
}
