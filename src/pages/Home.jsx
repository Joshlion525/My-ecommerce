import { FaSearch } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const Home = () => {
	const { products } = useContext(CartContext);
	return (
		<div>
			<header>
				<Sidebar />
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
