import StellarLightAnniversary from "../domain/anniversary/stellarlight_anniversary"

function calcOddity(star) {
    const theMagnitude = Math.min(4.5, Math.max(2.5, star.getAppearantMagnitude()))

    return (theMagnitude - 2.5) + 1
}

class StellarLightCalculator {
    constructor(stars, latitude, birthday) {
        this.stars = stars
        this.latitude = latitude
        this.birthday = birthday
    }

    isDone() {
        return this.stars.length === 0
    }

    next() {
        while(this.stars.length > 0)  {
            const star = this.stars.shift()
            const date = new Date(this.birthday)
            date.setTime(date.getTime() + star.distance * 365.25 * 86400 * 1000)

            if (star.isInView(this.latitude, date)) {
                return new StellarLightAnniversary(date, star, calcOddity(star))
            }
        }
    }
}

export default StellarLightCalculator

export {
    calcOddity
}