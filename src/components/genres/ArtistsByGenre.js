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


    return (

        <div>
            <h2>✩ARTISTS OF {artists[0]?.genre?.genreName}✩</h2>

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