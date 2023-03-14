import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { GithubSearchPage } from './github-search-page';
import { makeFakeResponse, makeFakeRepo, getReposByList, getRepostPerPage } from '../__fixtures__/respos';
import { handlePaginated } from '../__fixtures__/handler';
import { OK_STATUS } from '../consts';


const fakeResponse = makeFakeResponse({ totalCount: 1 })

const fakeRepo = makeFakeRepo()

fakeResponse.items = [makeFakeRepo()]



const server = setupServer(
    // Describe network behavior with request handlers.
    // Tip: move the handlers into their own module and
    // import it across your browser and Node.js setups!
    rest.get('/search/repositories', (req, res, ctx) => {
        return res(
            ctx.status(OK_STATUS),
            ctx.json(fakeResponse),
        )
    }),
)



// Enable request interception.
beforeAll(() => server.listen())

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => server.close())


beforeEach(() => render(<GithubSearchPage />))


const btnSearch = () => screen.getByRole('button', { name: /search/i })


const fireEventSearch = () => fireEvent.click(btnSearch())



describe('when the GithubSearch is mounted', () => {
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
        expect(btnSearch()).not.toBeDisabled()

        fireEvent.change(screen.getByLabelText(/filter by/i), { target: { value: "test" } })

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

    it(`Each table result must contain: owner avatar image, name, stars, updated at, forks, open issues.
    It should have a link that opens in a new tab the github repository selected.`, async () => {
        fireEventSearch()
        const table = await screen.findByRole('table')

        const TableCells = within(table).getAllByRole('cell')



        expect(TableCells).toHaveLength(5)

        const [repository, stars, forks, openIssues, updatedAt] = TableCells

        const avatarImg = within(repository).getByRole('img', { name: fakeRepo.name })

        expect(avatarImg).toBeInTheDocument()

        expect(avatarImg).toHaveAttribute('src', fakeRepo.owner.avatar_url)

        expect(repository).toHaveTextContent(fakeRepo.name)
        expect(stars).toHaveTextContent(fakeRepo.stargazers_count)
        expect(forks).toHaveTextContent(fakeRepo.forks_count)
        expect(openIssues).toHaveTextContent(fakeRepo.open_issues_count)
        expect(updatedAt).toHaveTextContent(fakeRepo.updated_at)

        expect(within(table).getByText(fakeRepo.name).closest('a')).toHaveAttribute('href', fakeRepo.html_url)




    })

    it('must display the total results number of the search and the current number of results.', async () => {
        fireEventSearch()

        await screen.findByRole('table')

        expect(screen.getByText(/1–1 of 1/)).toBeInTheDocument()

    })

    it('results size per page select/combobox with the options: 30, 50, 100. The default is 30.', async () => {
        fireEventSearch()

        await screen.findByRole('table')

        expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument()

        fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))

        //name rows per page its included in material ui library and listbox too

        const listbox = screen.getByRole('listbox', { name: /rows per page/i })

        const options = within(listbox).getAllByRole('option')

        const [option30, option50, option100] = options

        expect(option30).toHaveTextContent(30)
        expect(option50).toHaveTextContent(50)
        expect(option100).toHaveTextContent(100)


    })

    it('must exist the Next and previous pagination buttons', async () => {
        fireEventSearch()

        await screen.findByRole('table')

        //previous page and next page are in material ui for default

        const previousPage = screen.getByRole('button', { name: /previous page/i })

        expect(previousPage).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument()

        //if i am in the page 1 , the previous page will be disabled

        expect(previousPage).toBeDisabled()

    })

})

describe('when the developer does a search without results', () => {
    it('must show a empty state message : you search has no results', async () => {
        server.use(rest.get('/search/repositories', (req, res, ctx) =>
            res(
                ctx.status(OK_STATUS),
                ctx.json(makeFakeResponse({})
                ),
            )
        ))

        fireEventSearch()

        await waitFor(() => expect(screen.getByText(/you search has no results/i)).toBeInTheDocument())

        expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
})


describe('when the developer types on filter by and does a search', () => {
    it('must display the ralated repos', async () => {
        const internalFakeResponse = makeFakeResponse()
        const expectedRepo = getReposByList({ name: 'laravel' })[0]
        //setup mock server

        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(OK_STATUS),

                    ctx.json({
                        ...internalFakeResponse,
                        items: getReposByList({ name: req.url.searchParams.get('q') })
                    }),
                ),
            ),
        )

        // type a word in a input filter
        fireEvent.change(screen.getByLabelText(/filter by/i), { target: { value: 'laravel' } })
        // click on search
        fireEventSearch()

        const table = await screen.findByRole('table')

        expect(table).toBeInTheDocument()

        const TableCells = within(table).getAllByRole('cell')

        const [repository] = TableCells
        //in cell repository the name must should the type of languaje search in this case laravel

        expect(repository).toHaveTextContent(expectedRepo.name)



    })
})

describe('when the developer does a search and selects 50 rows per page', () => {
    it('must fetch a new search and display 50 rows results on the table', async () => {
        //config mock server response
        server.use(
            rest.get('/search/repositories', handlePaginated
            ),
        )

        //click search 
        fireEventSearch()

        // expect 30 per page
        expect(await screen.findByRole('table')).toBeInTheDocument()

        expect(await screen.findAllByRole('row')).toHaveLength(31)
        // select 50 per page
        fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))
        fireEvent.click(screen.getByRole('option', { name: '50' }))

        // expect 50 rows length
        await waitFor(() =>
            expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled(), { timeout: 3000 },
        )
        expect(screen.getAllByRole('row')).toHaveLength(51)


    }, 6000)
})

describe.only('when the developer clicks on search and then on next page button', () => {
    it('must display the next repositories page', async () => {
    })
})
