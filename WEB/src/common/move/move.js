import './move.css'
const Attr = {
    parent: '',
    child: '',
    events: ['move', 'drag'],
    check: function() {},
    rightCheck: function() {},
    uncheck: function() {},
    change: function() {}
}

function otherItemEvent() {
    //右键事件关闭系统默认菜单
    $(Attr.parent).bind('contextmenu', function() {
        return false
    })
    //uncheck事件
    /* $(Attr.parent).bind('click handClick', function(e) {
        if ($(e.target).hasClass('config-panel') || e.type == 'handClick') {
            //还原初始状态
            $(Attr.parent).undelegate('handChange')
            $(Attr.child).removeClass('item-little-actived')
            $('.item-block-plugin').remove()
            Attr.uncheck()
        }
    }) */
    //右键事件
    $(Attr.parent).rightClick(function(e, target) {
        if (!$(target).hasClass('item-little') && !$(target).hasClass('item-block')) return
        $(target).trigger('click')
        Attr.rightCheck(e, target)
    })
}

function checkItemEvent() {
    //小元素点击事件
    $(Attr.parent).delegate(Attr.child, 'mousedown', function(e) {
        const $this = $(this)
        if ($this.hasClass('item-little-actived')) return
        //清除之前的选择,还原初始状态
        $(Attr.parent).undelegate('handChange')
        $(Attr.child).removeClass('item-little-actived')
        $('.item-block-plugin').remove()
        //选中点击的元素
        $this.addClass('item-little-actived')
        $this.after(
            '' +
                '<div class="block-line line-left item-block-plugin"></div>' +
                '<div class="block-line line-right item-block-plugin"></div>' +
                '<div class="block-line line-top item-block-plugin"></div>' +
                '<div class="block-line line-down item-block-plugin"></div>' +
                '<div class="block-spot spot-left item-block-plugin"></div>' +
                '<div class="block-spot spot-right item-block-plugin"></div>' +
                '<div class="block-spot spot-top item-block-plugin"></div>' +
                '<div class="block-spot spot-down item-block-plugin"></div>' +
                '<div class="block-spot spot-left-top item-block-plugin"></div>' +
                '<div class="block-spot spot-right-top item-block-plugin"></div>' +
                '<div class="block-spot spot-left-down item-block-plugin"></div>' +
                '<div class="block-spot spot-right-down item-block-plugin"></div>'
        )

        $(Attr.parent).delegate('.item-little-actived', 'handChange', function(e, notChange) {
            let $item = $('.item-little-actived'),
                position = $item.position()

            let itemHeight = $item.height(),
                itemWidth = $item.width()
            $('.line-left')
                .height(itemHeight)
                .width(1)
            $('.line-right')
                .height(itemHeight)
                .width(1)
            $('.line-top')
                .height(1)
                .width(itemWidth)
            $('.line-down')
                .height(1)
                .width(itemWidth)

            $('.line-top').css({
                top: position.top,
                left: position.left
            })
            $('.line-down').css({
                top: position.top + itemHeight + 1,
                left: position.left
            })
            $('.line-left').css({
                top: position.top,
                left: position.left
            })
            $('.line-right').css({
                top: position.top,
                left: position.left + itemWidth + 1
            })

            $('.spot-top').css({
                top: position.top,
                left: position.left + itemWidth / 2
            })
            $('.spot-down').css({
                top: position.top + itemHeight,
                left: position.left + itemWidth / 2
            })
            $('.spot-left').css({
                top: position.top + itemHeight / 2,
                left: position.left
            })
            $('.spot-right').css({
                top: position.top + itemHeight / 2,
                left: position.left + itemWidth
            })

            $('.spot-left-top').css({
                top: position.top,
                left: position.left
            })
            $('.spot-left-down').css({
                top: position.top + itemHeight,
                left: position.left
            })
            $('.spot-right-top').css({
                top: position.top,
                left: position.left + itemWidth
            })
            $('.spot-right-down').css({
                top: position.top + itemHeight,
                left: position.left + itemWidth
            })

            //执行变化事件
            if (!notChange) {
                Attr.change({
                    height: itemHeight,
                    width: itemWidth,
                    position: position
                })
            }
        })
        $('.item-little-actived').trigger('handChange', true)
        //执行选中事件
        Attr.check(e)
    })
}

