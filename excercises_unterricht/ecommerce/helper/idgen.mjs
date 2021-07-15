/* Post helper function */
const generateId = (cart) => {
    const maxId = cart.length > 0
        ? Math.max(...cart.map(n => n.id))
        : 0
    return maxId + 1
}

export default generateId