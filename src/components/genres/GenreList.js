import { useEffect, useState } from "react"
import "./GenreList.css"
import { useNavigate } from "react-router-dom"
export const GenreList = () => {
    const [genres, setGenres] = useState([])
    const navigate = useNavigate()

    /*const localMasterUser = localStorage.getItem("master_user")
    const masterUserObject = JSON.parse(localMasterUser) */

    /*useEffect(
        () => {
            if (popular) {
                const popularArtists = artists.filter(artist => artist.popular === true)
                setPopular(popularArtists)
            } else {
                setPopular(artists)
            }
        },
        [popular]
    )
    */

    useEffect(
        () => {
            fetch("http://localhost:8088/genres")
                .then(response => response.json())
                .then((genreArray) => {
                    setGenres(genreArray)
                })
        },
        [] //initial state
    )

    return (

        <div>
            <h2>✩GENRE LIST✩</h2>

            <article className="genres">
                {
                    genres.map(
                        (genre) => {
                            return <section className="genre">
                                <header>{genre.genreName}</header>


                            </section>
                        }
                    )
                }

            </article>
        </div>
    )
}