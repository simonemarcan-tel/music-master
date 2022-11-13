import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (

        <section>



            <head className="header__item__one">☆★☆★☆MUSIC MASTER☆★☆★☆</head>
            <body>
                <ul className="navbar">
                    <li className="navbar__item__active">
                        <Link className="navbar__link"
                            to="/artists">✯Artist List✯</Link>
                    </li>
                    <li className="navbar__item__active">
                        <Link className="navbar__link"
                            to="/genres">✯Genres✯</Link>
                    </li>
                    <li className="navbar__item__active">
                        <Link className="navbar__link" to="/likes">✯My Likes✯</Link>
                    </li>
                    <li className="navbar__item__active">
                        <Link className="navbar__link"
                            to="/forms">✯My Artists✯</Link>
                    </li>

                    {
                        <li className="navbar__item__active">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("music_user")
                                navigate("/", { replace: true })
                            }}>✯Logout✯</Link>
                        </li>
                    }
                </ul>
            </body>
        </section >
    )
}

