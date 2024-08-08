import React from "react";
import Home from "../components/pages/Home";
import { render, screen, waitFor } from '@testing-library/react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

// Mock external components
jest.mock('../components/elements/NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../components/elements/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/elements/HeaderImage', () => () => <div data-testid="headerImage">Header image</div>);
jest.mock('../components/elements/ScrollableCards', () => () => <div data-testid="scrollableCards">Scrollable cards</div>)
jest.mock('../components/elements/ExploreMountainsBanner', () => () => <div data-testid="exploreBanner">Explore banner</div>);
jest.mock('../components/elements/BucketListScroll', () => () => <div data-testid="bucketListScroll">Bucketlist scroll</div>);
jest.mock('../components/elements/CreateAccount', () => () => <div data-testid="createAccount">Create account</div>);

// Mock auth0
jest.mock("@auth0/auth0-react", () => ({
    useAuth0: jest.fn()
}));

// Mock useAuthToken
jest.mock("../AuthTokenContext", () => ({
    useAuthToken: jest.fn()
}));

// Mock fetching
global.fetch = jest.fn();

describe("Home Component", () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            logout: jest.fn()
        });
        useAuthToken.mockReturnValue({
            accessToken: null
        });
        fetch.mockClear();
    });

    test('Renders navbar, header image, scrollable cards, and footer for all users', async () => {
        render(<Home />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('headerImage')).toBeInTheDocument();
        expect(screen.getAllByTestId('scrollableCards').length).toBeGreaterThan(0);
        expect(screen.getByText('Discover Resorts')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('Renders create account component for unauthenticated users', async () => {
        render(<Home />);
        expect(screen.getByTestId('createAccount')).toBeInTheDocument();
        expect(screen.queryByTestId('exploreBanner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('bucketListScroll')).not.toBeInTheDocument();
    });

    test('Renders explore mountains banner and the bucketlist scroll for authenticated users only', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            logout: jest.fn()
        });
        useAuthToken.mockReturnValue({
            accessToken: 'fake_token'
        });
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ bucketList: [] })
        });

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByTestId('exploreBanner')).toBeInTheDocument();
            expect(screen.getByTestId('bucketListScroll')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('createAccount')).not.toBeInTheDocument();
        expect(screen.queryByText('Popular Resorts')).not.toBeInTheDocument();
    });

    test('Fetches mountains data on mount', async () => {
        const mockMountains = [{ id: 1, name: 'Mountain 1', reviews: [{ id: '1', title: 'review1' }] },
        { id: 2, name: 'Mountain 2', reviews: [{ id: '2', title: 'review2' }, { id: '3', title: 'review3' }] }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockMountains)
        });

        render(<Home />);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/mountains');
        });
    });

    test('fetches user data when authenticated', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            logout: jest.fn()
        });
        useAuthToken.mockReturnValue({
            accessToken: 'fake-token'
        });

        const mockUserData = { id: 1, name: 'Test User', bucketList: [] };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUserData)
        });

        render(<Home />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user', {
            headers: {
                Authorization: 'Bearer fake-token'
            }
            });
        });
    });
});
