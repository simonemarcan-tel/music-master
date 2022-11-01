import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistList } from "../artists/ArtistList"
import { ArtistForm } from "../artists/ArtistForm"
import { GenreList } from "../genres/GenreList"
import { MyLikes } from "../likes/MyLikes"
import { MyArtistList } from "../forms/MyArtistList"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>


					<Outlet />
				</>
			}>


				<Route path="artists" element=
					{<ArtistList />} />
				<Route path="artist/create"
					element={<ArtistForm />} />
				<Route path="genres"
					element={<GenreList />} />
				<Route path="likes"
					element={<MyLikes />} />
				<Route path="forms" element={<MyArtistList />} />

			</Route>
		</Routes >
	</>
}

