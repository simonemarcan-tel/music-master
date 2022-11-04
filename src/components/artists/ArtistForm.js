import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react"

export const ArtistForm = () => {
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id
    const [genres, setGenres] = useState([])
    const [form, update] = useState({
        artistName: "",
        genreId: 0,
        popularArtist: false,
        userId: loggedIn


    })/*<fieldset>
                <div className="form-group">
                    <label htmlFor="artistGenre">Artist Genre:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Soul"
                        value={form.artistGenre}
                        onChange={
                            (evt) => {
                                const copy = { ...form }
                                copy.artistGenre = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                
            </fieldset>
<fieldset>
                    <div className="form-group">
                        <label htmlFor="artistInstruments">Artist Instruments:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Vocals"
                            value={form.artistInstruments}
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.artistInstruments = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset> */
    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const FormToSendToApi = {
            artistName: form.artistName,
            genreId: form.genreId,
            popularArtist: form.popularArtist,
            userId: loggedIn
        }

        if (
            form.artistName && form.genreId !== 0) {

            return fetch(`http://localhost:8088/artists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(FormToSendToApi)
            }
            )
                .then(response => response.json())
                .then(() => {
                    navigate("/forms")
                })
            // TODO: Create the object to be saved to the API


            // TODO: Perform the fetch() to POST the object to the API

        }
    }

    /* const FormToSendToAPI = {
         artistId: event.target.id,
         userId: loggedIn,
         artistGenre: form.genreId,
         popularArtist: form.popularArtist,
         instruments: form.instruments

     }


     return fetch(`http://localhost:8088/myLikes`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",

         },
         body: JSON.stringify(FormToSendToAPI)
     }
     )
         .then(response => response.json())
         .then(() => {
             navigate("/forms")
         })
     // TODO: Create the object to be saved to the API


     // TODO: Perform the fetch() to POST the object to the API
*/




    useEffect(
        () => {

            fetch(`http://localhost:8088/artists?userId=${loggedIn}`)
                .then(response => response.json())
                .then((formsArray) => {
                    update(formsArray)
                })
        },
        []
    )
    // <Link to={`/forms/${form.id}/edit`}>Form {form.id}</Link>
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
        <form className="artistForm">
            <h2 className="artistForm__title">☆New Artist Ticket★</h2>
            <header>

            </header>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="artistName">Artist Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Etta James"
                        value={form.artistName}
                        onChange={
                            (evt) => {
                                const copy = { ...form }
                                copy.artistName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...form }
                                copy.genreId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                        <option>Select A Genre
                        </option>
                        {genres.map((genre) => (

                            <option
                                value={genre.id}>{genre.genreName}</option>
                        ))}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Popular Artist?</label>
                    <input type="checkbox"
                        value={form.popularArtist}
                        onChange={
                            (evt) => {
                                const copy = { ...form }
                                copy.popularArtist = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button

                onClick={(event) => handleSaveButtonClick(event)}
                className="btn__btn-primary">
                ★Save Artist☆
            </button>
        </form>
    )

}