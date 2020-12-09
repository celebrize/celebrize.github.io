import CelestialFixedStar from "../domain/celestial_fixed_star"
// @see http://simbad.u-strasbg.fr/simbad/sim-fsam
import data from "./visible_stars_data"

// Query here if you want to know more about a star
// @see http://simbad.u-strasbg.fr/simbad/sim-fid

const stars = []
const warnings = []
function warning(text) {
    warnings.push(text)
}

function parseString(text) {
    return text.trim()
}

function parseCoordinates(text) {
    const [one, two] = text.split(" ")

    return [`${one}°`, `${two}°`]
}

function parallaxToLightyears(parallax) {
    // @see https://celestia.space/forum/viewtopic.php?f=15&t=16804
    return 3261.63626 / parallax
}

const decToSuper = (char) => {
    if (char === "1") {
        return "\u00B9"
    } else if (char === "2") {
        return "\u00B2"
    } else if (char === "3") {
        return "\u00B3"
    } else {
        const i = char.charCodeAt(0)
        return String.fromCodePoint(i + 0x2040)
    }
}
const superToDec = (char) => {
    if (char === "\u00B9") {
        return "1"
    } else if (char === "\u00B2") {
        return "2"
    } else if (char === "\u00B3") {
        return "3"
    } else {
        const i = char.charCodeAt(0)
        return String.fromCodePoint(i - 0x2040)
    }
}

const designationTranslation = {
    alf: "Alpha",
    bet: "Beta",
    gam: "Gamma",
    del: "Delta",
    eps: "Epsilon",
    zet: "Zeta",
    eta: "Eta",
    tet: "Theta",
    iot: "Iota",
    kap: "Kappa",
    lam: "Lambda",
    "mu.": "Mu",
    "nu.": "Nu",
    ksi: "Xi",
    omi: "Omikron",
    "pi.": "Pi",
    rho: "Rho",
    sig: "Sigma",
    tau: "Tau",
    ups: "Upsilon",
    phi: "Phi",
    chi: "Chi",
    psi: "Psi",
    ome: "Omega",
}

function convertDesignation(designation, fullName) {
    if (designation.match(/^\d+$/)) {
        return designation
    }
    try {
        const [_, letter, number] = designation.match(/^([A-Za-z\.]+)(0[0-9])?$/)

        let theDesignation = ""
        if (designationTranslation[letter]) {
            theDesignation = designationTranslation[letter]
        } else if (letter.length === 1) {
            theDesignation = letter
        }

        if (!theDesignation) {
            throw new TypeError("Could not determine the letter part")
        }

        if (number) {
            theDesignation += decToSuper(number[1])
        }

        return theDesignation
    } catch (e) {
        warning(`Could not convert designation ${designation} in '${fullName}': ${e}`)
        return designation
    }
}

const constellationTranslation = {
    And: "Andromedae",
    Aql: "Aquilae",
    Aqr: "Aquarii",
    Ara: "Arae",
    Ari: "Arietis",
    Aur: "Aurigae",
    Boo: "Boötis",
    Cae: "Caeli",        
    Cap: "Capricorni",
    Car: "Carinae",
    Cen: "Centauri",
    Cep: "Cephei",
    Cet: "Ceti",
    Cha: "Chamaeleontis",
    Cir: "Circini",
    CMa: "Canis Majoris",
    Col: "Columbae",
    Com: "Comae Berenices",
    CrA: "Coronae Australis",
    CrB: "Coronae Borealis",
    Cnc: "Cancri",
    Crt: "Crateris",
    Cru: "Crucis",
    Crv: "Corvi",
    CVn: "Canum Venaticorum",
    Cyg: "Cygni",
    Del: "Delphini",
    Dor: "Doradus",
    Dra: "Draconis",
    Eri: "Eridani",
    Equ: "Equulei",
    For: "Fornacis",
    Gem: "Geminorum",
    Gru: "Guis",
    Her: "Herculis",
    Hor: "Horologii",
    Hya: "Hydrae",
    Hyi: "Hydri",
    Ind: "Indi",
    Lac: "Lacertae",
    Leo: "Leonis",
    Lep: "Leporis",
    Lib: "Librae",
    LMi: "Leonis Minoris",
    Lup: "Lupi",
    Lyn: "Lyncis",
    Men: "Mensae",
    Mus: "Muscae",
    Oct: "Octantis",
    Oph: "Ophiuchi",
    Ori: "Orionis",
    Pav: "Pavonis",
    Peg: "Pegasi",
    Per: "Persei",
    Phe: "Phoenicis",
    Pic: "Pictoris",
    PsA: "Piscis Austrini",
    Psc: "Piscium",
    Pup: "Puppis",
    Ret: "Reticuli",
    Scl: "Sculptoris",
    Sco: "Scorpii",
    Ser: "Serpentis",
    Sge: "Sagittae",
    Tau: "Tauri",
    TrA: "Trianguli Australis",
    Tri: "Trianguli",
    Tuc: "Tucanae",
    UMa: "Ursae Majoris",
    Vir: "Virginis",
    Vel: "Velorum",
}

function convertConstellation(constellation, fullName) {
    if (constellationTranslation[constellation]) {
        return constellationTranslation[constellation]
    }

    warning(`Could not convert constellation ${constellation} in '${fullName}'`)
    return constellation
}

function convertTwinStar(twinStar, fullName) {
    twinStar = twinStar.trim()
    if (twinStar !== "A" && twinStar !== "B") {
        warning(`Could not convert constellation ${twinStar} in '${fullName}'`)
    }
    return twinStar
}


function convertHumanName(name) {
    if (name.startsWith("HD ")) {
        return name.trim()
    }
    if (name.startsWith("NAME ")) {
        return name.substr(5).trim()
    }

    if (name.startsWith("* ")) {
        const match = name.match(/^\* ([A-Za-z0-9\.]+) ([A-Za-z]+)( [A-Z])?$/)
        if (!match) {
            warning(`${name} did not match the known pattern for classifications`)
            return [name, null]
        }
        const [_, designation, constellation, twinStar] = match

        let theName = `${convertDesignation(designation, name)} ${convertConstellation(constellation, name)}`
        if (twinStar) {
            theName += ` ${convertTwinStar(twinStar)}`
        }
        
        return theName
    }

    warning(`${name} should have a human-name translation`)
    return name
}

function convertWikipediaId(name) {
    return name.replace(/ /g, "_").replace(/_[AB]$/, "").replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]/g, superToDec)
}

data.split("\n").forEach(line => {
    const columns = line.split(";")
    if (columns.length <= 1) { return } // not a table
    if (columns.length !== 5) {
        warning(`Expected row to contain exactly 5 columns, but got ${columns.length}: ${line}`)
        return
    }
    const [col1, col2, col3, col4, col5] = columns
    if (col1 === "---" || col1 === " # ") { return } // table formating or header

    const id = parseInt(col1)
    const name = convertHumanName(parseString(col2))
    const wikipediaId = convertWikipediaId(name)
    const [rightAscension, declination] = parseCoordinates(col3)
    const parallax = parseFloat(col4)
    const distance = parallaxToLightyears(parallax)
    if (distance < 0.1 || distance > 120) {
        warning(`Expected distance to be lower than 120 years, but got ${distance} for ${name}.`)
    }
    const magnitude = parseFloat(col5)
    if (magnitude > 6) {
        warning(`Expected magnitude to be lower than 6, so it is visible by eye, got ${magnitude} for ${name}.`)
    }

    stars.push(new CelestialFixedStar(name, rightAscension, declination, magnitude, distance, wikipediaId))
})

export default stars

export {
    convertDesignation,
    warnings
}