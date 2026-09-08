const ProductCard = ({ product, onClick }) => {

    return (

        <div
            onClick={() => onClick(product.asin)}
            className="
            border rounded-2xl p-4 shadow-lg
            hover:shadow-2xl
            hover:scale-105
            transition duration-300
            bg-white cursor-pointer
            "
        >

            <img
                src={product.imgUrl}
                alt={product.title}
                className="
                h-64 w-full object-cover rounded-xl
                "
            />

            <h2 className="font-bold mt-3 line-clamp-2">
                {product.title}
            </h2>

            <p className="text-xl font-semibold mt-2">
                ${product.price}
            </p>

            <p className="mt-1">
                ⭐ {product.stars}
            </p>

        </div>
    )
}

export default ProductCard