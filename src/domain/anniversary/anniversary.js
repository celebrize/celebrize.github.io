// the interface
// can be used for mocks too

class Anniversary {
    constructor(date) {
        this.date = date
    }

    getDateObject() {
        return this.date
    }

    getTime() {
        return this.date.getTime()
    }

    getPrecision() {
        return Anniversary.PRECISION_SECONDS
    }

    getOddity() {
        return 1
    }

    getStaticId() {
        const base = this.date.toISOString()

        // stolen from https://stackoverflow.com/a/7616484
        let hash = 0, i, chr;
        for (i = 0; i < base.length; i++) {
            chr   = base.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        hash += 0xefffffff
        return hash;
    }

    hasTag(tag) {
        return false
    }
}

Anniversary.PRECISION_SECONDS = "seconds"
Anniversary.PRECISION_DAYS ="days"

export default Anniversary