/* eslint-disable */
function dragEvent() {
    //上
    $(Attr.parent).delegate('.spot-top', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this)
        var xo = e.pageX
        var yo = e.pageY
        var heighto = $item.height()
        var topo = parseFloat($item.css('y'))
        $('body').bind('mousemove', function(e) {
            var x = e.pageX
            var y = e.pageY
            $item.css({
                height: heighto + (yo - y),
                y: topo - (yo - y)
            })
            $('.item-little-actived').trigger('handChange')
        })
    })
    //下
    $(Attr.parent).delegate('.spot-down', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this)
        var xo = e.pageX
        var yo = e.pageY
        var heighto = $item.height()
        $('body').bind('mousemove', function(e) {
            var x = e.pageX
            var y = e.pageY
            $item.css({
                height: heighto + (y - yo)
            })
            $('.item-little-actived').trigger('handChange')
        })
    })
    //左
    $(Attr.parent).delegate('.spot-left', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this)
        var xo = e.pageX
        var yo = e.pageY
        var widtho = $item.width()
        var lefto = parseFloat($item.css('x'))
        $('body').bind('mousemove', function(e) {
            var x = e.pageX
            var y = e.pageY
            $item.css({
                width: widtho + (xo - x),
                x: lefto - (xo - x)
            })
            $('.item-little-actived').trigger('handChange')
        })
    })
    //右
    $(Attr.parent).delegate('.spot-right', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this)
        var xo = e.pageX
        var yo = e.pageY
        var widtho = $item.width()
        $('body').bind('mousemove', function(e) {
            var x = e.pageX
            var y = e.pageY
            $item.css({
                width: widtho + (x - xo)
            })
            $('.item-little-actived').trigger('handChange')
        })
    })
    //左上
    $(Attr.parent).delegate('.spot-left-top', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this),
            xo = e.pageX,
            yo = e.pageY,
            heighto = $item.height(),
            widtho = $item.width(),
            precent = heighto / widtho,
            lefto = parseFloat($item.css('x')),
            topo = parseFloat($item.css('y'))
        $('body').bind('mousemove', function(e) {
            var x = e.pageX,
                y = e.pageY
            /* 等比缩放, 下面也是 */
            if ($item.data('type') == 'image') {
                $item.css({
                    height: (widtho + (xo - x)) * precent,
                    width: widtho + (xo - x),
                    x: lefto - (xo - x)
                })
            } else {
                $item.css({ height: heighto + (yo - y), width: widtho + (xo - x), x: lefto - (xo - x), y: topo - (yo - y) })
            }
            $item.css({
                y: topo - parseFloat($item.css('height')) + heighto
            })
            $('.item-little-actived').trigger('handChange')
        })
    })
    //左下
    $(Attr.parent).delegate('.spot-left-down', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this),
            xo = e.pageX,
            yo = e.pageY,
            heighto = $item.height(),
            widtho = $item.width(),
            precent = heighto / widtho,
            lefto = parseFloat($item.css('x'))
        $('body').bind('mousemove', function(e) {
            var x = e.pageX,
                y = e.pageY
            if ($item.data('type') == 'image') {
                $item.css({
                    height: (widtho + (xo - x)) * precent,
                    width: widtho + (xo - x),
                    x: lefto - (xo - x)
                })
            } else {
                $item.css({ height: heighto + (y - yo), width: widtho + (xo - x), x: lefto - (xo - x) })
            }
            $('.item-little-actived').trigger('handChange')
        })
    })
    //右上
    $(Attr.parent).delegate('.spot-right-top', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this),
            xo = e.pageX,
            yo = e.pageY,
            heighto = $item.height(),
            widtho = $item.width(),
            precent = heighto / widtho,
            topo = parseFloat($item.css('y'))
        $('body').bind('mousemove', function(e) {
            var x = e.pageX,
                y = e.pageY
            if ($item.data('type') == 'image') {
                $item.css({
                    height: (widtho + (x - xo)) * precent,
                    width: widtho + (x - xo),
                    y: topo - parseFloat($item.css('height')) + heighto
                })
            } else {
                $item.css({ height: heighto + (yo - y), width: widtho + (x - xo), y: topo - (yo - y) })
            }
            $('.item-little-actived').trigger('handChange')
        })
    })
    //右下
    $(Attr.parent).delegate('.spot-right-down', 'mousedown', function(e) {
        var $item = $('.item-little-actived'),
            $this = $(this),
            xo = e.pageX,
            yo = e.pageY,
            heighto = $item.height(),
            widtho = $item.width(),
            precent = heighto / widtho
        $('body').bind('mousemove', function(e) {
            var x = e.pageX,
                y = e.pageY
            if ($item.data('type') == 'image') {
                $item.css({
                    height: (widtho + (x - xo)) * precent,
                    width: widtho + (x - xo)
                })
            } else {
                $item.css({ height: heighto + (y - yo), width: widtho + (x - xo) })
            }
            $('.item-little-actived').trigger('handChange')
        })
    })
    $('body').on('mouseup', function() {
        var $this = $(this)
        $(Attr.parent).unbind('mousemove')
    })
}

function moveEvent() {
    $(Attr.parent).delegate('.item-little', 'mousedown', function(e) {
        e.preventDefault()
        // 只有左键点击有效
        if (e.which != 1) return
        var $this = $(this),
            xo = e.pageX,
            yo = e.pageY,
            imgLeft = $this.position().left,
            imgTop = $this.position().top
        // 这里的延迟30毫秒是为了防止选中小组件时误操作导致的移动, 不能大于30否则会引发别的问题
        setTimeout(() => {
            $('body').on('mousemove', function(e) {
                if (!$this.hasClass('item-little-actived')) return
                e.preventDefault()
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
                var x = e.pageX
                var y = e.pageY

                var bX = $(Attr.parent).offset().left
                var bY = $(Attr.parent).offset().top
                var _top = y - bY - (yo - bY) + imgTop
                var _left = x - bX - (xo - bX) + imgLeft
                $this.css({
                    x: _left,
                    y: _top
                })
                $('.item-little-actived').trigger('handChange')
            })
        }, 30)
        $('body').on('mouseup', function() {
            $(this).off('mousemove')
        })
    })
}
export default {
    init(config) {
        //扩展鼠标右击事件
        $.fn.extend({
            //定义鼠标右键方法，接收一个函数参数
            rightClick: function(fn) {
                //为这个对象绑定鼠标按下事件
                $(this).mousedown(function(e) {
                    //如果按下的是右键，则执行函数
                    if (3 == e.which) {
                        fn(e, e.target)
                    }
                })
            }
        })
        Object.assign(Attr, config)
        moveEvent()
        dragEvent()
        otherItemEvent()
        checkItemEvent()
    }
}
