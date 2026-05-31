import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export default function NavBar ({ setSearchQuery }) {
    const [activeTab, setActiveTab] = useState("Singleplayer");
    const navigate = useNavigate();

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
                    <div className='avatar'></div>
                    <p className="guest-text">Guest</p>
                </div>
            </div>
        </div>
    );
}