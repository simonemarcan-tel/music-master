import { hasFormSubmit } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"

export const MyArtistList = () => {


    const [myCreatedForms, setMyForms] = useState([])
    const [filteredForms, setFilteredForms] = useState([])
    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id

    useEffect(
        () => {
            fetch(`http://localhost:8088/myCreatedForms?userId=${loggedIn}`)
                .then(response => response.json())
                .then((formArray) => {
                    setFilteredForms(formArray)

                })

        },
        [] // When this array is empty, you are observing initial component state
    )


    /*useEffect(
        () => {
            const myCreatedForms = myCreatedForms.filter(myCreatedForms => myCreatedForms.userId === loggedIn.id)
            setFilteredForms(myCreatedForms)
        }
    )
    */
    return <>
        <h2>❉My Created Artists❉</h2>

        <article className="forms">
            {
                myCreatedForms.map(
                    (form) => {
                        return <section className="form">

                            <header>{form.artistName}</header>
                            <section>{form.artistGenre}</section>
                            <section>{form.artistInstruments}</section>
                            <footer> {form.popularArtist}
                            </footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}