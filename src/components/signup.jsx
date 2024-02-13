import React, { useState } from 'react';
import { signUpCall } from '../lib/util'


function SignUp() {
    // Initialize state for input fields and validation messages
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState()
    const [validationMessages, setValidationMessages] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Validate email format
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Handle change in input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        // Reset validation messages on input change
        setValidationMessages((prevMessages) => ({
            ...prevMessages,
            [name]: '',
        }));

        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    // Handle form submission with validation
    const handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        let messages = { username: '', email: '', password: '' };

        if (!username) {
            messages.username = 'Username is required.';
            isValid = false;
        }
        if (!isValidEmail(email)) {
            messages.email = 'Invalid email format.';
            isValid = false;
        }
        if (password.length < 6) {
            messages.password = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        setValidationMessages(messages);

        if (isValid) {
            console.log('Submitted:', { username, email, password });
            // Proceed with form submission actions, e.g., API call
            await signUpCall(username, email, password, setError);
        }
    };

    // Return JSX for the sign-up form with validation messages
    return (
        //If there is an error, display it


        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={username} onChange={handleChange} />
                {validationMessages.username && <div style={{ color: 'red' }}>{validationMessages.username}</div>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} />
                {validationMessages.email && <div style={{ color: 'red' }}>{validationMessages.email}</div>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={handleChange} />
                {validationMessages.password && <div style={{ color: 'red' }}>{validationMessages.password}</div>}
            </div>
            <button type="submit">Sign Up</button>
        </form>

        );
        }

        export default SignUp;
