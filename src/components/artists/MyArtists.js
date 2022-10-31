import { useEffect, useState } from "react"
import "./Artists.css"
import { useNavigate } from "react-router-dom"

useEffect(
    () => {
        fetch("http://localhost:8088/artists")
            .then(response => response.json())
            .then((artistArray) => {
                setTickets(artistArray)
            })
        // View the initial state of tickets
    },
    [] // When this array is empty, you are observing initial component state
)