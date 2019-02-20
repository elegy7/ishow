export class BusinessException extends Error {
    private response
    status: any
    constructor(response, status = 'Business_Exception') {
        super()
        this.response = response
        this.status = status
        this.message = response
    }
    getResponse() {
        return this.response
    }
    getStatus() {
        return this.status
    }
}
