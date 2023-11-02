import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { Container,Grid,CardMedia ,Card,Typography,CardContent} from "@mui/material";
import axios from "axios";

//define youtube api key and fine result
const API_KEY = "AIzaSyAkVV43DZdvCg6y0Ov0iO3qmf-DnpnP3og";

const MAX_RESULTS = 50;

const Videoplay = () => {
  //Initialize state variabke useState hook
  const [videos,setVideos]=useState([]);
  const [currentVideo,setCurrentVideo]=useState(null);
  // const [autoplay,setAutoplay]=useState(false);

  //useRef -> to hold reference to youtube player

  const playerRef = useRef(null);

  //To fetch the data
  useEffect(()=>{
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
    )
    .then((response)=>{
        const videoItems=response.data.items;
        console.log(videoItems);
        if(videoItems.length>0){
            setVideos(videoItems);
            setCurrentVideo(videoItems[0].id.videoId);
        }else{
            console.log("No videos Found");
        }
    }).catch((error)=>{
        console.error("Error in fetching data ",error);
    })
},[])

//define functionality for autoplay
const videoOptions={
    width:"640",
    height:"360",
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },

}


//Function to handle card->play selected video
const handleCardClick=(videoId)=>{
    setCurrentVideo(videoId);
    // setAutoplay(true);//make youtube autoplay when new video is selected
}


return(
    <Container>
        <h1 style={{color:"white"}}>Video Play</h1>
        <Grid container spacing={3}>
            {videos.map((video)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id.videoId}>
                {/* create a card for each video  */}
                <Card onClick={()=>handleCardClick(video.id.videoId)}>
                    <CardMedia 
                      component="img"
                      height="140"
                      image={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {video.snippet.title}
                        </Typography>
                      </CardContent>
                </Card>
                </Grid>
            ))}
        </Grid>
        <div>
            {currentVideo&&(
                <YouTube
                 videoId={currentVideo}
                 opts={videoOptions}
                 onReady={(event)=>{
                    playerRef.current=event.target
                 }} 
                 />
            )}
        </div>

    </Container>
)
}

export default Videoplay;