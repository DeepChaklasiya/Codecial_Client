import React from 'react';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import SearchIcon from '@material-ui/icons/Search';

export default function VideosComponent() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState(null);
  const [videos, setVideos] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [playVideo, setPlayVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    const setYtVideos = async () => {
      if (search !== null) {
        await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search}&key=AIzaSyBk7bBWf39XYbDoJyiqMs-jW2hs8xc18Yo&type=video&order=relevance`
        )
          .then((response) => response.json())
          .then((data) => {
            setVideos(data.items);
          });
      }
    };
    setYtVideos();
  }, [clicked]);

  const handlePlay = (video) => {
    setPlayVideo(video);
    console.log(playVideo);
    // console.log("play video", playVideo.id.videoId);
    const url = `https://www.youtube.com/embed/${playVideo?.id.videoId}`;
    setVideoSrc(url);
  };

  return (
    <>
      <div style={{ height: 'calc(100vh - 55px)', overflow: 'scroll' }}>
        <div className="d-flex justify-content-center mt-3">
          <img src={PF + 'youtube.jpeg'} height="50px" />
        </div>

        <div
          className="d-flex justify-content-between mt-2 mx-auto"
          style={{
            width: '800px',
            height: '45px',
            borderRadius: '10px',
            border: '1px solid black',
          }}
        >
          <div className="d-flex align-items-center" style={{ width: '90%' }}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for any YouTube videos"
              className="form-control border-0"
            />
          </div>
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              width: '10%',
              borderRadius: '10px',
              backgroundColor: 'gray',
              color: 'white',
            }}
            onClick={() => setClicked(!clicked)}
          >
            <SearchIcon />
          </button>
        </div>
        <div className="d-flex mt-3">
          <div
            style={{
              width: '65%',
              height: 'calc(100vh - 220px)',
              overflow: 'scroll',
            }}
          >
            {playVideo && (
              <div className="ml-4" style={{ width: '650px' }}>
                <iframe
                  width="650px"
                  allowFullScreen
                  height="400px"
                  src={videoSrc}
                />
                <div className="font-weight-bold">
                  {playVideo.snippet.title}
                </div>
                <div className="mt-3">{playVideo.snippet.description}</div>
                <div className="mt-3" style={{ fontSize: '14px' }}>
                  {format(playVideo.snippet.publishedAt)}
                </div>
              </div>
            )}
          </div>
          <div
            className="mr-2"
            style={{
              height: 'calc(100vh - 200px)',
              overflow: 'scroll',
              width: '35%',
              border: videos?.length > 0 ? '1px solid black' : '0',
            }}
          >
            {videos.map((video) => (
              <div
                className="d-flex m-2"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePlay(video)}
              >
                <div>
                  <img
                    src={video.snippet.thumbnails.high.url}
                    width="150px"
                    height="100px"
                    alt="select video to watch"
                  />
                </div>
                <div className="ml-2">
                  <div
                    style={{
                      fontSize: '14px',
                      height: '65px',
                      overflow: 'hidden',
                    }}
                  >
                    {video.snippet.title}
                  </div>
                  <div
                    style={{
                      color: 'gray',
                      fontSize: '12px',
                      height: '17px',
                      overflow: 'hidden',
                    }}
                  >
                    by {video.snippet.channelTitle}
                  </div>
                  <div
                    style={{
                      color: 'gray',
                      fontSize: '12px',
                      height: '17px',
                      overflow: 'hidden',
                    }}
                  >
                    {format(video.snippet.publishedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
