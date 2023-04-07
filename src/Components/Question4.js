import React,{useState, useEffect} from 'react'
// Create a React component that calls the video library api when the page is loaded completely and display all the videos on the screen. And on click of delete button, delete the first video in the list.

const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/videos') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            videos: [
              {
                title: 'The Power of Habit',
                thumbnail: 'https://picsum.photos/200/130',
                views: 1000000,
                likes: 50000,
              },
              {
                title: 'How to Code in JavaScript',
                thumbnail: 'https://picsum.photos/200/135',
                views: 500000,
                likes: 25000,
              },
              {
                title: '10 Minute Yoga for Beginners',
                thumbnail: 'https://picsum.photos/200/131',
                views: 250000,
                likes: 15000,
              },
              {
                title: 'Introduction to Machine Learning',
                thumbnail: 'https://picsum.photos/200/132',
                views: 100000,
                likes: 10000,
              },
              {
                title: 'The Science of Cooking',
                thumbnail: 'https://picsum.photos/200/133',
                views: 75000,
                likes: 5000,
              },
              {
                title: 'The Art of Public Speaking',
                thumbnail: 'https://picsum.photos/200/134',
                views: 50000,
                likes: 2500,
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Videos not found.',
        })
      }
    }, 2000)
  })
}

const Question4 = () => {
    const [videoData, setVideoData] = useState([])
    const [loading, setLoading] = useState(true);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/videos");
            setVideoData(response.data.videos);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const HandleDelete = () => {
        const filteredData = videoData.filter((data, index)=> 0 !== index);
        setVideoData(filteredData);
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <h1>Playlist</h1>
      <div className='video-container'>
        {
            videoData.map(({title, thumbnail , views, likes})=>{
                return <span>
                <img src={thumbnail} alt="Not available" />
                <p>{title}</p>
                <p> <strong>Views:</strong>{views} </p>
                <p> <strong>Likes:</strong>{likes} </p>
                </span>
            })
        }
      </div>
      <button onClick={HandleDelete}>Delete First Video</button>
      
    </>
  )
}

export default Question4
