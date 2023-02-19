import React, { useState } from 'react';
import { Content } from './content/index';
import {
    Typography, TextField, Button, Container, Grid, Box
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



    return (
        <Container>
            <Box my={2}>
                <Typography component="h1" variant="h3">github repositores list</Typography>
            </Box>

            <Grid container spacing={2} justify="space-between">
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="filter by" id="filterBy" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button fullWidth disabled={isSearching} onClick={hanldeClick} variant="contained" color="primary">Search</Button>
                </Grid>
            </Grid>
            <Box my={4}>
                <Content isSearchApplied={isSearchApplied} />
            </Box>

        </Container >
    )
}

export default GithubSearchPage
