import StellarLightAnniversary from "../domain/anniversary/stellarlight_anniversary"

class StellarLightCalculator {
    constructor(stars, birthday) {
        this.stars = stars
        this.birthday = birthday
    }

    isDone() {
        return this.stars.length === 0
    }

    next() {
        const star = this.stars.shift()
        // @TODO: check visibility
        const date = new Date(this.birthday)
        date.setTime(date.getTime() + star.distance * 365.25 * 86400 * 1000)

        return new StellarLightAnniversary(date, star)
    }
}

export default StellarLightCalculator
