import React from 'react'
import { Card } from 'react-bootstrap'
import classes from './HeaderCard.module.css'

const HeaderCard = ({className, children}) => {
    const finalClasses = `${className} ${classes.card}`
    return (
        <Card className={finalClasses}>
            {children}
        </Card>
    )
}

export default HeaderCard
