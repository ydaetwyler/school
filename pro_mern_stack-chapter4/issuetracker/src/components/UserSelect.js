import React from 'react'

const UserSelect = ({ users, currentUser, userChangeHandler }) => (
    <div>
        <select value={currentUser} onChange={userChangeHandler}>
            {users.map(user => 
                <option key={user} value={user}>
                    {user}
                </option>
            )}
        </select>
    </div>
)

export default UserSelect