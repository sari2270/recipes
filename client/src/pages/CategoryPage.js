import React from 'react'
import { useParams } from 'react-router'

const CategoryPage = () => {
    const {categoryName} = useParams()
    return (
        <>
            <div>{categoryName}</div>
        </>
    )
}

export default CategoryPage
