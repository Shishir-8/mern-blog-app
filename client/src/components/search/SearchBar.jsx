import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function SearchBar() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = (e) => {
        console.log(search)
        e.preventDefault()
        if(!search.trim()) return

        navigate(`/search?q=${encodeURIComponent(search.trim())}`)
        setSearch('')
    }

    return (
        <form
        onSubmit={handleSearch}
        className="hidden  md:flex flex-1 items-center justify-center mx-4">

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="What you are looking for...?"
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit"
                className="border px-2 py-2 ms-2 rounded-lg">
                <Search />
            </button>
        </form>
    )
}
