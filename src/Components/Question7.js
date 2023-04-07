import React, {useEffect, useState} from 'react'
// Create a React component that calls the projects api and list all the projects when the page loads with titles and description. Create buttons saying “Show Details” for each project. On click of the button show title, description, technologies, completed of that project only.

export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/projects') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            projects: [
              {
                title: 'E-commerce Website',
                description:
                  'A fully functional e-commerce website with shopping cart and checkout functionality.',
                technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
                completed: false,
              },
              {
                title: 'Weather App',
                description:
                  'A web application that displays the current weather and forecast for a given location.',
                technologies: ['React', 'Node.js', 'OpenWeatherMap API'],
                completed: true,
              },
              {
                title: 'Task Manager',
                description:
                  'A web application that allows users to create, manage and track tasks.',
                technologies: ['Vue.js', 'Firebase'],
                completed: false,
              },
              {
                title: 'Blog Website',
                description:
                  'A blog website that allows users to create, read, update and delete blog posts.',
                technologies: ['React JS', 'MongoDB'],
                completed: true,
              },
              {
                title: 'Mobile Game',
                description:
                  'A mobile game developed for iOS and Android platforms.',
                technologies: ['Unity', 'C#'],
                completed: false,
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Projects not found.',
        })
      }
    }, 2000)
  })
}

const Question7 = () => {
    const [projectsData, setProjectsData] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedData, setSelectedData] = useState();
    const [isClick, setIsClick] = useState(false);
    const [clickedButton, setClickedButton] = useState();
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/projects");
            setProjectsData(response.data.projects);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const ShowDetails = (index) => {
        const filteredData = projectsData.find((e, i)=> i===index);
        setClickedButton(index);
        setSelectedData(filteredData);
        setIsClick(true);
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <div>
        {
            projectsData.map(({title,description},index)=>{
                return <div>
                    <p><strong>Name:</strong>{title}</p>
                    <p><strong>Description:</strong>{description}</p>
                    <button style={{border: clickedButton=== index ?"2px solid black":""}} onClick={()=>ShowDetails(index)}>Show Details</button>
                    <hr />
                </div>
            })
        }
      </div>
      <h1>Projects Details</h1>
      <div>
        
        {isClick && <>
            <p><strong>Name:</strong>{selectedData.title}</p>
      <p><strong>Description:</strong>{selectedData.description}</p>
      <p><strong>Technologies:</strong>{selectedData.technologies}</p>
      <p><strong>Completed:</strong>{selectedData.completed?"true":"false"}</p></>}
      
      </div>
    </>
  )
}

export default Question7
