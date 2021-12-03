import React from 'react'

const NewFamily = () => {

    return (
        <div className="login-wrapper">
            <form>
                <label>
                    <p>Family Name</p>
                    <input type="text" />
                </label>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default NewFamily