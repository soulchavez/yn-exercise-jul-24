import { Box } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppRoutes } from '../domain/routes'

const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
}

const linkStyles: React.CSSProperties = {
    display: 'block',
    marginTop: '24px',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
}

const sideMenuStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    backgroundColor: '#DD1E3E',
    width: '120px',
    padding: 2,
    boxSizing: 'border-box',
}

const contentStyles: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

type SideMenuProps = {
    routes: AppRoutes
    children?: React.ReactNode
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, routes }) => {
    const navigate = useNavigate()

    React.useEffect(() => {
        navigate(routes.FORM)
    }, [])

    return (
        <Box sx={layoutStyles}>
            <Box sx={sideMenuStyles}>
                <Link to={routes.FORM} style={linkStyles}>
                    Form
                </Link>
                <Link to={routes.TABLE} style={linkStyles}>
                    Table
                </Link>
            </Box>
            <Box sx={contentStyles}>{children}</Box>
        </Box>
    )
}
