import React, { useState, useEffect } from 'react'
// Create a React component that calls the socialMedia profile api and when the page is loaded show details of the user and a button follow along with the name of the user on the button. On click of that increase the followers count by one and disable the button.


export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/profile') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            profile: {
              name: 'John',
              age: 30,
              gender: 'male',
              email: 'john@example.com',
              occupation: 'Software Engineer',
              followers: 450,
              followedBy: 400,
            },
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Profile not found.',
        })
      }
    }, 2000)
  })
}
const Question10 = () => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true);
    const [click, setClick] = useState(false);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/profile");
            setUserData(response.data.profile);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const HandleFollowers = () => {
        setUserData({...userData, followers:(userData.followers + 1)})
        setClick(true);
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <div>
        {
            <>
            <h1>Name:{userData.name}</h1>
            <p><strong>Age:</strong>{userData.age}</p>
            <p><strong>Gender:</strong>{userData.gender}</p>
            <p><strong>Email:</strong>{userData.email}</p>
            <p><strong>Occupation:</strong>{userData.occupation}</p>
            <p><strong>Followers:</strong>{userData.followers}</p>
            <p><strong>Followed By:</strong>{userData.followedBy}</p>
            </>
        }
      </div>
      <button disabled={click} onClick={HandleFollowers}>Follow { userData.name}</button>
      
    </>
  )
}

export default Question10
