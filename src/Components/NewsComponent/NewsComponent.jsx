import React from "react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

export default function NewsComponent() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=793c64e59347455d9cf560ca5dc95c80"
    )
      .then((response) => response.json())
      .then((data) => setNews([...data.articles]));
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
            height: "calc(100vh - 120px)",
            overflow: "scroll",
            position: "relative",
          }}
        >
          {news.map((singleNews) => (
            <a
              href={singleNews.url}
              className="d-flex justify-content-center"
              style={{ textDecoration: "none", cursor: "default" }}
            >
              <div
                className="media d-flex align-items-center p-3 my-3"
                style={{
                  width: "90%",
                  border: "1px solid black",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <img
                  className="mr-3"
                  src={singleNews.urlToImage}
                  alt="Generic placeholder image"
                  width="100px"
                  height="100px"
                />
                <div className="media-body">
                  <h5 className="mt-0">{singleNews.title}</h5>
                  <span className="text-dark">{singleNews.description}</span>
                  <div style={{ fontSize: "15px", color: "gray" }}>
                    {format(singleNews.publishedAt)}
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
