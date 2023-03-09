import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Typography, Box, TablePagination
} from '@mui/material'; { }

export const Content = ({ isSearchApplied, repostList, children }) => {

    const renderWithBox = (cb) => (
        <Box display="flex" alignItems={'center'} justifyContent="center" height={400}>
            {cb}
        </Box>
    )


    if (isSearchApplied && !!repostList.length) {
        return children

    }
    if (isSearchApplied && !repostList.length) {
        return renderWithBox(<Typography>You search has no results</Typography>)

    }
    return renderWithBox(<Typography>Please provide a search option and click in the search button</Typography>
    )
}

export default Content

Content.propTypes = {
    isSearchApplied: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    repostList: PropTypes.arrayOf(PropTypes.object),
}