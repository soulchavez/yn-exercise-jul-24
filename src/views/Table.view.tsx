import { Delete, Edit } from '@mui/icons-material'
import {
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useResetAnswers } from '../api-hooks/useResetAnswers'
import { APP_ROUTES } from '../domain/routes'
import { DomainAnswers, DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

import './table.css'

// TASK 4:
// - Implement the table from this mockup (public/table_view_mockup.png).
// - Display answers from store in table.
// - Each row of the table body should have the name of the answer
// and its value.
// - Add the edit and delete buttons on top of the table.

// TASK 5:
// - Redirect to Form view on edit button click.

// TASK 6:
// - Invoke useResetAnswers hook on delete button click.
// - See useResetAnswers hook for more guidelines.

export const TableView = () => {
    const answers = useAnswersStore(state => state.getAnswers())
    const resetAnswers = useResetAnswers()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Answers table'
    }, [])

    function formatInterests(value: Array<DomainOption>): string {
        const interests = []
        for (const el of value) {
            const id = Number(Object.keys(el)[0])
            if (el[id].isChecked) {
                interests.push(el[id].label)
            }
        }
        return interests.toString()
    }

    const displayTable = () => {
        const rows = []
        for (const key in answers) {
            rows.push(
                <TableRow
                    key={key}
                    sx={{
                        '&:last-child td, &:last-child th': {
                            border: 0,
                        },
                    }}
                >
                    <TableCell component="th" scope="row">
                        <Typography sx={{ textTransform: 'capitalize' }}>
                            {key}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        {Array.isArray(answers[key as keyof DomainAnswers])
                            ? formatInterests(
                                  answers[
                                      key as keyof DomainAnswers
                                  ] as Array<DomainOption>,
                              )
                            : `${answers[key as keyof DomainAnswers]}`}
                    </TableCell>
                </TableRow>,
            )
        }
        return rows
    }

    return (
        <Container maxWidth="md">
            <div id="table-view">
                <div className="actions">
                    <IconButton
                        aria-label="edit answers"
                        onClick={() => {
                            navigate(APP_ROUTES.FORM)
                        }}
                    >
                        <Edit fontSize="medium" color="disabled" />
                    </IconButton>
                    <IconButton
                        aria-label="delete answers"
                        onClick={() => {
                            resetAnswers.mutate()
                        }}
                    >
                        <Delete fontSize="medium" color="disabled" />
                    </IconButton>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="answers table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight="bold" variant="h6">
                                        Questions
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold" variant="h6">
                                        Answers
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{displayTable()}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}
