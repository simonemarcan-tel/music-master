import { useEffect, useState } from "react"
import "./Artists.css"
import { useNavigate } from "react-router-dom"


export const ArtistList = () => {
    const [artists, setArtists] = useState([])
    const [filteredArtists, setFiltered] = useState([])
    const [popularArtist, setPopular] = useState(false)
    const navigate = useNavigate()


    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const DataToSendToAPI = {
            artistId: event.target.id,
            userId: loggedIn
        }

        return fetch(`http://localhost:8088/myLikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(DataToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/likes")
            })

        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API

    }

    useEffect(
        () => {
            if (popularArtist) {
                const popularArtists = artists.filter(artist => artist.popularArtist === true)
                setFiltered(popularArtists)
            } else {
                setFiltered(artists)
            }
        },
        [popularArtist]
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/artists?_expand=genre")
                .then(response => response.json())
                .then((artistArray) => {
                    setArtists(artistArray)
                })
        },
        [] //initial state
    )

    /*  useEffect(
          () => {
              const myArtists = artists.filter(artist => artist.userId === masterUserObject.id)
              setFiltered(myArtists)
          },
          [artists]
      )
      */

    return (

        <div>

            <button onClick={() => { setPopular(true) }}>✩Popular Artists✩</button>
            <button onClick={() => { setPopular(false) }}>✯All Artists✯</button>
            <button onClick={() => navigate("/artist/create")}>✿ Create Artist Ticket ✿</button>



            <h2>✩ARTIST LIST✩</h2>

            <article className="artists">
                {
                    filteredArtists.map(
                        (artist) => {
                            return <section className="artist">
                                <header>{artist.artistName}</header>
                                <header>{artist.genre?.genreName}</header>
                                <footer> {artist.popularArtist ? "❣" : "(Lesser Known)"}
                                </footer>
                                <button
                                    id={artist.id}
                                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                    className="btn btn-primary">
                                    Like This Artist
                                </button>
                            </section>
                        }
                    )
                }

            </article>
        </div>
    )
}