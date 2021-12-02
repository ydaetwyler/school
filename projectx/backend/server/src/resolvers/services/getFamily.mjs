const getFamily = async (familyHash, Family) => {
    try {
        const familyFetched = await Family.findOne({ hash: familyHash })
            .populate('eventList')
        
        return familyFetched.toJSON()

    } catch (e) {
        console.log(`Error fetching ${Item}, -> ${e}`)
    }
}

export default getFamily