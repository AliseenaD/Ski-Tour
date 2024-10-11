const API_URL = process.env.REACT_APP_API_URL;

// Submit the edit profile form functionality
export async function editProfile(name, skierType, skierLevel, accessToken) {
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
        return { success: true };
    }
    catch (error) {
        console.error("Error occurred while updating user profile", error);
    }
}

// Fetch information regarding the user
export async function getUser(accessToken) {
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
        return data;
    }
    catch (error) {
        console.log('Error fetching data: ', error);
    }
}

// Fetch a user by their id
export async function getSpecificUser(id) {
    try {
        const response = await fetch(`${API_URL}/user/${id}`);
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error occurred while fetching specific user", error);
    }
}

// Check database to see if user exists, post new if not
export async function verifyUser(accessToken) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/verify-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
        if (!response.ok) {
        throw new Error('Network response failed');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error occurred while verifying user:", error);
    }
}