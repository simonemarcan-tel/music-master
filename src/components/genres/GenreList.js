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
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id
    const handleSaveButtonClick = (event, artists) => {
        event.preventDefault()

        const GenreToSendToAPI = {
            genreId: event.target.id,
            userId: loggedIn
        }

        return fetch(`http://localhost:8088/genres?id=${artists.genreId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(GenreToSendToAPI)
        }
        )
            .then(response => response.json())
            .then(() => {
                navigate("/artists")
            })
        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API

    }

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
                                <button
                                    id={genre.id}
                                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                    className="list-artists">
                                    {genre.genreName}
                                </button>


                            </section>
                        }
                    )
                }

            </article>
        </div>
    )
}