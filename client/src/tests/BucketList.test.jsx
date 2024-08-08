import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import BucketList from '../components/pages/BucketList';

// Mock the modules
jest.mock("../components/elements/NavBar", () => () => <div data-testid="navbar">NavBar</div>);
jest.mock("../components/elements/Footer", () => () => <div data-testid="footer">Footer</div>);
jest.mock("../components/elements/ResortsMap", () => () => <div data-testid="resorts-map">ResortsMap</div>);
jest.mock("../components/elements/MountainPreviewCard", () => ({ mountain }) => <div data-testid="mountain-preview-card">{mountain.name}</div>);

// Mock auth0
jest.mock("@auth0/auth0-react", () => ({
    useAuth0: jest.fn()
}));

// Mock useAuthToken
jest.mock("../AuthTokenContext", () => ({
    useAuthToken: jest.fn()
}));

// Mock fetching
global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
}))

describe('BucketList Component', () => {
    let mockLoginWithRedirect;

    beforeEach(() => {
        mockLoginWithRedirect = jest.fn();
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: mockLoginWithRedirect,
            logout: jest.fn()
        });
        useAuthToken.mockReturnValue({
            accessToken: 'fake-token'
        });
        global.fetch.mockClear();
    });

    test('renders NavBar and Footer', () => {
        render(<BucketList />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
    
    test('redirects to login if user is not authenticated', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            logout: jest.fn()
        });
        
        render(<BucketList />);
        await waitFor(() => {
            expect(mockLoginWithRedirect).toHaveBeenCalled();
        });
    });

    test('fetches user data when authenticated', async () => {
        const mockUserData = {
            bucketList: [
            { mountain: { id: 1, name: 'Mountain 1', region: 'Northeast' } },
            { mountain: { id: 2, name: 'Mountain 2', region: 'Rockies' } },
            ],
        };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUserData),
        });

        render(<BucketList />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/user', expect.any(Object));
        });

        expect(await screen.findByText('Mountain 1')).toBeInTheDocument();
        expect(await screen.findByText('Mountain 2')).toBeInTheDocument();
    });
});