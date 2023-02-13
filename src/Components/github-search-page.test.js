import React from 'react';
import { render, screen } from '@testing-library/react';
import { GithubSearchPage } from './github-search-page';

describe('when the GithubSearcis mounted', () => {
    beforeEach(() => render(<GithubSearchPage />))
    it('must display the title', () => {

        expect(screen.getByRole('heading', { name: /github repositores list/i })).toBeInTheDocument()
    })

    it('must be an an input text with label "filter by" field', () => {

        expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument()
    })

    it('must be a search button', () => {

        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    })
})
