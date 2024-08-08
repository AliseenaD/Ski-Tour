import React from "react";
import ProfilePage from "../components/pages/ProfilePage";
import { render, screen, waitFor } from '@testing-library/react';
import { useAuth0 } from "@auth0/auth0-react";

// Mock external components
jest.mock('../components/elements/NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../components/elements/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/elements/UserMountainReview', () => ({ review }) => <div data-testid="review">{review.title}</div>);
jest.mock('../components/elements/EditProfileForm', () => () => <div data-testid="edit-form">Edit Form</div>);

let mockIsOwnProfile = false;
// Mock Auth0
jest.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        isAuthenticated: true,
        user: { sub: mockIsOwnProfile ? 'auth0|123' : 'autho|456' },
        getAccessTokenSilently: jest.fn().mockResolvedValue('fake_token'),
    }),
}));

// Mock AuthTokenContext
jest.mock('../AuthTokenContext', ()=> ({
    useAuthToken: () => ({ accessToken: 'fake_token' }),
}))

// Mock useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
}));

global.fetch = jest.fn();

describe("Profile Page Tests", () => {
    const mockUser = {
        id: 1,
        name: 'Sam Buck',
        skierType: 'Ski',
        skierLevel: 'intermediate',
        reviews: [
            { id: 1, title: 'Review 1', mountain: { name: 'Mountain 1' } },
            { id: 2, title: 'Review 2', mountain: { name: 'Mountain 2' } }
        ]
    };

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        });
        mockIsOwnProfile = false;
    });

    test('Renders user profile information correctly', async () => {
        render(<ProfilePage />);
        await waitFor(() => {
            expect(screen.getByText('Sam Buck')).toBeInTheDocument();
            expect(screen.getByText('Skier type: Skier')).toBeInTheDocument();
            expect(screen.getByText('Skier level: Intermediate')).toBeInTheDocument();
        });
    });

    test('Ensure reviews are presented on screen', async () => {
        render(<ProfilePage />);
        await waitFor(() => {
            expect(screen.getByText('Review 1')).toBeInTheDocument();
        });
    });

    test('Ensure trash logo and settings logo is not present when viewing another user profile', async () => {
        mockIsOwnProfile = false;
        render(<ProfilePage />);
        await waitFor(() => {
            expect(screen.getByText('Sam Buck')).toBeInTheDocument();
        });

        const trashIcon = screen.queryByTestId('delete-icon');
        expect(trashIcon).not.toBeInTheDocument();
    });
});