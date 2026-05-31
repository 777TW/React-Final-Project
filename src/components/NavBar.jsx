import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import AuthDropdown from './AuthDropdown';
import './NavBar.css'

export default function NavBar ({ setSearchQuery }) {
    const [activeTab, setActiveTab] = useState("Singleplayer");
    const [currentUser, setCurrentUser] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleLogout = () => {
        logoutUser();
        setCurrentUser(null);
    };

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
                <div className='nav-left'>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/GeoGuessr_logo.svg/1280px-GeoGuessr_logo.svg.png" 
                        alt="Logo"
                        id='Logo'
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    />
                    <p 
                        className={activeTab === "Singleplayer" ? "active" : ""}
                        onClick={() => { setActiveTab("Singleplayer"); navigate('/'); }}
                    >Singleplayer</p>
                    <p 
                        className={activeTab === "Multiplayer" ? "active" : ""}
                        onClick={() => navigate('/multiplayer')}
                    >Multiplayer</p>
                    <p 
                        className={activeTab === "Party" ? "active" : ""}
                        onClick={() => navigate('/party')}
                    >Party</p>
                </div>
                <div className='nav-right'>
                    <form onSubmit={(e) => e.preventDefault()} className="search-form">
                        <div className="search-wrapper"> 
                            <input 
                                type="text" 
                                name="q" 
                                placeholder="Search for maps" 
                                autoComplete="off"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="fa-solid fa-magnifying-glass icon-search"></i>
                        </div>
                    </form>
                    <div className="auth-section" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {currentUser ? (
                            <>
                                <div className='avatar' style={{ backgroundImage: 'none', backgroundColor: '#6b4bc1', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                    {currentUser.username.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p className="guest-text" style={{ margin: 0 }}>{currentUser.username}</p>
                                    <span 
                                        onClick={handleLogout} 
                                        style={{ fontSize: '11px', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Logout
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='avatar'></div>
                                <p 
                                    className="guest-text login-btn" 
                                    onClick={() => setShowAuth(!showAuth)}
                                >
                                    Login
                                </p>
                                {showAuth && (
                                    <AuthDropdown 
                                        onClose={() => setShowAuth(false)} 
                                        onLoginSuccess={(username) => {
                                            setCurrentUser({ username });
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}