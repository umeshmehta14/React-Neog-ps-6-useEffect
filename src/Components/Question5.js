import React,{useState, useEffect} from 'react'
// Create a react component that calls the social media api when the page is loaded completely and display all the posts on the screen. And on click of show bakery button, show only the posts with category as bakery.


export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/posts') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            posts: [
              {
                caption: 'Delicious chocolate cake recipe',
                src: 'https://picsum.photos/300/301',
                views: 1000,
                likes: 100,
                category: 'Bakery',
              },
              {
                caption: '5-minute breakfast ideas',
                src: 'https://picsum.photos/300/300',
                views: 500,
                likes: 50,
                category: 'Food',
              },
              {
                caption: "The best bread recipe you'll ever taste",
                src: 'https://picsum.photos/300/302',
                views: 2000,
                likes: 200,
                category: 'Bakery',
              },
              {
                caption: '10 DIY home decor ideas',
                src: 'https://picsum.photos/300/303',
                views: 100,
                likes: 10,
                category: 'DIY',
              },
              {
                caption: 'Healthy snacks for work',
                src: 'https://picsum.photos/300/304',
                views: 300,
                likes: 30,
                category: 'Food',
              },
              {
                caption: 'How to make sourdough bread at home',
                src: 'https://picsum.photos/300/305',
                views: 1500,
                likes: 150,
                category: 'Bakery',
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Post not found.',
        })
      }
    }, 2000)
  })
}

const Question5 = () => {
    const [postsData, setPostsData] = useState([])
    const [postsData2, setPostsData2] = useState([])
    const [loading, setLoading] = useState(true);
    const [showBakery, setShowBakery] = useState(true);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/posts");
            setPostsData(response.data.posts);
            setPostsData2(response.data.posts);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const ShowBakeryProducts = () => {
        if(showBakery)
        {
            const filteredData = postsData.filter(({category})=> category !== "Bakery");
            setPostsData(filteredData);
            setShowBakery(false);
        }
        else{
            setPostsData(postsData2);
            setShowBakery(true);
        }
    }
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <div className="container">
    {
        postsData.map(({caption, src, views,likes})=>{
            return<span>
                <img src={src} alt="" height="200px" width="200px"/>
                <p>{caption}</p>
                <p> <strong>Views:</strong>{views} </p>
                <p> <strong>Likes:</strong>{likes} </p>

            </span>
        })
    }
      </div>
      <button onClick={ShowBakeryProducts}>Show Bakery</button>
      
    </>
  )
}

export default Question5
