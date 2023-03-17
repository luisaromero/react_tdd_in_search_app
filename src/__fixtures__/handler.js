import { makeFakeResponse, getRepostPerPage } from './respos';
import { OK_STATUS } from '../consts';



export const handlePaginated = (req, res, ctx) =>
    res(
        ctx.status(OK_STATUS),

        ctx.json({
            ...makeFakeResponse({ totalCount: 1000 }),
            items: getRepostPerPage({
                currentPage: Number(req.url.searchParams.get('page')),
                perPage: Number(req.url.searchParams.get('per_page'))
            })
        }),
    )

export default { handlePaginated }