import { nanoid } from 'nanoid'

const createFamily = async (args, Family, User) => {    
    try {
        const user = new User({
            hash: nanoid(),
            userEmail: nanoid(),
            userName: nanoid(),
            password: nanoid()
        })

        const newUser = await user.save()

        const { familyName } = args
        const family = new Family({
            familyName
        })
        
        const newFamily = await family.save()

        newFamily.familyMembers.push(newUser.id)

        await newFamily.save()

        newUser.family = newFamily.id

        await User.findByIdAndUpdate(newUser._id, {
            family: newFamily.id
        })

        return user.hash
    } catch (e) {
        console.log(`Error creating Family -> ${e}`)
        throw e
    }
}

export default createFamily