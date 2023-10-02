import React, { useEffect, useState } from "react";
import "../../Styles/UpdateProfile.css";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("idToken"),
            displayName: name,
            photoUrl: photo,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
       
        console.log("User profile updated successfully:", data);
      } else {
        const errorData = await response.json();
        console.log("Error updating user profile:", errorData);
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPhoto("");
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8 ",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: idToken }),
          }
        );
        const data = response.json();
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, []);

  return (
    <div>
      <div className="update">
        <p>
          "Champions don't give up; they get up, learn from their failures, and
          reach their goals"
        </p>
        <p>please complete your profile </p>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter fullName"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="photo">Profile Photo URL</label>
          <input
            type="text"
            id="photo"
            value={photo}
            placeholder="Enter photo URL"
            required
            onChange={(e) => {
              setPhoto(e.target.value);
            }}
          />
          <button>Update</button>
          <button type="danger">Cancle</button>
        </form>
       
      </div>
    </div>
  );
};

export default UpdateProfile;
