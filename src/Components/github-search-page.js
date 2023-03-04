import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Content } from './content/index';
import { getRepos } from '../services';

import {
    Typography, TextField, Button, Container, Grid, Box
} from '@mui/material'; { }


export const GithubSearchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchApplied, setIsSearchApplied] = useState(false);
    const [repostList, setRepostList] = useState([])
    const [searchBy, setSearchBy] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(30)



    const hanldeClick = async () => {
        setIsSearching(true)
        const response = await getRepos({ q: searchBy, rowsPerPage })
        // para parsear el reponse del json a un objeto de javascript , retorna una promesa por eso se coloca el await
        const data = await response.json()
        setRepostList(data.items)
        setIsSearchApplied(true)
        setIsSearching(false)
    }

    const handleChange = ({ target: { value } }) => setSearchBy(value)

    // useEffect()

    return (
        <Container>
            <Box my={2}>
                <Typography component="h1" variant="h3">github repositores list</Typography>
            </Box>

            <Grid container spacing={2} justify="space-between">
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="filter by" id="filterBy" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button fullWidth disabled={isSearching} onClick={hanldeClick} variant="contained" color="primary">Search</Button>
                </Grid>
            </Grid>
            <Box my={4}>
                <Content isSearchApplied={isSearchApplied} repostList={repostList} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
            </Box>

        </Container >
    )
}

export default GithubSearchPage
