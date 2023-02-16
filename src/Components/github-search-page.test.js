import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GithubSearchPage } from './github-search-page';

beforeEach(() => render(<GithubSearchPage />))


describe('when the GithubSearcis mounted', () => {
    it('must display the title', () => {

        expect(screen.getByRole('heading', { name: /github repositores list/i })).toBeInTheDocument()
    })

    it('must be an an input text with label "filter by" field', () => {

        expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument()
    })

    it('must be a search button', () => {

        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    })

    it('show the initial state message “Please provide a search option and click in the search button”', () => {

        expect(screen.getByText(/please provide a search option and click in the search button/i)).toBeInTheDocument()
    })
})

describe('when the developer does a search', () => {
    it('The search button should be disabled until the search is done', async () => {
        const btnSearch = screen.getByRole('button', { name: /search/i })
        expect(btnSearch).not.toBeDisabled()
        fireEvent.click(btnSearch)
        expect(btnSearch).toBeDisabled()
        await waitFor(() => expect(btnSearch).not.toBeDisabled())

    })
    it('The The data should be displayed as a sticky table', async () => {
        const btnSearch = screen.getByRole('button', { name: /search/i })
        fireEvent.click(btnSearch)
        await waitFor(() =>
            expect(screen.queryByText(/please provide a search option and click in the search button/i)).not.toBeInTheDocument())


    })
})
