import GeneratedNumber from '../domain/generated_number'
import NumberGenerator from '../domain/number_generator'

function Hex(hex, humanReadable) {
    return {
        hex,
        humanReadable
    }
}

const adjectives = [
    Hex("BAD", "bad"),
    Hex("BAAD", "bad"),
    Hex("BAAAD", "bad"),
    Hex("BAAAAD", "bad"),
    Hex("B16", "big"),
    Hex("DEAD", "dead"),
    Hex("C001", "cool"),
    Hex("0B5E55ED", "obsessed"),
    Hex("1337", "leet"),
    Hex("31337", "elite"),
    Hex("DEAF", "deaf"),
    Hex("0DD", "odd"),
]
const nouns = [
    Hex("0FF1CE", "office"),
    Hex("0FF1CE5", "offices"),
    Hex("CAFE", "cafe"),
    Hex("CAFE5", "cafes"),
    Hex("C0FFEE", "coffee"),
    Hex("C0FFEE5", "coffees"),
    Hex("C0DE", "code"),
    Hex("BEEF", "beef"),
    Hex("1CE", "ice"),
    Hex("F00D", "food"),
    Hex("F00D5", "foods"),
    Hex("BABE", "babe"),
    Hex("BABE5", "babes"),
    Hex("B105", "bios"),
    Hex("D06", "dog"),
    Hex("D00D", "dude"),
    Hex("D00D5", "dudes"),
    Hex("FA11", "fall"),
    Hex("FEED", "feed"),
    Hex("FACE", "face"),
    Hex("FACE5", "faces"),
    Hex("0B0E", "oboe"),
    Hex("1DEA", "idea"),
    Hex("1DEA5", "ideas"),
    Hex("5A1AD", "salad"),
    Hex("5EED", "seed"),
    Hex("ACCE55", "access"),
    Hex("AC1D", "acid"),
    Hex("B0A7", "boat"),
    Hex("B0A75", "boats"),
    Hex("DEED", "deed"),
    Hex("DEED5", "deeds"),
    Hex("CA55E77E", "cassette"),
    Hex("DA7ABA5E", "database"),
    Hex("CAB005E", "caboose"),
    Hex("BEA7", "beat"),
    Hex("BEA75", "beats"),
    Hex("DECAF", "decaf"),
]

const one = Hex("1", "one")
const a = Hex("A", "a")

class HexSpeakData {
    constructor(...hexes) {
        this.hexString = ""
        this.humanReadable = null
        this.tags = hexes.map(h => h.humanReadable)

        for (const hex of hexes) {
            this.hexString += hex.hex
            this.humanReadable = (this.humanReadable === null ? "" : (this.humanReadable + " ")) + hex.humanReadable
        }

        // do it in constructor to fail fast
        this.number = parseInt(this.hexString, 16)
    }

    toResult() {
        const number = new GeneratedNumber(this.number, `spells "${this.humanReadable}" in hexspeak`, 2)
        number.setLabel(`0x${this.hexString}`)
        number.addTags(...this.tags)
        return number
    }
}

const data = []

for (const adjective of adjectives) {
    data.push(new HexSpeakData(adjective))
}

for (const noun of nouns) {
    const isSingular = noun.hex.substr(-1) !== "5"

    data.push(new HexSpeakData(noun))
    if (isSingular) {

        data.push(new HexSpeakData(a, noun))
        data.push(new HexSpeakData(one, noun))
    }

    for (const adjective of adjectives) {
        data.push(new HexSpeakData(adjective, noun))
        if (isSingular) {
            data.push(new HexSpeakData(a, adjective, noun))
            data.push(new HexSpeakData(one, adjective, noun))
        }
    }
}

data.sort((a, b) => a.number - b.number)

function* hexspeak() {
    for (const hexSpeakData of data) {
        yield hexSpeakData.toResult()
    }
}

export default new NumberGenerator(hexspeak)