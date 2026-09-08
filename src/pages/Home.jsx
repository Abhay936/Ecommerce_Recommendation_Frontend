import { useEffect, useState } from "react"

import API from "../api/api"

import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Recommendations from "../components/Recommendations"

const Home = () => {

    const [products, setProducts] = useState([])

    const [searchResults, setSearchResults] = useState([])

    const [selectedAsin, setSelectedAsin] = useState(null)

    const [search, setSearch] = useState("")

    const [loading, setLoading] = useState(true)

    // Fetch initial products
    useEffect(() => {

        API.get("/products")
            .then((res) => {

                // /products now returns { page, page_size, total, products }
                // instead of a bare array (see backend/app/routes/product_routes.py)
                setProducts(res.data.products)

                setLoading(false)

            })
            .catch((err) => {

                console.log(err)

                setLoading(false)

            })

    }, [])

    // Handle search
    const handleSearch = async (value) => {

        setSearch(value)

        // Clear search results if input empty
        if (value.trim() === "") {

            setSearchResults([])

            return
        }

        try {

            // /search now takes the query as a `?q=` param instead of a raw
            // path segment, so multi-word / special-character queries no
            // longer break routing.
            const res = await API.get("/search", { params: { q: value } })

            setSearchResults(res.data.recommendations)

        }
        catch (err) {

            console.log(err)

        }
    }

    if (loading) {

        return (

            <h1 className="text-4xl font-bold p-10">
                Loading...
            </h1>

        )
    }

    return (

        <div className="bg-gray-100 min-h-screen">

            {/* Navbar */}
            <Navbar />

            <div className="p-10">

                {/* Heading */}
                <h1 className="text-5xl font-bold mb-10">

                    AI Ecommerce Recommendation System

                </h1>

                {/* Search Box */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="
                    border p-4 rounded-2xl w-full mb-10
                    shadow-md bg-white
                    "
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {(searchResults.length > 0
                        ? searchResults
                        : products
                    ).map((product) => (

                        <ProductCard
                            key={product.asin}
                            product={product}
                            onClick={setSelectedAsin}
                        />

                    ))}

                </div>

                {/* Recommendations */}
                <Recommendations asin={selectedAsin} />

            </div>

        </div>
    )
}

export default Home