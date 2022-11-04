import { useEffect, useState } from "react"
import "./GenreList.css"
import { useNavigate } from "react-router-dom"
export const GenreList = () => {
    const [genres, setGenres] = useState([])
    const [specificArtists, setSpecificArtists] = useState([])
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

    const handleSaveButtonClick = (event, genre) => {
        event.preventDefault()

        const GenreToSendToAPI = {
            genreId: event.target.id,
            userId: loggedIn
        }

        return fetch(`http://localhost:8088/artist?genreId=${genre.genreName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(GenreToSendToAPI)
        }
        )
            .then(response => response.json())
            .then(() => {
                navigate("/artists/genreId")
            })
        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API

    }
    /* useEffect(
         () => {
             const specificArtists = artists.filter(artist => artist.genreId)
         }
     ) */

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
    //id={genre.id}
    return (

        <div>
            <h2 className="item__active">✩Genre List✩</h2>

            <article className="genres">
                {
                    genres.map(
                        (genre) => {
                            return <section className="genre">
                                <header>{genre.genreName}</header>
                                <button className="genre-btn"
                                    id={genre.id}
                                    onClick={() => {
                                        navigate(`/artist/${genre.id}`)
                                    }}>➡
                                </button>

                            </section>
                        }
                    )
                }

            </article>
        </div >
    )
}