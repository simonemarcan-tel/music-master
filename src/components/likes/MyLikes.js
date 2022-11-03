import { useEffect, useState } from "react"
import "./MyLikes.css"
import { useNavigate } from "react-router-dom"

export const MyLikes = () => {
    const [likes, setLikes] = useState([])
    //const [popular, setPopular] = useState(false)
    const navigate = useNavigate()

    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id

    useEffect(
        () => {

            fetch(`http://localhost:8088/myLikes?userId=${loggedIn}&_expand=artist`)
                .then(response => response.json())
                .then((likesArray) => {
                    setLikes(likesArray)
                })
        },
        []
    )


    const deleteButton = (event, likeObject) => {
        //vent.PreventDefault()
        fetch(`http://localhost:8088/myLikes/${likeObject.id}`, {
            method: "DELETE"
        })
            .then(() => {
                setLikes()
                navigate("/artists")
            })


    }


    return (
        <div>

            <h2>✩LIKED ARTISTS✩</h2>

            <article className="likes">
                {
                    likes?.map(
                        (like) => {
                            return (

                                <section className="like">
                                    <header>{like?.artist?.artistName}</header>
                                    <button
                                        id={like.id}
                                        onClick={(clickEvent) => deleteButton(clickEvent, like)}
                                        className="delete-like">
                                        Delete Like
                                    </button>




                                </section>
                            )
                        }
                    )
                }

            </article>


        </div>
    )
}