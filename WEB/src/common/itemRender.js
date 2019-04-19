let winHeight, winWidth
let defHeight = 480,
    defWidth = 320,
    preHeight,
    preWidth

//渲染图片组件
function renderImage(one, element, i) {
    const $item = $(element)
        .append('<img data-i="' + i + '"/>')
        .find('img')
        .last()
    //image元素的定制化属性
    $item.attr('src', one.src)
    if (one.href) {
        $item.touch('tap', function() {
            window.location.href = one.href
        })
    }
    return $item
}
//渲染文本组件
function renderText(one, element, i) {
    const $item = $(element)
        .append('<article data-i="' + i + '"/>')
        .find('article')
        .last()
    $item.text(one.text).css({
        'word-break': 'break-all',
        'white-space': 'pre-wrap',
        'text-align': 'inherit',
        'line-height': one.height + 'px'
    })
    //text元素的定制化属性
    if (one.bgColor) {
        $item.css('background-color', one.bgColor)
    }
    if (one.borderColor) {
        $item.css('border', '1px solid ' + one.borderColor)
    }
    if (one.textAlign) {
        $item.css('text-align', one.textAlign)
    }
    if (one.textWeight) {
        $item.css('font-weight', one.textWeight)
    }
    return $item
}
//渲染按钮组件
function renderButton(one, element, i) {
    const $item = $(element)
        .append('<article data-i="' + i + '"/>')
        .find('article')
        .last()
    $item.text(one.text).css({
        'line-height': one.height + 'px'
    })
    //text元素的定制化属性
    if (one.bgColor) {
        $item.css('background-color', one.bgColor)
    }
    if (one.borderColor) {
        $item.css('border', '1px solid ' + one.borderColor)
    }
    return $item
}
//渲染视频组件
function renderVideo(one, element, i) {
    //设置视频播放按钮
    const $item = $(element)
        .append('<span class="video-span" data-i="' + i + '"></span>')
        .find('.video-span')
        .last()
    //视频播放图标按钮
    $item.css('background-image', 'url(/public/images/video.jpg)')
    return $item
}
//渲染地图组件
function renderMap(one, element, i) {
    //创建页面中的地图按钮
    const $item = $(element)
        .append('<span class="map_icon" data-i="' + i + '"></span>')
        .find('.map_icon')
        .last()
    //地图图标按钮
    $item.css('background-image', 'url(/public/images/map_icon.png)')
    return $item
}
//执行小元素的动画
export default {
    animate: {
        //所有动画调用此方法进行,分为三个步骤
        base: function(config) {
            let $item = config.item
            let before = config.before || function() {}
            let after = config.after || function() {}
            //获取元素设置的属性值
            let def = {}
            def.speed = $item.attr('data-speed')
            def.delay = $item.attr('data-delay')
            def.range_add = '+=' + 30 * preHeight
            def.range_cut = '-=' + 30 * preHeight
            def.turn_add = '+=180'
            def.turn_cut = '-=180'
            //设置元素动画前的预设值
            before(def)
            //根据delay和speed执行动画
            setTimeout(function() {
                after(def)
            }, def.delay)
        },
        //无动画
        none: function($item) {
            this.base({
                item: $item,
                before: function() {
                    $item.css({
                        opacity: 1
                    })
                }
            })
        },
        //从上到下移动渐现
        upToDown: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        y: def.range_cut
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            y: def.range_add,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从下到上移动渐现
        downToUp: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        y: def.range_add
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            y: def.range_cut,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从左到右移动渐现
        leftToRight: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        x: def.range_cut
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            x: def.range_add,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从右到左移动渐现
        rightToLeft: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        x: def.range_add
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            x: def.range_cut,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从左向右翻转渐现
        leftTurnRight: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        rotateY: def.turn_cut
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            rotateY: def.turn_add,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从右向左翻转渐现
        rightTurnLeft: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        rotateY: def.turn_add
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            rotateY: def.turn_cut,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从后向前翻转渐现
        afterTurnBefore: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        rotateX: def.turn_add
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            rotateX: def.turn_cut,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //从前向后翻转渐现
        beforeTurnAfter: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    $item.css({
                        rotateX: def.turn_cut
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            rotateX: def.turn_add,
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //自小变大
        smallToBig: function($item) {
            this.base({
                item: $item,
                before: function() {
                    $item.css({
                        scale: 0
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            scale: 1,
                            opacity: 1
                        },
                        def.speed,
                        'easeOutBack',
                        null
                    )
                }
            })
        },
        //旋转出现
        turnLoop: function($item) {
            this.base({
                item: $item,
                after: function(def) {
                    turnOneTime(def)
                }
            })
            //记录转动的次数
            let time = 0

            function turnOneTime(def) {
                $item.transition(
                    {
                        rotateY: '+=180',
                        opacity: 1
                    },
                    150,
                    function() {
                        time++
                        if (time * 150 < def.speed) {
                            turnOneTime(def)
                        }
                    }
                )
            }
        },
        //渐现
        fadeIn: function($item) {
            this.base({
                item: $item,
                before: function() {
                    //设置元素动画前的预设值
                    $item.css({
                        opacity: 0
                    })
                },
                after: function(def) {
                    $item.transition(
                        {
                            opacity: 1
                        },
                        def.speed
                    )
                }
            })
        },
        //跳动渐现
        jump: function($item) {
            this.base({
                item: $item,
                before: function(def) {
                    //设置元素动画前的预设值
                    $item.css({
                        y: def.range_cut
                    })
                },
                after: function(def) {
                    //延迟时间到达后执行动画
                    jumpOneTime(true, def)
                }
            })
            //记录跳动的次数
            let time = 0

            function jumpOneTime(bool, def) {
                const upOrDown = bool ? def.range_add : def.range_cut
                $item.transition(
                    {
                        y: upOrDown,
                        opacity: 1
                    },
                    50,
                    function() {
                        time++
                        if (time * 50 <= def.speed) {
                            jumpOneTime(!bool, def)
                        }
                    }
                )
            }
        }
    },
    //查询配置文件
    queryConfig(url, param) {
        let itemConfig
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            async: false,
            data: param,
            success: function(result) {
                itemConfig = result['option']
            }
        })
        return itemConfig
    },
    //初始化小元素
    renderItem(element, Config) {
        const index = $(element).data('index')
        winHeight = $(element).height()
        winWidth = $(element).width()
        preHeight = winHeight / defHeight
        preWidth = winWidth / defWidth
        //构造页面上的小元素
        let i = 0,
            one_translateY,
            one_translateX
        Config.forEach(function(one) {
            if (one.pageIndex == index) {
                i++
                let $item
                if (one.itemType == 'image') {
                    $item = renderImage(one, element, i)
                }
                if (one.itemType == 'text') {
                    $item = renderText(one, element, i)
                }
                if (one.itemType == 'button') {
                    $item = renderButton(one, element, i)
                }
                if (one.itemType == 'video') {
                    $item = renderVideo(one, element, i)
                }
                if (one.itemType == 'map') {
                    $item = renderMap(one, element, i)
                }
                //上边距和左边距支持固定值和百分比两种方式,当填写固定值的时候在这里换算成百分比
                if (Math.abs(one.translateY) > 1 || one.translateY == 0) {
                    one_translateY = (parseFloat(one.translateY) + one.height / 2) / 480
                }
                if (Math.abs(one.translateX) > 1 || one.translateX == 0) {
                    one_translateX = (parseFloat(one.translateX) + one.width / 2) / 320
                }
                $item.addClass('item-little')
                $item.attr({
                    'data-index': one.pageIndex,
                    'data-animate': one.animate,
                    'data-type': one.itemType,
                    'data-delay': one.delay,
                    'data-speed': one.speed
                })
                //计算某些属性的默认值
                one.left = winWidth * one_translateX - one.width / 2
                one.top = winHeight * one_translateY - one.height / 2
                one.rotate = one.rotate || 0
                one.zIndex = one.zIndex || 2
                //设置某些属性的默认值
                $item.css({
                    width: one.width,
                    height: one.height,
                    color: one.color,
                    'border-radius': one.radius,
                    'font-size': one.fontSize,
                    transform:
                        'translate(' + one.left + 'px,' + one.top + 'px)' + 'scale(' + preWidth + ',' + preHeight + ')' + 'rotate(' + one.rotate + 'deg)',
                    'z-index': one.zIndex
                })
            }
        })
    }
}
