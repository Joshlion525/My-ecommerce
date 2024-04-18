import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const ProductCard = ({ product }) => {
	const { increaseItemQuantity, getItemQuantity, removeFromCart } =
		useContext(CartContext);

	const quantity = getItemQuantity(product.id);

	return (
		<>
			<div
				className="max-w-xs md:max-w-[400px] rounded-lg shadow-lg flex flex-col my-8 px-4 hover:shadow-xl transition duration-300 ease-in-out"
				key={product.id}
			>
				<div className="h-72 md:h-96">
					<img
						src={product.image}
						alt=""
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="flex flex-col justify-between px-3 py-6">
					<div className="">
						<h1 className="font-bold text-lg mb-2">
							{product.title}
						</h1>
						<h3 className="my-1">
							<span className="font-bold">Category:</span>{" "}
							{product.category}
						</h3>
						<p className="my-1">
							<span className="font-bold">Description:</span>{" "}
							{product.description.slice(0, 60)}...
						</p>
						<div className="flex justify-between my-1">
							<p>
								<span className="font-bold">Rating:</span>{" "}
								{product.rating.rate}
							</p>
							<p className="font-bold">${product.price}</p>
						</div>
					</div>
					{quantity > 0 ? (
						<div className="flex flex-col items-center gap-2">
							<div className="w-full flex items-center justify-between">
								<button className="bg-blue-500 text-4xl hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 ">
									-
								</button>
								<p className="text-4xl">{quantity}</p>
								<button
									className="bg-blue-500 text-4xl hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 "
									onClick={() => {
										increaseItemQuantity(product.id);
									}}
								>
									+
								</button>
							</div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
								onClick={() => removeFromCart(product.id)}
							>
								Remove
							</button>
						</div>
					) : (
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:w-full"
							onClick={() => {
								increaseItemQuantity(product.id);
							}}
						>
							Add to Cart
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductCard;
