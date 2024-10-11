import { useEffect, useState } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import '../../style/Pages/Home.css';
import { editProfile, verifyUser } from "../../utility/UserApi";

export default function VerifyUser() {
  const [showNameForm, setShowNameForm] = useState(false); // If name form should be displayed
  const [name, setName] = useState('');
  const [skierType, setSkierType] = useState('');
  const [skierLevel, setSkierLevel] = useState('');
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function checkUser() {
      // make a call to our API to verify the user in our database, if it doesn't exist we'll insert it into our database
      // finally we'll redirect the user to the /app route
      const result = await verifyUser(accessToken);
      if (result.name === result.email) {
        setShowNameForm(true);
      }
      // TODO: redirect here to where the user should go after verifying their account
      if (result.auth0Id && result.name !== result.email) {
        navigate("/");
      }
    }

    if (accessToken) {
      checkUser();
    }
  }, [accessToken, navigate]);

  // Update user profile information, then navigate to home page
  async function handleSubmit(e) {
    // Do nothing if form isn't complete
    if (!name || !skierType || !skierLevel) {
      window.alert("Cannot leave any portion of the form blank!");
      return;
    }
    e.preventDefault();
    try {
      const result = await editProfile(name, skierType, skierLevel, accessToken);
      if (result && result.success) {
        setShowNameForm(false);
        navigate('/');
      }
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
          <form className="start-form" onSubmit={handleSubmit}>
            <label className="start-label" htmlFor="name">Your name:</label>
              <input className="start-select" id="start-text" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required></input>
            <label className="start-label" htmlFor="skierType">Skier or Snowboarder?</label>
              <select className="start-select" id="skierType" value={skierType} onChange={(e) => setSkierType(e.target.value)} required>
                <option value="">--Please choose an option--</option>
                <option value="Ski">Skier</option>
                <option value="Snowboard">Snowboarder</option>
              </select>
            <label className="start-label" htmlFor="skierLevel">Skier level:</label>
              <select className="start-select" id="start-level" value={skierLevel} onChange={(e) => setSkierLevel(e.target.value)} required>
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
