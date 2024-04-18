import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const Home = () => {
	const [products, setProducts] = useState([]);

	const { getCartQuantity } = useContext(CartContext);
	console.log(getCartQuantity);

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
				<nav className="flex justify-between items-center shadow px-4 py-2 md:py-4 md:px-8 fixed w-full bg-white">
					<div>
						<a href="#">
							<h1 className="font-bold italic md:text-2xl text-lg">
								Products page
							</h1>
						</a>
					</div>
					<Sheet>
						<SheetTrigger asChild>
							<div className="relative">
								<button className="">
									<FaCartShopping className="text-2xl" />
								</button>
								<div className="absolute flex items-center justify-center bottom-5 left-4 bg-blue-400 rounded-full h-6 w-6  text-white">
									<p className="text-lg">{getCartQuantity}</p>
								</div>
							</div>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Cart Items</SheetTitle>
							</SheetHeader>
						</SheetContent>
					</Sheet>
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
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default Home;
