import React, { useState } from 'react';

import { Typography, TextField, Button, Container, Grid, Box } from '@mui/material'; { }


export const GithubSearchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchApplied, setIsSearchApplied] = useState(false);


    const hanldeClick = async () => {
        setIsSearching(true)
        await Promise.resolve()
        setIsSearchApplied(true)
        setIsSearching(false)

    }

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
            {isSearchApplied ?
                <table>
                    <thead>
                        <tr>
                            <th>Repository</th>
                            <th>stars</th>
                            <th>forks</th>
                            <th>open issues</th>
                            <th>updated at</th>
                        </tr>
                    </thead>
                </table>
                : (
                    <Box display="flex" alignItems={'center'} justifyContent="center" height={400}>
                        <Typography>Please provide a search option and click in the search button</Typography>
                    </Box>)}
        </Container >
    )
}

export default GithubSearchPage
