import { yupResolver } from '@hookform/resolvers/yup'
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUpdateAnswers } from '../api-hooks/useUpdateAnswers'
import { CheckboxGroup } from '../components'
import { CustomCheckboxProps } from '../components/CheckboxGroup'
import { DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

import { validationSchema } from './Form.config'

export const FormView = () => {
    const answers = useAnswersStore(state => state.getAnswers())
    const loading = useAnswersStore(state => state.loading)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    })

    const updateAnswersMutation = useUpdateAnswers()

    const onSubmit = handleSubmit(formData => {
        updateAnswersMutation.mutate({
            name: formData.name,
            mail: formData.mail,
            age: formData.age,
            interests:
                formData.interests !== undefined
                    ? [...(formData.interests as Array<DomainOption>)]
                    : [],
        })
    })

    function castOptionsArray(value: Array<CustomCheckboxProps>) {
        const result: Array<DomainOption> = []
        for (const v of value) {
            const obj: DomainOption = {}
            obj[Number(v.id)] = {
                isChecked: v.checked as boolean,
                label: `${v.label}`,
            }
            result.push(obj)
        }
        return result
    }

    function castValueArray(
        value: Array<DomainOption>,
    ): Array<CustomCheckboxProps> {
        if (value.length === 0) {
            value = [...answers.interests]
        }
        const result: Array<CustomCheckboxProps> = []
        for (const el of value) {
            const id = Number(Object.keys(el)[0])
            const obj: CustomCheckboxProps = {
                id: `${id}`,
                label: el[id].label,
                checked: el[id].isChecked,
            }
            result.push(obj)
        }
        return result
    }

    return (
        <Container
            maxWidth="md"
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <div id="form-view">
                <Box
                    display="flex"
                    gap={4}
                    sx={{
                        flexDirection: 'column',
                        width: { xs: '220px', s: '230px', md: '300px' },
                    }}
                >
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={answers.name}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                label="Name"
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                helperText={errors.name?.message || ''}
                                error={Boolean(errors.name?.message)}
                            />
                        )}
                    />
                    <Controller
                        name="age"
                        control={control}
                        defaultValue={answers.age}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                label="Age"
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                helperText={errors.age?.message || ''}
                                error={Boolean(errors.age?.message)}
                            />
                        )}
                    />
                    <Controller
                        name="mail"
                        control={control}
                        defaultValue={answers.mail}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                label="Email"
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                helperText={errors.mail?.message || ''}
                                error={Boolean(errors.mail?.message)}
                            />
                        )}
                    />
                    {/*
                    TASK 2:
                    - Integrate CheckboxGroup into the form, controlled
                    by react-hook-form.
                    - Ensure the form's initial state is properly
                    configured to kickstart the form's state cycle.
                    - Do NOT modify types of answers.interests or
                    CheckboxGroup's options. This could be detrimental
                    to your final assessment.
                */}
                    <Controller
                        control={control}
                        defaultValue={answers.interests}
                        render={({ field: { onChange, value } }) => (
                            <CheckboxGroup
                                id="interest"
                                label="Interests"
                                onChange={value => {
                                    onChange(castOptionsArray(value))
                                }}
                                options={castValueArray(
                                    value as Array<DomainOption>,
                                )}
                                helperText={errors.interests?.message || ''}
                                error={Boolean(errors.interests?.message)}
                            />
                        )}
                        name="interests"
                    />
                    <Button
                        variant="contained"
                        disabled={!isValid || loading}
                        onClick={onSubmit}
                    >
                        {loading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
