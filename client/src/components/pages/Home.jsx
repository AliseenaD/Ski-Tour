import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../../AuthTokenContext";
import NavBar from "../elements/MultiPageElements/NavBar";
import HeaderImage from "../elements/HomeElements/HeaderImage";
import ScrollableCards from "../elements/MultiPageElements/ScrollableCards";
import '../../style/Pages/Home.css';
import BucketListScroll from "../elements/MultiPageElements/BucketListScroll";
import CreateAccount from "../elements/HomeElements/CreateAccount";
import ExploreMountainsBanner from "../elements/HomeElements/ExploreMountainsBanner";
import Footer from "../elements/MultiPageElements/Footer";
import { getUser } from "../../utility/UserApi";
import { getMountainsInfo } from "../../utility/MountainApi";

export default function Home() {
  const { isAuthenticated, logout } = useAuth0();
  const { accessToken } = useAuthToken();
  const [ mountains, setMountains ] = useState([]);
  const [discoverMountains, setDiscoverMountains] = useState([]); // A list of 12 mountains for discover section
  const [popMountains, setPopMountains] = useState([]); // For the top four most popular mountains
  const [bucketList, setBucketList] = useState([]); // Get all the bucketlist items of the user as well
  const [userData, setUserData] = useState(null);
  
  // Get the mountains to pass to the different scrollables
  useEffect(() => {
    getMountains();
  }, []); 

  // Fetch user data
  useEffect(() => {
    if (accessToken && isAuthenticated && !userData) {
      fetchUserData();
    }
  }, [accessToken, isAuthenticated, userData]);

  // Sort the mountains by reviews
  useEffect(() => {
    if (mountains) {
      getMostReviewed();
    }
  }, [mountains]);

  // Assign bucket
  useEffect(() => {
    if (userData) {
      const mountains = userData.bucketList.map((item) => (item.mountain));
      setBucketList(mountains);
    }
  }, [userData]);

  // Get 12 random mountains to display on discover resorts section
  function getRandom(original) {
    let shuffled = [...original];
    for (let i=shuffled.length - 1; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const twelveMountains = shuffled.slice(0,12);
    setDiscoverMountains(twelveMountains);
  }

  function getMostReviewed() {
    const sortedMountains = mountains.sort((a, b) => b.reviews.length - a.reviews.length);
    const topMountains = sortedMountains.slice(0, 6);
    setPopMountains(topMountains);
  }

  // Function to fetch the mountain info
  async function getMountains() {
    try {
      const result = await getMountainsInfo();
      setMountains(result);
      getRandom(result);
    }
    catch(error) {
      console.error(error);
    }
  }

  // Fetch user data
  async function fetchUserData() {
    try {
        const result = await getUser(accessToken);
        if (result) {
            setUserData(result);
        }
    }
    catch (error) {
        console.log('Error fetching data: ', error);
    }
  }

  return (
    <div className="home">
      <NavBar userData={userData} />
      <HeaderImage />
      <p className="scroll-header">Discover Resorts</p>
      <ScrollableCards items={discoverMountains} />
      {isAuthenticated ? (
        <>
          <ExploreMountainsBanner />
          <BucketListScroll mountains={bucketList} />
        </>
      ) : 
        <>
          <CreateAccount className="create-account" />
          <p className="scroll-header">Popular Resorts</p>
          <ScrollableCards items={popMountains} />
        </>
      }
      <Footer className="home-footer" />
    </div>
  );
}
