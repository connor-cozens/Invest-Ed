import * as React from 'react';
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

export default function dataTable() {
    return (
        <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                    <TableCell>Test 1</TableCell>
                    <TableCell>Test 2</TableCell>
                    <TableCell>Test 3</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component={"th"} scope={"row"}>
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.test1}</TableCell>
                        <TableCell align="right">{row.test2}</TableCell>
                        <TableCell align="right">{row.test3}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    )
}