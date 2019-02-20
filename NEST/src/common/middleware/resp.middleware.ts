export function RespMiddleware(req, rep, next) {
    // sent方法将send封装返回统一的json数据格式
    rep.sent = (result = null, status = 1, summary = 'success') => {
        rep.send({ result, status, summary })
    }
    next()
}
