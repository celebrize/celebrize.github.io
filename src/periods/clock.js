const seconds = (now, number) => {
    const date = new Date()
    date.setTime(now.getTime() + Number(number)*1000)
    return date
}
seconds.help = "seconds"

const minutes = (now, number) => {
    const date = new Date(now)
    date.setMinutes(date.getMinutes() + Number(number))
    return date
}
minutes.help = "minutes"

const hours = (now, number) => {
    const date = new Date(now)
    date.setHours(date.getHours() + Number(number))
    return date
}
hours.help = "hours"

module.exports = {
    seconds,
    minutes,
    hours,
}