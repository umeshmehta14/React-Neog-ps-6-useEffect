import React, {useState, useEffect} from 'react'

// Create a React component that calls the todo api and display the todos in an unordered list and show the todos as a list. The todo should display a heading with a little description of what that todo is about. Under that, it should display all the tasks to be done as a list.


const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/todos') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            todos: [
              {
                title: 'Go Outside',
                desc: 'lorem ipsum dolor sit amit',
                todos: ['shopping', 'cricket', 'walking'],
              },
              {
                title: "Let's Work",
                desc: 'lorem ipsum dolor sit amit',
                todos: ['Feature update', 'Team Meet', 'Code Walkthrough'],
              },
              {
                title: 'Home Work',
                desc: 'lorem ipsum dolor sit amit',
                todos: ['Fix tap', 'Wedding function'],
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Todo list not found.',
        })
      }
    }, 2000)
  })
}

const Question2 = () => {
  const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/todos");
            setTodos(response.data.todos);
            
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <ul>
        {
          todos.map(({title,desc, todos}, i)=>{
            return <><li key={i}>
              <h1>{title}:{desc}</h1>
              <ol>
                {
                todos.map((item)=>{
                  return <li>{item}</li>
                })
              }
              </ol>
            </li>
            <hr />
            </>
          })
        }
      </ul>
    </div>
  )
}

export default Question2

