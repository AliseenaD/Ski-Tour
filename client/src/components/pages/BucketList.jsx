import React, { useEffect, useState } from "react";
import NavBar from "../elements/MultiPageElements/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../../AuthTokenContext";
import '../../style/Pages/BucketList.css';
import Footer from "../elements/MultiPageElements/Footer";
import ResortsMap from "../elements/MultiPageElements/ResortsMap";
import MountainPreviewCard from "../elements/MultiPageElements/MountainPreviewCard";
import { getUser } from "../../utility/UserApi";

export default function BucketList() {
    const { loginWithRedirect } = useAuth0();
    const [bucketList, setBucketList] = useState(null); // User's bucketlist 
    const { accessToken } = useAuthToken();
    const { isAuthenticated } = useAuth0();
    const [user, setUser] = useState(null);
    const [northeast, setNortheast] = useState([]); // Northeast mountains
    const [midWest, setMidwest] = useState([]); // Midwest mountains
    const [midAtlantic, setMidAtlantic] = useState([]); // Mid-Atlantic
    const [rockies, setRockies] = useState([]); // Rockies mountains
    const [west, setWest] = useState([]); // West mountains
    const [europe, setEurope] = useState([]); // Europe mountains
    const [oceania, setOceania] = useState([]); // Oceania mountains
    const [canada, setCanada] = useState([]); // Canada mountains
    const [southAmerica, setSouthAmerica] = useState([]); // South American mountains
    const [asia, setAsia] = useState([]); // Asian mountains
    const API_URL = process.env.REACT_APP_API_URL;

    // Regions
    const regions = [
        {
            region: northeast,
            name: 'American Northeast',
            coordinates: [42.0, -71.0]
        },
        {
            region: midWest,
            name: 'American Midwest',
            coordinates: [41.0, -89.0]
        },
        {
            region: midAtlantic,
            name: 'American MidAtlantic',
            coordinates: [39.0, -77.0]
        },
        {
            region: rockies,
            name: 'American Rockies',
            coordinates: [39.5, -106.0]
        },
        {
            region: west,
            name: 'American West',
            coordinates: [37.0, -119.0]
        },
        {
            region: europe,
            name: 'Europe',
            coordinates: [50.0, 10.0]
        },
        {
            region: oceania,
            name: 'Oceania',
            coordinates: [-25.0, 140.0]
        },
        {
            region: canada,
            name: 'Canada',
            coordinates: [56.0, -106.0]
        },
        {
            region: southAmerica,
            name: 'South America',
            coordinates: [-15.0, -60.0]
        },
        {
            region: asia,
            name: 'Asia',
            coordinates: [36.2, 138.2]
        }
    ];

    // Fetch user data if logged in
    useEffect(() => {
        if (isAuthenticated && accessToken) {
            fetchUserData();
        }
    }, [isAuthenticated, accessToken]);

    useEffect(() => {
        if (bucketList) {
            filterMountains();
        }
    }, [user])

    // Fetch user data
    async function fetchUserData() {
        try {
            const result = await getUser(accessToken);
            if (result) {
                setUser(result);
                setBucketList(result.bucketList);
            }
        }
        catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    // A function that will filter each mountain into their own respective regional array
    function filterMountains() {
        const filterFunction = [setNortheast, setMidwest, setMidAtlantic, setRockies, setWest, setEurope, setOceania, setCanada, setSouthAmerica, setAsia];
        const filterRegions = ['Northeast', 'Midwest', 'Mid-Atlantic', 'Rockies', 'West', 'Europe', 'Oceania', 'Canada', 'South America', 'Asia'];
        for (let i=0; i<filterFunction.length; i++) {
            const filtered = bucketList.filter(item => item.mountain.region === filterRegions[i]);
            const mountainOnly = filtered.map((item) => item.mountain);
            filterFunction[i](mountainOnly);
        }
    }

    // If user not logged in, provide log in page
    if (!isAuthenticated) {
        loginWithRedirect();
    }

    return (
        <>
        <div className="bucketlist-content">
            <NavBar userData={user} />
            <div className="bucketlist-section">
                <div className="bucketlist-scroll">
                    <div className="scroll-title-container">
                        <p id="scroll-title">Your Bucket List</p>
                    </div>
                    <div className="scroll-list">
                        {
                            bucketList && bucketList.length > 0 ? (
                                <ul className="bucket-mountains">
                                    {bucketList.map((item) => (
                                        <li key={item.mountain.id}>
                                            <MountainPreviewCard className="bucket-cards" mountain={item.mountain} />
                                        </li>
                                    ))}
                                </ul>
                            ) : <p id="bucketlist-empty-message">No mountains in your bucketlist yet...</p>
                        }
                    </div>  
                </div>
                <div className="bucketlist-map">
                    <ResortsMap regions={regions} />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}