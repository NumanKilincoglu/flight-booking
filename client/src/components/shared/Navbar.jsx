import '../../assets/style/Navbar.css';
import Logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/profile.png';
import Discover from '../../assets/images/earth.png';
import Deals from '../../assets/images/price-tag.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-logo">
                <img src={Logo} alt="Logo" />
                <h4>PLANE SCAPE</h4>
            </a>
            <div className="navbar-menu">
                <a href="/">
                    <img
                        src={Deals}
                        alt="User Avatar"
                        className="nav-icon"
                    />
                    Deals

                </a>
                <a href="/flight-history">
                    <img
                        src={Discover}
                        alt="User Avatar"
                        className="nav-icon"
                    />
                    My Flights
                </a>
                <div className="navbar-user">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="user-avatar"
                    />
                    <span className="user-name">User</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;