import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Typography, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Avatar, Link, TablePagination
} from '@mui/material'; { }

const tableHeaders = ['Repository', 'stars', 'forks', 'open issues', 'updated at']



export const Content = ({ isSearchApplied, repostList, rowsPerPage, setRowsPerPage }) => {

    const renderWithBox = (cb) => (
        <Box display="flex" alignItems={'center'} justifyContent="center" height={400}>
            {cb}
        </Box>
    )

    const handleChangeRowsPerPage = ({ target: { value } }) => setRowsPerPage(value)

    if (isSearchApplied && !!repostList.length) {
        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map(name =>
                                    <TableCell key={name}>{name}</TableCell>
                                )}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repostList.map(({ name,
                                id,
                                stargazers_count: stargazersCount,
                                forks_count: forksCount,
                                open_issues_count: openIssuesCount,
                                updated_at: updatedAt,
                                html_url: htmlUrl,
                                owner: { avatar_url: avatarUrl }
                            }) => (
                                <TableRow key={id}>
                                    <TableCell>
                                        <Avatar alt={name} src={avatarUrl} />
                                        <Link href={htmlUrl}>{name}</Link></TableCell>
                                    <TableCell>{stargazersCount}</TableCell>
                                    <TableCell>{forksCount}</TableCell>
                                    <TableCell>{openIssuesCount}</TableCell>
                                    <TableCell>{updatedAt}</TableCell>

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[30, 50, 100]}
                    component="div"
                    count={1}
                    rowsPerPage={rowsPerPage}
                    page={0}
                    onPageChange={() => { }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        )
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
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired
}