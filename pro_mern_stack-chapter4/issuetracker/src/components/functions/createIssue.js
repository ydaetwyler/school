const generateId = issues => {
    const maxId = issues.length > 0
        ? Math.max(...issues.map(n => n.id))
        : 0
    return maxId + 1
}

const createIssue = (issues, newIssueTitle, currentUser) => {
    const id = generateId(issues)
    const newIssue = {
        id,
        status: "new",
        effort: 0,
        created: new Date(Date.now()),
        title: newIssueTitle,
        owner: currentUser
    }
    return newIssue
}

export default createIssue