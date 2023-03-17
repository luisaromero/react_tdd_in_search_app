import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Content } from './content/index';
import { getRepos } from '../services';
import GithubTable from './github-table';


import {
    Typography, TextField, Button, Container, Grid, Box, TablePagination
} from '@mui/material'; { }

const ROWS_PER_PAGE_DEFAULT = 30


export const GithubSearchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchApplied, setIsSearchApplied] = useState(false);
    const [repostList, setRepostList] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT)
    const [currentPage, setCurrentPage] = useState(0)

    const didMount = useRef(false)
    const searchByInput = useRef(null)

    const handleSearch = useCallback(async () => {

        setIsSearching(true)
        const response = await getRepos({ q: searchByInput.current.value, rowsPerPage, currentPage })
        // para parsear el reponse del json a un objeto de javascript , retorna una promesa por eso se coloca el await
        const data = await response.json()
        setRepostList(data.items)
        setIsSearchApplied(true)
        setIsSearching(false)
    }, [rowsPerPage, currentPage])


    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }
        handleSearch()
    }, [handleSearch])


    const handleChangeRowsPerPage = ({ target: { value } }) => setRowsPerPage(value)

    const handleChangePage = (event, newPage) => setCurrentPage(newPage)


    return (
        <Container>
            <Box my={2}>
                <Typography component="h1" variant="h3">github repositores list</Typography>
            </Box>

            <Grid container spacing={2} justify="space-between">
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="filter by" id="filterBy" inputRef={searchByInput} />
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
                            count={1000}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                </Content>
            </Box>

        </Container >
    )
}

export default GithubSearchPage
