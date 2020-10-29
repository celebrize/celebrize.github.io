const TimePeriod = require('../domain/time_period')

const seconds = new TimePeriod((now, number) => {
    const date = new Date()
    date.setTime(now.getTime() + Number(number)*1000)
    return date
}, "seconds")

const minutes = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setMinutes(date.getMinutes() + Number(number))
    return date
}, "minutes")

const hours = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setHours(date.getHours() + Number(number))
    return date
}, "hours")

module.exports = {
    seconds,
    minutes,
    hours,
}