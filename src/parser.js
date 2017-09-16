
class Parser {
    constructor (request) {
        this.headers = request.headers
    }

    ip () {
        return this.headers.host
    }

    os () {
        const user = this.headers['user-agent']
        const rgx = new RegExp(/(\(.+?\))/)
        const os = rgx.exec(user)[0]
        return os.replace(/[\(\)]/g, '')
    }

    language () {
        return this.headers['accept-language'].split(',')[0]
    }

    getHash () {
        return {
            ipaddress: this.ip(),
            language: this.language(),
            software: this.os()
        }
    }
}

module.exports = Parser
