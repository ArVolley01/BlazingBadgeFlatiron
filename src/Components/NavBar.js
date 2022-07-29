
import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Map 1</Link>
                </li>
                <li>
                    <Link to="/maptwo">Map 2</Link>
                </li>
                <li>
                    <Link to="/mapthree">Map 3</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;