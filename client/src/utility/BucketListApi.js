const API_URL = process.env.REACT_APP_API_URL;

// Function that removes an item from an individuals bucket list
export async function removeFromBucketList(id, accessToken) {
    try {
        const response = await fetch(`${API_URL}/bucket-list/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error ('Failed to update bucket-list');
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error occurred while removing item from bucket list:', error);
    }
}

// Function that adds an item to an individuals bucket list
export async function addToBucketList(id, accessToken) {
    try {
        const response = await fetch(`${API_URL}/bucket-list/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error ('Failed to update bucket-list');
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error occurred while removing item from bucket list:', error);
    }
}