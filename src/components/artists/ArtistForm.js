import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ArtistForm = () => {
    const [ticket, update] = useState({
        artistName: "",
        artistGenre: "",
        popularArtist: false

    })

    const navigate = useNavigate()

    const localMasterUser = localStorage.getItem("master_user")
    const masterUserObject = JSON.parse(localMasterUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketToSendToAPI = {
            userId: masterUserObject.id,
            artistName: ticket.artistName,
            artistGenre: ticket.genreId,
            popularArtist: ticket.popularArtist,
            dateCompleted: ""
        }

        return fetch(`http://localhost:8088/artists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })

            .then(response => response.json())
            .then(() => {
                navigate("/artists")
            })
    }

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
                        value={ticket.artistName}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
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
                        value={ticket.artistGenre}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.artistGenre = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Popular Artist?</label>
                    <input type="checkbox"
                        value={ticket.popularArtist}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.popularArtist = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                ★Submit Artist Ticket☆
            </button>
        </form>
    )

}