import { useEffect, useState } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import '../../style/Home.css';

export default function VerifyUser() {
  const [showNameForm, setShowNameForm] = useState(false); // If name form should be displayed
  const [name, setName] = useState('');
  const [skierType, setSkierType] = useState('');
  const [skierLevel, setSkierLevel] = useState('');
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function verifyUser() {
      // make a call to our API to verify the user in our database, if it doesn't exist we'll insert it into our database
      // finally we'll redirect the user to the /app route
      const data = await fetch(`${process.env.REACT_APP_API_URL}/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = await data.json();

      if (user.name === user.email) {
        setShowNameForm(true);
      }
      // TODO: redirect here to where the user should go after verifying their account
      if (user.auth0Id && user.name !== user.email) {
        navigate("/");
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  // Update user profile information, then navigate to home page
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
              name,
              skierType,
              skierLevel
          })
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      setShowNameForm(false);
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showNameForm ? (
        <div className="name-form">
          <p id="form-title">One last thing...</p>
          <form className="form-content" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">Your name:</label>
              <input className="form-select" id="text-input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required></input>
            <label className="form-label" htmlFor="skierType">Skier or Snowboarder?</label>
              <select className="form-select" id="skierType" value={skierType} onChange={(e) => setSkierType(e.target.value)} required>
                <option value="">--Please choose an option--</option>
                <option value="Ski">Skier</option>
                <option value="Snowboard">Snowboarder</option>
              </select>
            <label className="form-label" htmlFor="skierLevel">Skier level:</label>
              <select className="form-select" id="skierLevel" value={skierLevel} onChange={(e) => setSkierLevel(e.target.value)} required>
                <option value="">--Please choose an option--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            <button className="form-submit" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
