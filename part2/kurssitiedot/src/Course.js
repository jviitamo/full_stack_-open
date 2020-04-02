import React from 'react'

const Header = ({name}) => (
        <div>
          <h1>{name}</h1>
        </div>
    )


const Content = ({parts}) => {
  const partList = parts.map((part) => <Part key={part.id} part={part} />)
  return (
       <div>
         {partList}
       </div>
    )
  }


const Total = ({parts}) =>  {
  return (
      <div>
            Number of exercises {parts.reduce( (s, p) => s + p.exercises, 0)}
      </div>  
  )
}

const Part = ({part}) => (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )

 const Course = ({course}) => (
     <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
     </div>
 )   



export default Course

