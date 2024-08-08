import React, { useEffect, useState } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../elements/NavBar";
import ExploreHeader from "../elements/ExploreHeader";
import '../../style/Mountains.css';
import { GoSearch } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import RegionMountains from "../elements/RegionMountains";
import ResortsMap from "../elements/ResortsMap";
import Footer from "../elements/Footer";

export default function Mountains() {
    const { isAuthenticated } = useAuth0();
    const { accessToken } = useAuthToken();
    const [mountains, setMountains] = useState([]);
    const [userData, setUserData] = useState(null); // Set the user data 
    const [northeast, setNortheast] = useState([]); // Northeast mountains
    const [midWest, setMidwest] = useState([]); // Midwest mountains
    const [midAtlantic, setMidAtlantic] = useState([]); // Mid-Atlantic
    const [rockies, setRockies] = useState([]); // Rockies mountains
    const [west, setWest] = useState([]); // West mountains
    const [europe, setEurope] = useState([]); // Europe mountains
    const [oceania, setOceania] = useState([]); // Oceania mountains
    const [canada, setCanada] = useState([]); // Canada mountains
    const [southAmerica, setSouthAmerica] = useState([]); // South American mountains
    const [asia, setAsia] = useState([]);
    const [searchText, setSearchText] = useState(''); // For search 
    const [searchButton, setSearchButton] = useState(false); // For if search button should be present or not
    const [searchMountains, setSearchMountains] = useState([]); // For mountains searched
    const [hasSearched, setHasSearched] = useState(false); // If search has been accomplished
    const API_URL = process.env.REACT_APP_API_URL;

    // Array of all regions as objects to map
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

    // Update user data
    useEffect(() => {
        if (isAuthenticated && accessToken) {
            fetchUserData();
        }
    }, [isAuthenticated, accessToken]);

    // Set search button to true if there is text in search bar
    useEffect(() => {
        if (searchText && searchButton) {
            return;
        }
        if (searchText) {
            setSearchButton(true);
        }
        else {
            setSearchButton(false);
        }
    }, [searchText]);

    // Clear search results
    useEffect(() => {
        if (!searchText) {
            setHasSearched(false);
            setTimeout(() => {
                setSearchMountains([]);
            }, 400);
        }
    }, [searchText]);

    // Get the mountains upon page load
    useEffect(() => {
        getMountains();
    },[]);

    // Filter the mountains each time the mountains change
    useEffect(() => {
        filterMountains();
    }, [mountains]);

    // Fetch user data
    async function fetchUserData() {
        try {
            const response = await fetch(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            });
            if (!response.ok) {
                throw new Error ('Network response failed');
            }
            const data = await response.json();
            setUserData(data);
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
            const filtered = mountains.filter(item => item.region === filterRegions[i]);
            filterFunction[i](filtered);
        }
    }

    // Get the mountains to be used on page
    async function getMountains() {
        try {
            const mountainInfo = await fetch(`${API_URL}/mountains`);
            if (!mountainInfo.ok) {
                throw new Error("Network response did not work");
            }
            const mountainsList = await mountainInfo.json();
            setMountains(mountainsList);
        }
        catch(error) {
            console.log(error);
        }
    } 

    // A function that takes the inputted value from search bar and searches for corresponding mountain
    function handleSearch() {
        const searchName = searchText.toLowerCase();
        setSearchMountains(mountains.filter(mountain => mountain.name.toLowerCase().includes(searchName)));
        setHasSearched(true);
    }

    // Handle when enter is pressed on search
    function handleEnterPress(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // Clear everything off search
    function handleDelete() {
        setHasSearched(false);
        setSearchText('');
        setTimeout(() => {
            setSearchMountains([]);
        }, 400);
    }

    return (
        <>
            <NavBar userData={userData} />
                <div className="mountain-page-content">
                <ExploreHeader />
                <div className="search-bar-container">
                    <GoSearch className="search-icon" size={25} />
                    <input 
                        className="search-bar" 
                        type="text" 
                        placeholder="Search mountains" 
                        value={searchText} 
                        onChange={(e)=>{setSearchText(e.target.value)}} 
                        onKeyDown={handleEnterPress}
                    />
                    {hasSearched ? <IoClose className={`search-button ${searchButton ? '' : 'invisible'}`} size={25} onClick={handleDelete} /> 
                    : <FaArrowRight className={`search-button ${searchButton ? '' : 'invisible'}`} size={25} onClick={handleSearch} /> }
                </div>
                <div className="results-container">
                    <div className={`search-results ${hasSearched ? ' active' : ''}`}>
                        {searchMountains ? (
                            <RegionMountains className="search-mountains" mountains={searchMountains} />
                        ) : <p>No mountains match your search</p>}
                    </div>
                </div>
                <div className="map-content">
                    <ResortsMap regions={regions} />
                </div>
                <Footer />
            </div>
        </>
    );
}