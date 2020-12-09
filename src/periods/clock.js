import Period from '../domain/period'
import GeneratedPeriod from '../domain/generated_period'

const seconds = new Period((now, number) => {
    const date = new Date()
    date.setTime(now.getTime() + Number(number)*1000)
    
    const genDate = new GeneratedPeriod(date, "seconds", 1)
    genDate.addTags("seconds")
    return genDate
})

const minutes = new Period((now, number) => {
    const date = new Date(now)
    date.setMinutes(date.getMinutes() + Number(number))
    
    const genDate = new GeneratedPeriod(date, "minutes", 1)
    genDate.addTags("minutes")
    return genDate
})

const hours = new Period((now, number) => {
    const date = new Date(now)
    date.setHours(date.getHours() + Number(number))
    
    const genDate = new GeneratedPeriod(date, "hours", 1)
    genDate.addTags("hours")
    return genDate
})

export {
    seconds,
    minutes,
    hours,
}