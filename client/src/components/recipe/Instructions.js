import React from 'react'
import { ListGroup } from 'react-bootstrap';

const Instructions = ({instructions}) => {
    return (
        <>
            <hr />
            <h3>Instructions</h3>
            <hr />
            <ol>
                {instructions.map(({instruction})=>(
                    <li>{instruction}</li>
                ))}
            </ol>
        </>
    )
}

export default Instructions
