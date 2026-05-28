import './NavBar.css'

export default function NavBar () {
    return (
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
                <div className='nav-left'>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/GeoGuessr_logo.svg/1280px-GeoGuessr_logo.svg.png" 
                        alt="Logo"
                        id='Logo'    
                    />
                    <p>Singleplayer</p>
                    <p>Multiplayer</p>
                    <p>Party</p>
                </div>
                <div className='nav-right'>
                    <form action="#" method="GET" class="search-form">
                        <div class = "search-wrapper"> 
                            <input type="text" name="q" placeholder = "Search for maps" autoComplete="off"/>
                            <i class="fa-solid fa-magnifying-glass icon-search"></i>
                        </div>
                    </form>
                    <div className='avatar'>O</div>
                    <p className="guest-text">Guest</p>
                </div>
            </div>
        </div>
    );
}