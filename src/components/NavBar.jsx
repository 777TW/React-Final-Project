import './NavBar.css'

export default function NavBar () {
    return (
        <div className='container'>
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
                        <input type="text" name="q" placeholder = "Search for maps" autocomplete="off"/>
                        <i class="fa-solid fa-magnifying-glass icon-search"></i>
                    </div>
                </form>
                <div className='avatar'>O</div>
                <p>Guest</p>
            </div>
        </div>
    );
}