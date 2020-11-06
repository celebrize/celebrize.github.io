const PeriodGenerator = require('../domain/period_generator')
const GeneratedDate = require('../domain/generated_date')

const seconds = new PeriodGenerator((now, number) => {
    const date = new Date()
    date.setTime(now.getTime() + Number(number)*1000)
    
    const genDate = new GeneratedDate(date, "seconds")
    genDate.addTags("seconds")
    return genDate
})

const minutes = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setMinutes(date.getMinutes() + Number(number))
    
    const genDate = new GeneratedDate(date, "minutes")
    genDate.addTags("minutes")
    return genDate
})

const hours = new PeriodGenerator((now, number) => {
    const date = new Date(now)
    date.setHours(date.getHours() + Number(number))
    
    const genDate = new GeneratedDate(date, "hours")
    genDate.addTags("hours")
    return genDate
})

module.exports = {
    seconds,
    minutes,
    hours,
}