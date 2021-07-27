import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import Rightbar from "../../Components/Rightbar/Rightbar";
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { CameraAlt, CodeSharp, Edit } from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [fileProfile, setFileProfile] = useState(null);
  const username = useParams().username;

  const [changeUsername, setChangeUsername] = useState(currentUser.username);
  const [changeCity, setChangeCity] = useState(currentUser.city);
  const [changeFrom, setChangeFrom] = useState(currentUser.from);
  const [changeRelationship, setChangeRelationship] = useState(
    currentUser.relationship
  );
  const [usernameError, setUsernameError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.log("Profile File Error");
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const updateProfile = async () => {
      try {
        const updatedUser = {
          ...user,
          profilePicture: fileProfile.name,
        };
        if (fileProfile) {
          const dataP = new FormData();
          const filenameP = Date.now() + fileProfile.name;
          dataP.append("name", filenameP);
          dataP.append("file", fileProfile);
          updatedUser.profilePicture = filenameP;
          try {
            await axios.post("/upload", dataP);
          } catch (err) {
            console.log(err);
          }

          const res = await axios.put(`/users/${user._id}`, updatedUser);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          history.push(`/profile/${currentUser.username}`);
          window.location.reload();
        }
      } catch (err) {
        console.log("Profile File Error");
      }
    };
    updateProfile();
  }, [fileProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (changeUsername.length < 3 || changeUsername.length > 20) {
      return setUsernameError("Username length must be 3 to 20");
    } else {
      try {
        const fetchedUser = await axios.get(
          `/users/editProfile?username=${changeUsername}`
        );
        if (
          fetchedUser.data._id === currentUser._id ||
          fetchedUser.data === "User not Found"
        ) {
          //grant permission
          const newUser = {
            ...currentUser,
            username: changeUsername,
            city: changeCity,
            from: changeFrom,
            relationship: parseInt(changeRelationship),
          };
          const updatedUser = await axios.put(
            `/users/${currentUser._id}`,
            newUser
          );
          localStorage.removeItem("user");
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(newUser));
          setUsernameError(null);
          setChangeUsername(currentUser.username);
          setChangeCity(currentUser.city);
          setChangeFrom(currentUser.from);
          setChangeRelationship(currentUser.relationship);
          window.alert(updatedUser.data);
          history.push(`/profile/${newUser.username}`);
          window.location.reload();
        } else {
          setUsernameError("This username is already exist");
        }
      } catch (err) {
        console.log("Edit Profile File Error");
      }
    }
  };

  const resetInfo = () => {
    setUsernameError(null);
    setChangeUsername(currentUser.username);
    setChangeCity(currentUser.city);
    setChangeFrom(currentUser.from);
    setChangeRelationship(currentUser.relationship);
  };

  const handleUsername = (e) => {
    setChangeUsername(e.target.value);
  };

  return (
    <>
      <div>
        <Topbar />
        <div className="container-fuild">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col-9">
              <div className="mb-10">
                <div className="mainImage">
                  <img
                    src={
                      user.coverPicture ? PF + user.coverPicture : PF + "16.png"
                    }
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </div>
                <div className="subImage">
                  <img
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "noUserImage.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  ></img>
                </div>
                {username === currentUser.username && (
                  <div
                    className="changeProfile "
                    style={{ width: "50px", height: "50px" }}
                  >
                    <label
                      htmlFor="fileProfile"
                      className="d-flex mt-2 align-items-center justify-content-center"
                      style={{ cursor: "pointer" }}
                    >
                      <CameraAlt />
                      <input
                        className="d-none"
                        id="fileProfile"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => setFileProfile(e.target.files[0])}
                      ></input>
                    </label>
                  </div>
                )}
              </div>
              <div style={{ height: "70px" }}></div>
              <div className="d-flex align-items-center justify-content-center text-center mb-2 h4 font-weight-bold">
                <div className="ml-4">{user.username}</div>
                {username === currentUser.username && (
                  <div>
                    <div
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      data-backdrop="static"
                      className="ml-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(216, 214, 214)",
                        cursor: "pointer",
                      }}
                    >
                      <Edit />
                    </div>
                    <div
                      class="modal fade"
                      id="exampleModalCenter"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5
                              className="modal-title d-flex align-items-center"
                              id="exampleModalCenter"
                            >
                              Edit Profile &nbsp;
                              <Edit />
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={resetInfo}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <form
                            style={{ fontSize: "18px", fontWeight: "" }}
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            <div class="modal-body">
                              <div
                                className={
                                  usernameError
                                    ? "row d-flex align-items-center"
                                    : "mb-3 row d-flex align-items-center"
                                }
                              >
                                <div className="col-4 text-left">
                                  Username<span className="text-danger">*</span>
                                </div>
                                <div className="col-8">
                                  <input
                                    value={changeUsername}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleUsername(e)}
                                  />
                                </div>
                              </div>
                              {usernameError && (
                                <div className="mb-2 row d-flex align-items-center">
                                  <div className="col-4 text-left"></div>
                                  <div
                                    className="col-8 text-danger"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {usernameError}
                                  </div>
                                </div>
                              )}

                              <div className="form-group row d-flex align-items-center">
                                <div className="col-4 text-left">City</div>
                                <div className="col-8">
                                  <input
                                    value={changeCity}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      setChangeCity(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group row d-flex align-items-center">
                                <div className="col-4 text-left">From</div>
                                <div className="col-8">
                                  <input
                                    value={changeFrom}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      setChangeFrom(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group row d-flex align-items-center">
                                <div className="col-4 text-left">
                                  Relationship
                                </div>
                                <div className="col-8">
                                  <select
                                    value={changeRelationship}
                                    onChange={(e) =>
                                      setChangeRelationship(e.target.value)
                                    }
                                    class="form-control"
                                  >
                                    <option selected disabled>
                                      Choose..
                                    </option>
                                    <option value={1}>Married</option>
                                    <option value={2}>Unmarried</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={resetInfo}
                              >
                                Close
                              </button>
                              <button type="submit" class="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center mb-3">{user.desc}</div>
              <div className="container-fuild">
                <div className="row">
                  <div className="col-8">
                    <Feed username={username} />
                  </div>
                  <div className="col-4">
                    <Rightbar user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
