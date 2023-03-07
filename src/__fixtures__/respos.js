import repos30Paginated from './repos-30-paginated.json'
import repos50Paginated from './repos-50-paginated.json'

export const makeFakeResponse = ({ totalCount = 0 } = {}) => ({
    total_count: totalCount,
    items: []
})

export const makeFakeRepo = ({ name = 'django-rest-framework-reactive',
    id = '56757919', } = {}) => (
    {
        id,
        name,
        owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/2120224?v=4',
        },
        html_url: 'https://github.com/genialis/django-rest-framework-reactive',
        updated_at: '2020-10-24',
        stargazers_count: 58,
        forks_count: 9,
        open_issues_count: 0,
    }
)

const resposData = ['go', 'freeCodeCamp', 'laravel', 'Python', 'Java']

const reposList = resposData.map(name => makeFakeRepo({ name, id: name }))

export const getReposByList = ({ name }) => reposList.filter(repo => repo.name === name)

//repos30Paginated array of arrays , in each array is a page , has 3 pages with 30 objects

export const getRepostPerPage = ({ currentPage, perPage }) => {
    console.log({ currentPage, perPage })
    return perPage === 30 ? repos30Paginated[currentPage] : repos50Paginated[currentPage]
}

export default { makeFakeResponse, makeFakeRepo, getReposByList, getRepostPerPage }