import { useState } from 'react';
import { registerUser, loginUser } from '../utils/auth';
import './AuthDropdown.css';

export default function AuthDropdown({ onClose, onLoginSuccess }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            let result;
            if (isRegistering) {
                result = await registerUser(username, password);
            } else {
                result = await loginUser(username, password);
            }

            if (result.success) {
                onLoginSuccess(result.username);
                onClose();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-dropdown">
            <div className="auth-header">
                <h3>{isRegistering ? 'Create Account' : 'Welcome Back'}</h3>
                <button className="auth-close-btn" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-input-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        autoFocus
                    />
                </div>
                
                <div className="auth-input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        minLength={isRegistering ? 8 : 1}
                    />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
                </button>
            </form>

            <div className="auth-footer">
                {isRegistering ? 'Already have an account? ' : 'Need an account? '}
                <span 
                    className="auth-toggle-link"
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setError('');
                    }}
                >
                    {isRegistering ? 'Login here' : 'Register here'}
                </span>
            </div>
        </div>
    );
}
