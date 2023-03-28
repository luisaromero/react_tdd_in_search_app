import React from "react";
import PropTypes from 'prop-types';
import {
    Typography, Button
} from '@mui/material';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasErrors: false }
    }
    static getDerivedStateFromError() {
        // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
        return { hasError: true };
    }

    handleReloadLocation = () =>
        window.location.reload()



    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <>
                    <Typography variant="h4" >There is an unexpected error</Typography>
                    <Button variant="contained" color="primary" type="button" onClick={this.handleReloadLocation}>Reload</Button>
                </>
            )
        }
        return children
    }
}
ErrorBoundary.prototypes = {
    children: PropTypes.node.isRequired,
}
