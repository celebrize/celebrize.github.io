import PeriodGenerator from '../domain/period_generator'
import GeneratedPeriod from '../domain/generated_period'

const days = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number))

    const genDate = new GeneratedPeriod(date, "days", 1)
    genDate.addTags("days")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
})

const weeks = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number) * 7)

    const genDate = new GeneratedPeriod(date, "weeks", 1.2)
    genDate.addTags("weeks")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
})

const months = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() + Number(number))

    const genDate = new GeneratedPeriod(date, "months", 1.1)
    genDate.addTags("months")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
}, "")

const years = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))

    const genDate = new GeneratedPeriod(date, "years", 1)
    genDate.addTags("years")
    genDate.setPrecision(PeriodGenerator.DAYS)
    return genDate
}, "years")

export {
    days,
    weeks,
    months,
    years,
}