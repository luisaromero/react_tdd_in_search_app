import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Content } from './content/index';
import { getRepos } from '../services';

import {
    Typography, TextField, Button, Container, Grid, Box, TablePagination
} from '@mui/material'; { }
import GithubTable from './github-table';

const ROWS_PER_PAGE_DEFAULT = 30


export const GithubSearchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchApplied, setIsSearchApplied] = useState(false);
    const [repostList, setRepostList] = useState([])
    const [searchBy, setSearchBy] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT)

    const didMount = useRef(false)

    const handleSearch = useCallback(async () => {

        setIsSearching(true)
        const response = await getRepos({ q: searchBy, rowsPerPage })
        // para parsear el reponse del json a un objeto de javascript , retorna una promesa por eso se coloca el await
        const data = await response.json()
        setRepostList(data.items)
        setIsSearchApplied(true)
        setIsSearching(false)
    }, [rowsPerPage, searchBy])

    const handleChange = ({ target: { value } }) => setSearchBy(value)

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }
        handleSearch()
    }, [handleSearch])


    const handleChangeRowsPerPage = ({ target: { value } }) => setRowsPerPage(value)


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
                    <Button fullWidth disabled={isSearching} onClick={handleSearch} variant="contained" color="primary">Search</Button>
                </Grid>
            </Grid>
            <Box my={4}>
                <Content
                    isSearchApplied={isSearchApplied} repostList={repostList}  >
                    <>
                        <GithubTable repostList={repostList} />
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
                </Content>
            </Box>

        </Container >
    )
}

export default GithubSearchPage
