import * as async from 'async'
import * as fs from 'fs'
import * as path from 'path'

export class FileSystem {
    /**
     * @param dirpath
     * @param mode
     * @returns dirpath: string
     */
    async mkdirs(dirpath, mode): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.exists(dirpath, async exists => {
                if (exists) {
                    resolve(null)
                } else {
                    await this.mkdirs(path.dirname(dirpath), mode)
                    fs.mkdir(dirpath, mode, err => {
                        if (err) resolve(err)
                        else resolve(null)
                    })
                }
            })
        })
    }
    removeDir(path) {
        let files = []
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path)
            files.forEach(file => {
                const curPath = path + '/' + file
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    this.removeDir(curPath)
                } else {
                    // delete file
                    fs.unlinkSync(curPath)
                }
            })
            fs.rmdirSync(path)
        }
    }
    removeFile(path) {
        if (path.indexOf('/') === 0) {
            path = path.substring(1)
        }
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
            return null
        } else {
            return '图片不存在'
        }
    }
}

/* tslint:disable */
export class CopyDir {
    // cursively make dir
    mkdirs(p, mode, f?, made?) {
        const self = this
        if (typeof mode === 'function' || mode === undefined) {
            f = mode
            mode = 0o0777 & ~process.umask()
        }
        if (!made) made = null

        var cb = f || function() {}
        if (typeof mode === 'string') mode = parseInt(mode, 8)
        p = path.resolve(p)

        fs.mkdir(p, mode, function(er) {
            if (!er) {
                made = made || p
                return cb(null, made)
            }
            switch (er.code) {
                case 'ENOENT':
                    self.mkdirs(path.dirname(p), mode, function(er, made) {
                        if (er) {
                            cb(er, made)
                        } else {
                            self.mkdirs(p, mode, cb, made)
                        }
                    })
                    break

                // In the case of any other error, just see if there's a dir
                // there already.  If so, then hooray!  If not, then something
                // is borked.
                default:
                    fs.stat(p, function(er2, stat) {
                        // if the stat fails, then that's super weird.
                        // let the original error be the failure reason.
                        if (er2 || !stat.isDirectory()) {
                            cb(er, made)
                        } else {
                            cb(null, made)
                        }
                    })
                    break
            }
        })
    }
    // single file copy
    copyFile(file, toDir, cb) {
        const self = this
        async.waterfall(
            [
                function(callback) {
                    fs.exists(toDir, function(exists) {
                        if (exists) {
                            callback(null, false)
                        } else {
                            callback(null, true)
                        }
                    })
                },
                function(need, callback) {
                    if (need) {
                        self.mkdirs(path.dirname(toDir), callback)
                    } else {
                        callback(null, true)
                    }
                },
                function(p, callback) {
                    var reads = fs.createReadStream(file)
                    var writes = fs.createWriteStream(
                        path.join(path.dirname(toDir), path.basename(file))
                    )
                    reads.pipe(writes)
                    //don't forget close the  when  all the data are read
                    reads.on('end', function() {
                        writes.end()
                        callback(null)
                    })
                    reads.on('error', function(err) {
                        console.log('error occur in reads')
                        callback(true, err)
                    })
                }
            ],
            cb
        )
    }

    // cursively count the  files that need to be copied

    _ccoutTask(from, to, cbw) {
        const self = this
        async.waterfall(
            [
                function(callback) {
                    fs.stat(from, callback)
                },
                function(stats, callback) {
                    if (stats.isFile()) {
                        cbw.addFile(from, to)
                        callback(null, [])
                    } else if (stats.isDirectory()) {
                        fs.readdir(from, callback)
                    }
                },
                function(files, callback) {
                    if (files.length) {
                        for (var i = 0; i < files.length; i++) {
                            self._ccoutTask(
                                path.join(from, files[i]),
                                path.join(to, files[i]),
                                cbw.increase()
                            )
                        }
                    }
                    callback(null)
                }
            ],
            cbw
        )
    }
    // wrap the callback before counting
    ccoutTask(from, to, cb) {
        var files = []
        var count = 1

        function wrapper(err) {
            count--
            if (err || count <= 0) {
                cb(err, files)
            }
        }
        wrapper.increase = function() {
            count++
            return wrapper
        }
        wrapper.addFile = function(file, dir) {
            files.push({
                file: file,
                dir: dir
            })
        }
        this._ccoutTask(from, to, wrapper)
    }
    doCopy(from, to, cb) {
        const self = this
        if (!cb) {
            cb = function() {}
        }
        async.waterfall(
            [
                function(callback) {
                    fs.exists(from, function(exists) {
                        if (exists) {
                            callback(null, true)
                        } else {
                            console.log(from + ' not exists')
                            callback(true)
                        }
                    })
                },
                function(exists, callback) {
                    fs.stat(from, callback)
                },
                function(stats, callback) {
                    if (stats.isFile()) {
                        // one file copy
                        self.copyFile(from, to, function(err) {
                            if (err) {
                                // break the waterfall
                                callback(true)
                            } else {
                                callback(null, [])
                            }
                        })
                    } else if (stats.isDirectory()) {
                        self.ccoutTask(from, to, callback)
                    }
                },
                function(files, callback) {
                    // prevent reaching to max file open limit
                    async.mapLimit(
                        files,
                        10,
                        function(f, cb) {
                            self.copyFile(f.file, f.dir, cb)
                        },
                        callback
                    )
                }
            ],
            cb
        )
    }
}
