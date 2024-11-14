const API_URL = process.env.REACT_APP_API_URL;

// Post a new review for a mountain 
export async function postReview(id, accessToken, reviewText, reviewRating, photos) {
    try {
        const response = await fetch(`${API_URL}/reviews/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: reviewText,
                rating: reviewRating,
                photos: photos
            })
        });
        if (!response.ok) {
            throw new Error('Failed to post review');
        }
        return { success: true };
    }
    catch (error) {
        console.error("Error occurred while posting a new review:", error);
    }
} 

// Function to delete a review for a mountain
export async function deleteReview(id, accessToken) {
    try {
        const response = await fetch(`${API_URL}/reviews/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to post review');
        }
        return { success: true };
    }
    catch (error) {
        console.error("Error occurred while posting a new review:", error);
    }
}