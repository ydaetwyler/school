import React from 'react'

const Display = ({ numbers }) => (
    <div>
        <ul>
            {numbers.map(numb =>
                <li key={numb}>
                    {numb}
                </li>
            )}
        </ul>
    </div>
)

export default Display