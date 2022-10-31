import { useEffect, useState } from "react"
import "./MyLikes.css"
import { useNavigate } from "react-router-dom"
export const MyLikes = () => {
    const [likes, setLikes] = useState([])
    //const [popular, setPopular] = useState(false)
    const navigate = useNavigate()


    const deleteItem = (likes) => {

        if (likes.hasOwnProperty("id")) {
            localStorage.splice(likes.id)

            navigate("/likes")
        }

    }

    const loggedIn = JSON.parse(localStorage.getItem("music_user")).id

    useEffect(
        () => {
            fetch(`http://localhost:8088/myLikes?userId=${loggedIn}&_expand=artist`)
                .then(response => response.json())
                .then((likesArray) => {
                    setLikes(likesArray)
                })
        },
        [] //initial state
    )


    return (
        <div>

            <h2>✩Liked Artists✩</h2>

            <article className="likes">
                {
                    likes.map(
                        (like) => {
                            return (

                                <section className="like">
                                    <header>{like.artist?.artistName}</header>
                                    <button
                                        id={like.id}
                                        onClick={(clickEvent) => deleteItem(clickEvent)}
                                        className="btn btn-primary">
                                        Delete
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