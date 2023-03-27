import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./error-boundary";

jest.spyOn(console, 'error')

const ThrowError = () => {
    throw new Error('ups')
}


describe('when the components render without errors', () => {
    it('must render the component content', () => {
        render(<ErrorBoundary>
            <h1>tess pass</h1>
        </ErrorBoundary>)

        expect(screen.getByText(/tess pass/i)).toBeInTheDocument()
    })
})
describe('when the components render throws an error', () => {
    it('must render the message "There is an unexpected error" and reload button', () => {

        render(<ErrorBoundary>
            <ThrowError />
        </ErrorBoundary>)

        expect(screen.getByText(/There is an unexpected error/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument()

    })
})
describe('when the users click on reload button', () => {
    it('must reload the app', () => {
        render(<ErrorBoundary>
            <ThrowError />
        </ErrorBoundary>)

        delete window.location
        window.location = { reload: jest.fn() }

        fireEvent.click(screen.getByRole('button', { name: /reload/i }))
        expect(window.location.reload).toHaveBeenCalledTimes(1)
    })
})