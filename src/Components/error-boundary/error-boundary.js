import React from "react";
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasErrors: false }
    }
    static getDerivedStateFromError() {
        // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
        return { hasError: true };
    }
    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <>
                    <p>There is an unexpected error</p>
                    <button type="button">Reload</button>
                </>
            )
        }
        return children
    }
}
ErrorBoundary.prototypes = {
    children: PropTypes.node.isRequired,
}
