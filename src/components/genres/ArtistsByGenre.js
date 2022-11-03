import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ArtistsByGenre = () => {
    const [artists, setArtists] = useState([])
    const [genre, update] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/artists?genreId=${genre.id}`)
            .then((res) => res.json())
            .then((artistsArray) => {
                setArtists(artistsArray)

            })
    }, [])

    /*const  = (event, genre) => {
        event.preventDefault()*/

    const GenreToSendToAPI = {
        genreId: artists.genreId

    }

    /* return (fetch(`http://localhost:8088/artist?genreId=${genre.genreId}`, {
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
     ) */

    // TODO: Perform the fetch() to POST the object to the API


    return (

        <div>
            <h2>✩ARTISTS OF {genre.id}✩</h2>

            <article className="genres">
                {
                    artists.map(
                        (artist) => {
                            return <section className="artists-genres">
                                <section>{artist.artistName}
                                </section>

                            </section>
                        }
                    )
                }

            </article>
        </div >
    )
}