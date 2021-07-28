import { CompassCalibrationOutlined } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Online({ onlineUsers, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        'https://codecial-server.herokuapp.com/api/users/friends/' + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((frnd) => onlineUsers.includes(frnd._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `https://codecial-server.herokuapp.com/api/conversations/find/${currentId}/${user._id}`
      );
      console.log(res.data);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ul className="list-group">
      {onlineFriends.map((o) => (
        <li
          className="d-flex align-items-center my-2 pl-2 hoverName"
          onClick={() => handleClick(o)}
          style={{
            height: '40px',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          <div className="relativePosition">
            <img
              src={
                o.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'noUserImage.png'
              }
              alt="empty"
              style={{ height: '30px', width: '30px' }}
              className="rounded-circle"
            ></img>
            <span className="rightbarOnline"></span>
          </div>
          <div style={{ width: '15px' }}></div>
          <span>{o.username}</span>
        </li>
      ))}
    </ul>
  );
}
