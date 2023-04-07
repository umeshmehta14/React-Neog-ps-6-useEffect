import React, { useState, useEffect } from "react";

// Create a React component that calls the video api and display all the details of the video on the screen. And on click of add label button, add a label property to the object and display the details on the screen

export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/getvideo") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            videos: {
              title: "The Power of Habit",
              thumbnail: "https://picsum.photos/250/130",
              views: 1000000,
              likes: 50000,
            },
          },
        });
      } else {
        reject({
          status: 404,
          message: "Video not found.",
        });
      }
    }, 2000);
  });
};
const Question9 = () => {
  const [showLabel, setShowLabel] = useState(false);
  const [videosData, setVideosData] = useState({});
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [userLabel, setUserLabel] = useState("");
  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/getvideo");
      setVideosData(response.data.videos);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const ChangeName = () => {
    setVideosData({ ...videosData, Label: userLabel });
    setClicked(!clicked);
    setShowLabel(true);
  };
  const inputHandler = (event) => {
    setUserLabel(event.target.value);
  };
  return (
    <>
      <p>{loading && "...Loading"}</p>
      <div>
        {!loading && (
          <>
            <img src={videosData.thumbnail} alt="Currently not availabel" />
            <p>
              <strong>Title:</strong>
              {videosData.title}
            </p>
            <p>
              <strong>Views:</strong>
              {videosData.views}
            </p>
            <p>
              <strong>Likes:</strong>
              {videosData.likes}
            </p>
            <p>
              {showLabel ? <strong>Label:</strong> : ""}
              {clicked ? (
                <input
                  disabled={!clicked}
                  value={userLabel}
                  onChange={inputHandler}
                />
              ) : (
                videosData.Label
              )}
            </p>
          </>
        )}
      </div>
      <button
        style={{ border: clicked ? "2px solid black" : "" }}
        onClick={ChangeName}
      >
        {clicked ? "Save Label" : " Add Label"}
      </button>
    </>
  );
};
export default Question9;
