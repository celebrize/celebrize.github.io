// right ascension is usually given as a clock time in the form of "16h30m14.24s"
// this function converts it into decimal hours
function parseRightAscension(input) {
    if (!input) { return null }
    if (input.endsWith("°")) {
        return parseFloat(input, 10) / 360*24
    }

    const result = input.match(/^(\d+)h\s*(\d+)m\s*(\d+\.?\d*)s$/)
    if (!result) {
        throw new TypeError(`Can not parse ${input} as right ascension`)
    }

    const [_, hours, minutes, seconds] = result
    

    return parseInt(hours, 10) + parseInt(minutes, 10) / 60 + parseInt(seconds, 10) / 3600
}

// declination is usually given in degrees between -90° (south pole) and +90° (north pole)
// this function converts it into decimal degrees
function parseDeclination(input) {
    if (!input) { return null }

    if (input.endsWith("°")) {
        return parseFloat(input, 10)
    }

    const result = input.match(/^([+-]?\d+)°\s*(\d+)'\s*(\d+\.?\d*)"$/)
    if (!result) {
        throw new TypeError(`Can not parse ${input} as declination`)
    }

    const [_, deg, minutes, seconds] = result

    const full = parseInt(deg, 10)
    const fraction = parseInt(minutes, 10) / 60 + parseInt(seconds, 10) / 3600

    return input.startsWith("-")  ? full - fraction : full + fraction
}

// put degrees in a range between 0 and 360° (exclusive)
function normalizeDegrees(degrees) {
    degrees = degrees % 360
    if (degrees < 0) {
        degrees += 360
    }

    return degrees
}

// get the position of the sun on the celestial sphere in equatorial coordinates at the given date
function getSunEquatorialCoordinates(date) {
    const degToRad = degrees => degrees * Math.PI / 180
    // we use variable names from this formula: https://en.wikipedia.org/wiki/Position_of_the_Sun#Ecliptic_coordinates

    // "Start by calculating n, the number of days (positive or negative, including fractional days) since Greenwich noon, Terrestrial Time,
    // on 1 January 2000 (J2000.0)."
    // unixtime = (JD − 2440587.5) × 86400
    const jd = (date.getTime() / 1000) / 86400 + 2440587.5

    // "If the Julian date for the desired time is known, then"
    const n = jd - 2451545.0

    // "The mean longitude of the Sun, corrected for the aberration of light, is"
    const L = normalizeDegrees(280.460 + 0.9856474 * n) // in °

    // "The mean anomaly of the Sun (actually, of the Earth in its orbit around the Sun, but it is convenient to pretend the Sun orbits the Earth), is:""
    const g = normalizeDegrees(357.528 + 0.9856003 * n) // in °

    // "Finally, the ecliptic longitude of the Sun is"
    const lambda = L + 1.915 * Math.sin(degToRad(g)) + 0.02 * Math.sin(degToRad(2 * g)) // in °

    // "calculating the obliquity of the ecliptic, epsilon"
    // we just consider it a constant. It only changes in arcseconds over the years
    const epsilon = 23.43657 // in °

    const cos = deg => Math.cos(degToRad(deg))
    const sin = deg => Math.sin(degToRad(deg))
    // "right ascension"
    const alpha = Math.atan2(cos(epsilon) * sin(lambda), cos(lambda))

    // "declination"
    const delta = Math.asin(sin(epsilon) * sin(lambda))

    const radToRightAscension = rad => normalizeDegrees(rad * 180 / Math.PI) / 360*24
    const radToDeclination = rad => rad * 180 / Math.PI

    return [
        radToRightAscension(alpha),
        radToDeclination(delta)
    ]
}

class CelestialFixedStar {
    constructor(name, rightAscension, declination, apparentMagnitude, distance, wikipediaId, tycId) {
        this.name = name
        this.rightAscension = parseRightAscension(rightAscension)
        this.declination = parseDeclination(declination)
        this.apparentMagnitude = apparentMagnitude
        this.distance = distance
        this.wikipediaId = wikipediaId
        this.tycId = tycId
    }

    getWikipediaLink() {
        return this.wikipediaId ? `https://en.wikipedia.org/wiki/${this.wikipediaId}` : null
    }

    getInTheSkyLink() {
        return this.tycId ? `https://in-the-sky.org/data/object.php?id=TYC${this.tycId}` : null
    }

    getName() {
        return this.name
    }

    getDistance() {
        return this.distance
    }

    getAppearantMagnitude() {
        return this.apparentMagnitude
    }

    // @TODO: classify how good the stars are visible https://en.wikipedia.org/wiki/Bortle_scale

    isInView(latitude, date) {
        const [sunRightAscension, sunDeclination] = getSunEquatorialCoordinates(date)
        // no stars can be seen if you live in the polar regions during midnight sun
        if (90 - latitude < sunDeclination || -90 - latitude > sunDeclination) {
            return false
        }

        // circumpolar stars are always visible 
        // @see https://en.wikipedia.org/wiki/Circumpolar_star
        // "the observer's latitude (θ)"
        // "the star's declination (δ)"

        // "The star is circumpolar if θ + δ is greater than +90° (observer in Northern Hemisphere),
        // or θ + δ is less than −90° (observer in Southern Hemisphere)"
        if (latitude + this.declination > 90 || latitude + this.declination < -90) {
            return true
        }

        // "Similarly, the star will never rise above the local horizon if δ − θ is less than −90° (observer in Northern Hemisphere),
        // or δ − θ is greater than +90° (observer in Southern Hemisphere)"
        if (this.declination - latitude < -90 || this.declination - latitude > 90) {
            return false
        }

        // The rest gets trickier. And, unfortunately I could not find any place that gives you a correct formula. So lets construct it
        // ourselves. Here are a few considerations:
        // * There are three reasons why a star is not visible:
        // * we already ruled out circumpolar stars - so any other star is visible from our location somewhere throughout the year.
        //   We just don't know when
        // * Earth's rotation is irrelevant for this consideration. It is enough to know that the star is visible somewhen during the night.
        // * the reason why stars are not visible at some date, is the sun blocking view to it by its brightness
        // * if we consider the celestial sphere we know exactly where the sun is during the year. It's plane is called the ecliptic.
        //   It is tilted compared to the equator by the same angle the earth's axis is tilted (~23°)
        // * if we known the location of the sun on the celestial sphere, we can assume that all stars within 90° right ascension and
        //   90° declination can not be seen from anywhere on earth during that day.

        const degDiff = (a, b) => {
            let diff = Math.abs(a - b)
            if (diff > 180) {
                diff = Math.abs(diff - 360)
            }
            return diff
        }
        const hourDiff = (a, b) => {
            let diff = Math.abs(a - b)
            if (diff > 12) {
                diff = Math.abs(diff - 24)
            }
            return diff
        }

        // star is not visible if it is within 90° of the suns position
        if (degDiff(this.declination, sunDeclination) < 90 && hourDiff(this.rightAscension,sunRightAscension) < 6) {
            return false
        }

        return true
    }

}

export default CelestialFixedStar

export {
    parseRightAscension,
    parseDeclination,
    normalizeDegrees,
    getSunEquatorialCoordinates,
}
