import React from 'react';
import Online from '../Online/Online';
import ProfileRightbar from '../ProfileRightbar/ProfileRightbar';
import './rightbar.css';
import { useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { username } = useParams();
  useEffect(() => {
    socket.current = io('https://codecial-socket.herokuapp.com');
  }, [socket]);

  useEffect(() => {
    socket.current.emit('addUser', currentUser._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        currentUser.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [socket]);

  const HomeRightbar = () => {
    return (
      <div
        className="container-fluid"
        style={{
          height: 'calc(100vh - 55px)',
          overflow: 'scroll',
        }}
      >
        {/* <div className="row">
          <div className="d-flex my-3 mx-2">
            <div>
              <img src={`${PF}gift.png`} height="40px" width="40px"></img>
            </div>
            <div className="ml-1">
              <span>
                <b>Deep</b> and <b>3 other Friend</b> has birthday today
              </span>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="ml-1 mt-3 mb-1">
            <span>
              <b>Advertisment :</b>
            </span>
          </div>
          <div className="my-1 ml-2">
            <img
              src={`${PF}add.png`}
              alt=""
              width="95%"
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="my-1 ml-3">
            <span className="font-weight-bold">Online Friends</span>
            <ul className="list-group">
              {onlineUsers.map((user) => (
                <Online key={user._id} userId={user} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {username ? (
        <ProfileRightbar key={user._id} user={user} />
      ) : (
        <HomeRightbar />
      )}
    </>
  );
}
