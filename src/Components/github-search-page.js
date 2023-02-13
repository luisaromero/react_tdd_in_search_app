import React from 'react';

import { Typography, TextField, Button, Container, Grid } from '@mui/material'; { }


export const GithubSearchPage = () => (
    <Container>
        <Typography component="h1" variant="h3">github repositores list</Typography>
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <TextField label="filter by" id="filterBy" />
            </Grid>
            <Grid item xs={12}>
                <Button>Search</Button>
            </Grid>
        </Grid>
    </Container>
)

export default GithubSearchPage
