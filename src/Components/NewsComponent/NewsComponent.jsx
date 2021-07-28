import React from 'react';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

export default function NewsComponent() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getnews = async () => {
      await fetch(
        'http://api.mediastack.com/v1/news?access_key=b12a1343e4703f19ddee432376173d0b&countries=in'
      )
        .then((response) => response.json())
        .then((data) => {
          setNews(data.data);
        });
    };
    getnews();
  }, []);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div style={{}}>
        <div className="mt-3 d-flex justify-content-center">
          <h3>...Top News...</h3>
        </div>
        <div
          style={{
            height: 'calc(100vh - 120px)',
            overflow: 'scroll',
            position: 'relative',
          }}
        >
          {news.map((singleNews) => (
            <a
              href={singleNews.url}
              className="d-flex justify-content-center"
              style={{ textDecoration: 'none', cursor: 'default' }}
            >
              <div
                className="media d-flex align-items-center p-3 my-3"
                style={{
                  width: '90%',
                  border: '1px solid black',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                <img
                  className="mr-3"
                  src={singleNews.image}
                  alt="No image"
                  width="100px"
                  height="100px"
                />
                <div className="media-body">
                  <h5 className="mt-0">{singleNews.title}</h5>
                  <span className="text-dark">{singleNews.description}</span>
                  <div style={{ fontSize: '15px', color: 'gray' }}>
                    {format(singleNews.published_at)}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
