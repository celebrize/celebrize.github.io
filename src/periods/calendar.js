const TimePeriod = require('../domain/time_period')

const days = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number))
    return date
}, "calendar days")

const weeks = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number) * 7)
    return date
}, "calendar weeks")

const months = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() + Number(number))
    return date
}, "calendar months")

const years = new TimePeriod((now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))
    return date
}, "calendar years")

module.exports = {
    days,
    weeks,
    months,
    years,
}