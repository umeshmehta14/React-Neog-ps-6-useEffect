import React,{useState, useEffect} from 'react'
// Create a React component that calls the userProfile api and list the details of the user when the page loads. Create a button saying Update name and on click of that button, change the name of the user.

export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/profile') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            profiles: {
              name: 'John',
              age: 30,
              gender: 'male',
              email: 'john@example.com',
              occupation: 'Software Engineer',
            },
          },
        })
      } else {
        reject({
          status: 404,
          message: 'User Profile not found.',
        })
      }
    }, 2000)
  })
}
const Question8 = () => {
    const [profilesData, setProfilesData] = useState({})
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [changedName, setChangedName] = useState("john");
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/profile");
            setProfilesData(response.data.profiles);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const ChangeName = () => {
        if(clicked)
        {
            setProfilesData({...profilesData, name:changedName})
        }
        else{
            setChangedName(profilesData.name);
        }
        setClicked(!clicked);
    }
    const inputHandler = (event)=>{
        setChangedName(event.target.value);
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <div>
        {!loading && <>
            <p>{clicked ?<input disabled={!clicked} value={changedName} onChange={inputHandler}/>: profilesData.name}</p>
            <p>{profilesData.email}</p>
            <p>{profilesData.age}</p>
            <p>{profilesData.gender}</p>
            <p>{profilesData.occupation}</p>
        </>
        }
      </div>
      <button style={{border: clicked ?"2px solid black":""}} onClick={ChangeName}>{clicked ?"Save changes":" Update Name"}</button>
      
    </>
  )
}

export default Question8
