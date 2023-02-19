import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Typography, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Avatar, Link,
} from '@mui/material'; { }


export const Content = ({ isSearchApplied }) =>
    isSearchApplied ?
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Repository</TableCell>
                        <TableCell>stars</TableCell>
                        <TableCell>forks</TableCell>
                        <TableCell>open issues</TableCell>
                        <TableCell>updated at</TableCell>
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
        : (
            <Box display="flex" alignItems={'center'} justifyContent="center" height={400}>
                <Typography>Please provide a search option and click in the search button</Typography>
            </Box>)

export default Content

Content.propTypes = { isSearchApplied: PropTypes.bool.isRequired }