import React from 'react';
import { CallReceived } from '@material-ui/icons';
import './sidebar.css';
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmarks,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from '@material-ui/icons';

import { Link } from 'react-router-dom';

import CloseFriend from '../CloseFriend/CloseFriend';
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

export default function Sidebar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `https://codecial-server.herokuapp.com/api/users/friends/${user._id}`
      );
      setFriends(res.data);
    };

    getFriends();
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: '100%',
          overflowX: 'hidden',
          height: 'calc(100vh - 55px)',
          overflow: 'scroll',
        }}
      >
        <div>
          <ul className="list-group">
            <li
              className="ml-2 mt-1 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <RssFeed />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Feed
                  </Link>
                </span>
              </div>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <Link
                to="/messenger"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="d-flex align-items-center my-2 ml-3">
                  <Chat />
                  <div style={{ width: '15px' }}></div>
                  <span>Chats</span>
                </div>
              </Link>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <Link
                to="/videos"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="d-flex align-items-center my-2 ml-3">
                  <PlayCircleFilledOutlined />
                  <div style={{ width: '15px' }}></div>
                  <span>Videos</span>
                </div>
              </Link>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <Group />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Groups
                  </Link>
                </span>
              </div>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <Link
                to="/news"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="d-flex align-items-center my-2 ml-3">
                  <Bookmarks />
                  <div style={{ width: '15px' }}></div>
                  <span>News</span>
                </div>
              </Link>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <HelpOutline />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Questions
                  </Link>
                </span>
              </div>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <WorkOutline />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Jobs
                  </Link>
                </span>
              </div>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <Event />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Events
                  </Link>
                </span>
              </div>
            </li>

            <li
              className="ml-2 mr-4 hoverDiv"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center my-2 ml-3">
                <School />
                <div style={{ width: '15px' }}></div>
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Courses
                  </Link>
                </span>
              </div>
            </li>
          </ul>

          <div
            className="my-2 ml-3 bg-primary"
            style={{ width: '40%', borderRadius: '20px' }}
          >
            <button
              class="btn btn-block btn-light"
              style={{ backgroundColor: '#D8D8D8' }}
            >
              Show More
            </button>
          </div>

          <hr style={{ margin: '20px 0' }} />
          <div className="ml-3 mb-1">
            <b>Your Friends :</b>
          </div>
          {friends.length ? (
            <ul className="list-group overflow-scroll">
              {friends.map((user) => (
                <CloseFriend key={user._id} user={user} />
              ))}
            </ul>
          ) : (
            <div className="ml-3 my-2">No Friends</div>
          )}
        </div>
      </div>
    </>
  );
}
