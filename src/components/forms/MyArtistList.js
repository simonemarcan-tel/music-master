import { hasFormSubmit } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./MyArtistList.css"

export const MyArtistList = () => {


    const [myCreatedForms, setMyForms] = useState([])
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id
    const navigate = useNavigate()
    const { artistId } = useParams()
    useEffect(
        () => {
            fetch(`http://localhost:8088/artists?userId=${loggedIn}&_expand=genre`)

                .then(response => response.json())
                .then((formArray) => {
                    setMyForms(formArray)

                })

        },
        [] // When this array is empty, you are observing initial component state
    )




    /* useEffect(
         () => {
             const myCreatedForms = myCreatedForms.filter(myCreatedForms => myCreatedForms.userId === loggedIn.id)
             setFilteredForms(myCreatedForms)
         }
     )
    */
    return <>
        <h2 className="title">❉My Created Artists❉</h2>

        <article className="forms">
            {
                myCreatedForms.map(
                    (form) => {
                        return (
                            <>
                                <section className="form">

                                    <header>Name: {form.artistName}</header>
                                    <section>Genre: {form.genre?.genreName}</section>
                                    <section> {form.popularArtist ? "★" : "(Lesser Known)"}
                                    </section>

                                    <button
                                        className="btn__onclick"
                                        onClick={() => {
                                            navigate(`/artist/${form.id}/edit`)
                                        }}>✎</button>
                                </section> </>)
                    }
                )
            }
        </article>
    </>
}