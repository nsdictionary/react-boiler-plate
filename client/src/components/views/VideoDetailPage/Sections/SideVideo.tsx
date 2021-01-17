import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const SideVideo = (props: any) => {
  const [SideVideos, setSideVideos] = useState<any>([])

  useEffect(() => {
    axios.get('/api/video/getVideos')
      .then(res => {
        if (res.data.ok) {
          // console.log(res.data.videos)
          setSideVideos(res.data.videos
            .filter((video: any) => video._id !== props.playingId))
        } else {
          alert('Failed to get Videos')
        }
      })
  }, [])

  const sideVideoItem = SideVideos.map((video: any, index: number) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div key={index} style={{display: 'flex', marginTop: '1rem', padding: '0 2rem'}}>
        <div style={{position: "relative", width: '40%', marginRight: '1rem'}}>
          <Link to={`/video/${video._id}`} style={{color: 'gray'}}>
            <img
              style={{width: '100%', height: '100%'}}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>{minutes} : {seconds}</span>
            </div>
          </Link>
        </div>

        <div style={{width: '50%'}}>
          <Link to={`/video/${video._id}`} style={{color: 'gray'}}>
            <span style={{fontSize: '1rem', color: 'black'}}>{video.title}  </span><br/>
            <span>{video.writer.name}</span><br/>
            <span>{video.views}</span><br/>
          </Link>
        </div>
      </div>
    );
  })

  return (
    <React.Fragment>
      <div style={{marginTop: '3rem'}}></div>
      {sideVideoItem}
    </React.Fragment>
  );
};

export default SideVideo;
