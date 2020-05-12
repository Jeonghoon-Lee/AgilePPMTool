import React from 'react'

const CategoryTitle = props => {
  return (
    <div className="card text-center mb-2">
      <div className={`card-header ${props.color} text-white`}>
        <h3>{props.title}</h3>
      </div>
    </div>
  )
}

export default CategoryTitle
