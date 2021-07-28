import React from 'react';
import './topbar.css';
import {
  Search,
  Person,
  Chat,
  Notifications,
  ChatBubbleOutline,
  WbIncandescentOutlined,
} from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Cancel, ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [searchUser, setSearchUser] = useState([]);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        if (text != '') {
          const btn = document.querySelector('#btnclass');
          btn.classList.remove('d-none');
          setFocused(true);
          const res = await axios.get(
            `https://codecial-server.herokuapp.com/api/users/allUsers?pattern=${text}`
          );
          setSearchUser(res.data);
        }
      } catch (err) {
        console.log('Topbar File Error');
      }
    };
    getUser();
  }, [text]);

  const removeText = () => {
    const btn = document.querySelector('#btnclass');
    setSearchUser([]);
    setFocused(false);
    setText('');
    btn.classList.add('d-none');
  };

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    history.push('/register');
    window.location.reload();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row height150 bg-primary">
          <div className="col-4 d-flex">
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                paddingTop: '8px',
              }}
            >
              <span className="pl-3 pt-2 text-white font-weight-bold h2">
                Codecial
              </span>
            </Link>
          </div>

          <div
            className="col-4 pt-1 bg-white"
            style={{ borderRadius: '30px', margin: '8px 0px' }}
          >
            <div className="d-flex align-items-center">
              <Search style={{ fontSize: '25px' }} />
              <input
                placeholder=" Search for friends"
                className="form-control border-0"
                onChange={(e) => setText(e.target.value)}
                onFocus={(e) => setText(e.target.value)}
                value={text}
              />
              {text && (
                <span
                  className="border-0 bg-white"
                  id="btnclass"
                  onClick={removeText}
                >
                  <Cancel />
                </span>
              )}
            </div>
            <div
              style={{
                width: '400px',
                zIndex: '1',
                position: 'absolute',
                left: '40px',
                backgroundColor: 'white',
              }}
            >
              {focused ? (
                searchUser.length > 0 ? (
                  <ul className="list-group " style={{ listStyle: 'none' }}>
                    {searchUser.map((user) => (
                      <li
                        key={user._id}
                        className="mt-2 mx-2  hoverName"
                        style={{ cursor: 'pointer' }}
                      >
                        <Link
                          to={`/profile/${user?.username}`}
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                user && user.profilePicture
                                  ? PF + user.profilePicture
                                  : PF + 'noUserImage.png'
                              }
                              alt=""
                              style={{ height: '32px', width: '32px' }}
                              className="rounded-circle ml-2 my-2"
                            ></img>
                            <span className="ml-2">{user.username}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-group " style={{ listStyle: 'none' }}>
                    <li className="m-2">No user Found</li>
                  </ul>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="col-2 pt-3 text-white">
            <Link
              className="text-white"
              to="/"
              style={{ textDecoration: 'none' }}
            >
              Timeline
            </Link>
          </div>

          <div className="col-2 d-flex">
            <div
              className="d-flex justify-content-around pt-3 text-white"
              style={{ width: '70%' }}
            >
              <Badge badgeContent={1} color="error">
                <Person />
              </Badge>
              <Badge badgeContent={1} color="error">
                <Chat />
              </Badge>
              <Badge badgeContent={1} color="error">
                <Notifications />
              </Badge>
            </div>
            <div style={{ width: '10%' }}></div>
            <div className="pt-2">
              {/* <Link to={`/profile/${user?.username}`}>
                <img
                  src={
                    user && user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "noUserImage.png"
                  }
                  alt=""
                  style={{ height: "32px", width: "32px" }}
                  className="rounded-circle"
                ></img>
              </Link> */}

              <a
                className="text-white"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div
                  className="d-flex align-items-center justify-content-center hoverImg"
                  style={{
                    width: '60px',
                    height: '40px',
                    borderRadius: '15px',
                  }}
                >
                  <img
                    src={
                      user && user.profilePicture
                        ? PF + user.profilePicture
                        : PF + 'noUserImage.png'
                    }
                    alt=""
                    style={{ height: '32px', width: '32px' }}
                    className="rounded-circle"
                  ></img>
                  <ArrowDropDownIcon />
                </div>
              </a>
              <div
                className="dropdown-menu mt-2 dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <div className="text-center font-weight-bold">
                  <Link
                    to={`/profile/${user?.username}`}
                    style={{
                      textDecoration: 'none',
                      color: 'rgb(28, 62, 218)',
                    }}
                  >
                    View Profile
                  </Link>
                </div>
                <div className="dropdown-divider"></div>
                <div className="mx-1">
                  <button
                    className="form-control btn btn-danger d-flex align-items-center"
                    onClick={onLogout}
                  >
                    <ExitToApp className="ml-2" />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
