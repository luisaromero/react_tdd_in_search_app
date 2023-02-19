import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Typography, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Avatar, Link, TablePagination
} from '@mui/material'; { }

const tableHeaders = ['Repository', 'stars', 'forks', 'open issues', 'updated at']



export const Content = ({ isSearchApplied }) =>
    isSearchApplied ?
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
                        <TableRow>
                            <TableCell>
                                <Avatar alt="test" src="./logo192.png" />
                                <Link href="http://localhost:3000/test">test</Link></TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={1}
                rowsPerPage={10}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
            />
        </>
        : (
            <Box display="flex" alignItems={'center'} justifyContent="center" height={400}>
                <Typography>Please provide a search option and click in the search button</Typography>
            </Box>)

export default Content

Content.propTypes = { isSearchApplied: PropTypes.bool.isRequired }