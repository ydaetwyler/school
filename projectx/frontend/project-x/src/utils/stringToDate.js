const stringToDate = (string) => {
    let dateString = string
    dateString = dateString.split(".")
    const ISOFormat = new Date(parseInt(dateString[2]),parseInt(dateString[1])-1,parseInt(dateString[0]))

    return ISOFormat.toISOString()  
}

export default stringToDate