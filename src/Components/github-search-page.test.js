import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
    const btnSearch = () => screen.getByRole('button', { name: /search/i })
    const fireEventSearch = () => fireEvent.click(btnSearch())
    it('The search button should be disabled until the search is done', async () => {
        expect(btnSearch()).not.toBeDisabled()
        fireEventSearch()
        expect(btnSearch()).toBeDisabled()
        await waitFor(() => expect(btnSearch()).not.toBeDisabled())

    })

    it('The The data should be displayed as a sticky table', async () => {
        fireEventSearch()
        await waitFor(() =>
            expect(screen.queryByText(/please provide a search option and click in the search button/i)).not.toBeInTheDocument())
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('The table headers must be contain Repository, stars, forks, open issues and updated at', async () => {
        fireEventSearch()
        const table = await screen.findByRole('table')

        const TableHeaders = within(table).getAllByRole('columnheader')


        const [repository, stars, forks, openIssues, updatedAt] = TableHeaders

        expect(TableHeaders).toHaveLength(5)
        expect(repository).toHaveTextContent(/repository/i)
        expect(stars).toHaveTextContent(/stars/i)
        expect(forks).toHaveTextContent(/forks/i)
        expect(openIssues).toHaveTextContent(/open issues/i)
        expect(updatedAt).toHaveTextContent(/updated at/i)


    })
})
