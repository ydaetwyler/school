const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]

const getDate = isodate => {
    const d = new Date(isodate)

    const year = d.getFullYear()
    const date = d.getDate()
    const monthName = months[d.getMonth()]
    const dayName = days[d.getDay()]
    
    return `${dayName}, ${date} ${monthName} ${year}`
}

export default getDate