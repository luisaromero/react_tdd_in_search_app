import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Avatar, Link, TablePagination
} from '@mui/material';

const tableHeaders = ['Repository', 'stars', 'forks', 'open issues', 'updated at']


export const GithubTable = ({ repostList }) => (
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
    </TableContainer>)

export default GithubTable

GithubTable.propTypes = {
    repostList: PropTypes.arrayOf(PropTypes.object),
}

