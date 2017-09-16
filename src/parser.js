
class Parser {
    constructor (request) {
        this.request = request
    }

    ip () {
        const rgx = new RegExp(/(::ffff:|::)/g)
        return this.request.headers['x-forwarded-for'] || this.request.ip.replace(rgx, '')
    }

    os () {
        const user = this.request.headers['user-agent']
        const rgx = new RegExp(/(\(.+?\))/)
        const os = rgx.exec(user)[0]
        return os.replace(/[\(\)]/g, '')
    }

    language () {
        return this.request.headers['accept-language'].split(',')[0]
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
