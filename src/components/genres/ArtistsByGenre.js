import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ArtistsByGenre = () => {
    const [artists, setArtists] = useState([])
    const [genre, update] = useState()
    const navigate = useNavigate()
    const { genreId } = useParams()
    useEffect(() => {
        fetch(`http://localhost:8088/artists?genreId=${genreId}&_expand=genre`)
            .then((res) => res.json())
            .then((artistsArray) => {
                setArtists(artistsArray)

            })
    }, [])

    /*const  = (event, genre) => {
        event.preventDefault()*/


    // TODO: Create the object to be saved to the API

    // TODO: Perform the fetch() to POST the object to the API
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const DataToSendToAPI = {
            artistId: parseInt(event.target.id),
            userId: loggedIn
        }

        return fetch(`http://localhost:8088/myLikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(DataToSendToAPI)
        }
        )
            .then(response => response.json())
            .then(() => {
                navigate("/likes")
            })
    }
    return (

        <div>
            <h2>✩Artists of "{artists[0]?.genre?.genreName}"✩</h2>

            <article className="genres">
                {
                    artists.map(
                        (artist) => {
                            return <section className="artists-genres">
                                <section>Artist: {artist.artistName}
                                </section>
                                <button
                                    id={artist.id}
                                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                    className="btn_btn-primary">
                                    ♥︎
                                </button>

                            </section>
                        }
                    )
                }

            </article>
        </div >
    )
}