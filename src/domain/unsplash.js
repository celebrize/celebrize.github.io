const ixlib = "rb-1.2.1"
const ixid = "eyJhcHBfaWQiOjE3OTQ1NX0"
const fit = "crop"
const crop = "faces,center"

class Unsplash {
    constructor(id, authorName, hotlinkId, color, onlyWhen) {
        this.id = id
        this.authorName = authorName
        this.hotlinkId = hotlinkId
        this.color = color
        this.onlyWhen = onlyWhen
    }

    getImageHtmlLink() {
        return `https://unsplash.com/photos/${this.id}`
    }
    getAuthorName() {
        return this.authorName
    }
    getAuthorHtmlLink() {
        return `https://unsplash.com/@${this.authorUsername}`
    }
    getUnsplashHtmlLink() {
        return "https://unsplash.com"
    }
    getImageHotLink(width, height) {
        width = width || 300
        height = height || 200
        return `https://images.unsplash.com/photo-${this.hotlinkId}?ixlib=${ixlib}&ixid=${ixid}&w=${width}&h=${height}&fit=${fit}&crop=${crop}`
    }
    // return true if it is a perfect match, false if it is no match at all, null in all other cases
    isMatch(anniversary) {
        if (typeof(this.onlyWhen) === 'number') {
            return anniversary.getNumber() === this.onlyWhen
        } else if (typeof(this.onlyWhen) === 'string') {
            return anniversary.hasTag(this.onlyWhen)
        }
        return null
    }

}

module.exports = Unsplash
