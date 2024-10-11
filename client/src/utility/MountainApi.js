const API_URL = process.env.REACT_APP_API_URL;

// Function to get the images of the mountain
export async function getMountainImage(picture) {
    try {
        const response = await fetch(`${API_URL}/api/image-url?path=${(picture)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        } 
    catch (error) {
        console.error("Error fetching image URL:", error);
    }
}

// Get all mountains information
export async function getMountainsInfo() {
    try {
        const response = await fetch(`${API_URL}/mountains`);
        if (!response.ok) {
            throw new Error("Network response did not work");
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error occurred while getting mountain information", error);
    }
}

// Gets a specific moutain's information 
export async function getSpecificMountain(mountainId) {
    try {
        const response = await fetch(`${API_URL}/mountains/${mountainId}`);
        if (!response.ok) {
            throw new Error("Network response did not work");
        }
        const information = await response.json();
        return information;
    }
    catch (error) {
        console.error("Error occurred while getting mountain information", error);
    }
}