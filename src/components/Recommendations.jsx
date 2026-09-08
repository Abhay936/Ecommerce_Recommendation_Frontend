import { useEffect, useState } from "react"
import API from "../api/api"

const Recommendations = ({ asin }) => {

    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {

        if (!asin) return

        // Was calling the nonexistent /recommend/{asin} — the real route is
        // /recommendations/{asin}, and it returns { asin, recommendations, strategy }
        // rather than a bare array.
        API.get(`/recommendations/${encodeURIComponent(asin)}`)
            .then((res) => {

                setRecommendations(res.data.recommendations)

            })
            .catch((err) => {

                console.log(err)

            })

    }, [asin])

    if (!asin) return null

    return (

        <div className="mt-10">

            <h1 className="text-3xl font-bold mb-5">

                Recommendations

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                {recommendations.map((item) => (

                    <div
                        key={item.asin}
                        className="bg-white p-5 rounded-xl shadow"
                    >

                        <img
                            src={item.imgUrl}
                            alt={item.title}
                            className="h-40 w-full object-cover rounded-lg mb-3"
                        />

                        <h1 className="font-bold line-clamp-2">

                            {item.title}

                        </h1>

                        <p className="text-lg font-semibold mt-1">
                            ${item.price} &nbsp; ⭐ {item.stars}
                        </p>

                        <p className="text-sm text-gray-500 mt-1 italic">
                            {item.reason}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Recommendations