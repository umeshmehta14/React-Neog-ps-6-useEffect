import React, {useEffect, useState} from 'react'


// Create a React component that calls the habit tracker api and display only the habits which are unarchived with heading “Unarchived”. Create a show archive button and on click of show archive button show the archive habits and hide the unarchives. Change the heading of the page to “Archived” when the button is clicked.




export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/habits') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            habits: [
              {
                title: 'Drinking enough water',
                desc: 'Aim to drink 5-6L of water each day to stay hydrated',
                daysFollowed: 7,
                daysSkipped: 3,
                archived: false,
              },
              {
                title: 'Exercise',
                desc: 'Track your workouts and aim to exercise a certain number of days per week',
                daysFollowed: 10,
                daysSkipped: 4,
                archived: true,
              },
              {
                title: 'Meditation',
                desc: 'Track your daily meditation practice and try to increase the length of your sessions over time',
                daysFollowed: 30,
                daysSkipped: 7,
                archived: true,
              },
              {
                title: 'Gratitude',
                desc: 'Write down something you are grateful for each day',
                daysFollowed: 11,
                daysSkipped: 5,
                archived: false,
              },
              {
                title: 'Saving Money',
                desc: 'Track your expenses and set a goal to save a certain amount of money each month',
                daysFollowed: 40,
                daysSkipped: 15,
                archived: false,
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Habits not found.',
        })
      }
    }, 2000)
  })
}


const Question6 = () => {
    const [habitsData, setHabitsData] = useState([])
    const [archivedData, setArchivedData] = useState([])
    const [loading, setLoading] = useState(true);
    const [showArchive, setShowArchive] = useState("Unarchives");
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/habits");
            const habitsArr = response.data.habits;
            setHabitsData(habitsArr);
            setArchivedData(()=>habitsArr.filter(({archived})=> !archived ));
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleArchive = () => {
        if(showArchive === "Unarchives")
        {
            setArchivedData(()=> habitsData.filter(({archived})=> archived));
            setShowArchive("Archives");
        }
        else{
          setArchivedData(()=> habitsData.filter(({archived})=> !archived));
          setShowArchive("Unarchives");
        }
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <h1>{showArchive}</h1>
      <div>
        {
            archivedData.map(({title, desc,daysFollowed, daysSkipped})=>{
                return <>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                        <p> <strong>Days Followed:</strong>{daysFollowed} </p>
                        <p> <strong>Days Skipped:</strong>{daysSkipped} </p>
                        <hr />
                </>

            })
        }
      </div>
      <button onClick={handleArchive}>Show{" "}{showArchive === "Unarchives"?"Archives":"Unarchives"}</button>
      
    </>
  )
}

export default Question6
