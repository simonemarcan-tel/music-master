import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const ArtistForm = () => {
    const [forms, setForms] = useState([])
    const [form, update] = useState({
        artistName: "",
        artistGenre: "",
        popularArtist: false

    })

    const navigate = useNavigate()

    const localMasterUser = localStorage.getItem("master_user")
    const masterUserObject = JSON.parse(localMasterUser)
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id


    const handleSaveButtonClick = (event) => {


        const FormToSendToAPI = {
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

    }



    useEffect(
        () => {

            fetch(`http://localhost:8088/myCreatedForms?userId=${loggedIn}`)
                .then(response => response.json())
                .then((formsArray) => {
                    setForms(formsArray)
                })
        },
        []
    )
    return (
        <form className="artistForm">
            <h2 className="artistForm__title">☆New Artist Ticket★</h2>
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
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="artistInstruments">Artist Instruments:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Vocals"
                            value={form.instruments}
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.instruments = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
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

                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                ★Save Artist☆
            </button>
        </form>
    )

}