const TimePeriod = require('../domain/time_period')

const days = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number))
    return date
}, "days")

const weeks = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number) * 7)
    return date
}, "weeks")

const months = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() + Number(number))
    return date
}, "months")

const years = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))
    return date
}, "years")

module.exports = {
    days,
    weeks,
    months,
    years,
}