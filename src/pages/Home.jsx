import React from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";


const Home = () => {
	const [products, setProducts] = useState([]);

		const getAllProducts = async () => {
			try {
				const response = await axios.get(
					"https://fakestoreapi.com/products"
				);
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		useEffect(() => {
			getAllProducts();
		}, []);

	return (
		<div>
			<header>
				<nav className="flex justify-between items-center shadow px-4 py-2 md:py-4 md:px-8">
					<div>
						<a href="#">
							<h1 className="font-bold italic md:text-2xl text-lg">
								Products page
							</h1>
						</a>
					</div>
					<div>
						<button className="flex items-center gap-2 text-lg md:text-xl">
							Cart <FaCartShopping />
						</button>
					</div>
				</nav>
				<main className="flex flex-col gap-3 md:flex md:flex-row md:justify-between md:items-center py-4 shadow px-8">
					<div>
						<div className="flex items-center gap-3 rounded-xl border border-blue-400 md:w-96 h-10 px-4">
							<FaSearch className="text-xl text-gray-500" />
							<input
								type="text"
								className="rounded-xl outline-none w-full h-full "
								placeholder="Search for products"
							/>
						</div>
					</div>
					<div>
						<select
							name=""
							id=""
							className="w-full h-full rounded-xl outline-none"
						>
							<option value="">Filter by categories</option>
							<option value="electronics">Electronics</option>
							<option value="jewelery">Jewelery</option>
							<option value="men's clothing">
								Men's Clothing
							</option>
							<option value="women's clothing">
								Women's Clothing
							</option>
						</select>
					</div>
				</main>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-4 md:px-16 py-7">
				{products &&
					products.map((product) => (
						<div className="max-w-xs md:max-w-[400px] rounded-lg shadow-lg flex flex-col my-8 px-4 hover:shadow-xl transition duration-300 ease-in-out">
							<div className="h-72 md:h-96">
								<img
									src={product.image}
									alt=""
									className="object-cover w-full h-full"
								/>
							</div>
							<div className="px-3 py-6">
								<h1 className="font-bold text-lg mb-2">
									{product.title}
								</h1>
								<h3 className="my-1">
									<span className="font-bold">Category:</span>{" "}
									{product.category}
								</h3>
								<p className="my-1">
									<span className="font-bold">
										Description:
									</span>{" "}
									{product.description.slice(0, 60)}...
								</p>
								<div className="flex justify-between my-1">
									<p>
										<span className="font-bold">
											Rating:
										</span>{" "}
										{product.rating.rate}
									</p>
									<p className="font-bold">
										${product.price}
									</p>
								</div>
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:w-full">
									Add to Cart
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;
