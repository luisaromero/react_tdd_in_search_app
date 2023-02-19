import React, { useState } from 'react';

import {
    Typography, TextField, Button, Container, Grid, Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar,
    Link
} from '@mui/material'; { }


export const GithubSearchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchApplied, setIsSearchApplied] = useState(false);


    const hanldeClick = async () => {
        setIsSearching(true)
        await Promise.resolve()
        setIsSearchApplied(true)
        setIsSearching(false)

    }

    const renderContent = () =>
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

    return (
        <Container>
            <Typography component="h1" variant="h3">github repositores list</Typography>
            <Grid container spacing={2} justify="space-between">
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="filter by" id="filterBy" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button fullWidth disabled={isSearching} onClick={hanldeClick} variant="contained" color="primary">Search</Button>
                </Grid>
            </Grid>
            {renderContent()}
        </Container >
    )
}

export default GithubSearchPage
