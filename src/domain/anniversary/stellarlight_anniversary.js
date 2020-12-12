import Anniversary from './anniversary'

// when you can see the light of a star from the date of your birth
class StellarLightAnniversary {
    constructor(date, star) {
        this.date = date
        this.star = star
    }

    getDateObject() {
        return this.date
    }

    getTime() {
        return this.date.getTime()
    }

    getPrecision() {
        return Anniversary.PRECISION_DAYS
    }

    getOddity() {
        // @TODO
        return 1
    }

    getStar() {
        return this.star
    }

    getStarName() {
        return this.star.name
    }

    getStaticId() {
        // @TODO
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
        return tag === "star"
    }
}

export default StellarLightAnniversary
