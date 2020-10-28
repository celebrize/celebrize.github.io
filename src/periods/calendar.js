const days = (now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number))
    return date
}
days.help = "calendar days"

const weeks = (now, number) => {
    const date = new Date(now)
    date.setDate(now.getDate() + Number(number) * 7)
    return date
}
weeks.help = "calendar weeks"

const months = (now, number) => {
    const date = new Date(now)
    date.setMonth(date.getMonth() + Number(number))
    return date
}
months.help = "calendar months"

const years = (now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))
    return date
}
years.help = "calendar years"

module.exports = {
    days,
    weeks,
    months,
    years,
}