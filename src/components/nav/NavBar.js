import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (

        <section>


            <li className="header__item
            active">
                <h1>☆MUSIC MASTER★</h1>
            </li>

            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link"
                        to="/artists">✯Artist List✯</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link"
                        to="/genres">✯Genres✯</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/likes">✯My Likes✯</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link"
                        to="/forms">✯My Artists✯</Link>
                </li>

                {
                    <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("music_user")
                            navigate("/", { replace: true })
                        }}>✯Logout✯</Link>
                    </li>
                }
            </ul>
        </section>
    )
}

