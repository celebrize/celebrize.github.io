const PeriodGenerator = require('../domain/period_generator')
const GeneratedDate = require('../domain/generated_date')

const days = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number))

    const genDate = new GeneratedDate(date, "days")
    genDate.addTags("days")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
})

const weeks = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number) * 7)

    const genDate = new GeneratedDate(date, "weeks")
    genDate.addTags("weeks")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
})

const months = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() + Number(number))

    const genDate = new GeneratedDate(date, "months")
    genDate.addTags("months")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
}, "")

const years = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))

    const genDate = new GeneratedDate(date, "years")
    genDate.addTags("years")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
}, "years")

module.exports = {
    days,
    weeks,
    months,
    years,
}