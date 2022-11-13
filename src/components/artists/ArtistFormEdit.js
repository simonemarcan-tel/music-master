import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// <footer>Popular Artist: {form.popularArtist ? "★" : "No"}</footer>
export const FormEdit = () => {
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id
    const [genres, setGenres] = useState([])
    const [form, update] = useState({
        artistName: "",
        genreId: 0,
        popularArtist: false,
        userId: loggedIn


    })

    const { artistId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8088/artists/${artistId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [artistId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/artists/${form.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/forms")
            })
    }
    const deleteButton = (event, form) => {
        event.preventDefault()
        fetch(`http://localhost:8088/artists/${artistId}`, {
            method: "DELETE"
        })
            // .then(() => {
            // update()
            // })

            .then(() => {
                navigate("/forms")
            })



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

    return <form className="artistForm">
        <h2 className="artistForm__title">Artist Form</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="artistName">Artist Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
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
            <div className="form-group size 12rem">
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
            ★Save Changes☆
        </button>
        <button
            id={form.id}
            onClick={(event) => deleteButton(event, form)}
            className="delete-button">
            ☆Delete Artist★
        </button>



    </form>
}