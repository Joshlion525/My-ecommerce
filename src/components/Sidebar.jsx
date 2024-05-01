import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";

const Sidebar = () => {
	const { getCartQuantity, products, cartItems, getItemQuantity } =
		useContext(CartContext);

	const selectedProducts = cartItems.map((item) => {
		return products.find((product) => product.id === item.id);
	});
	console.log(selectedProducts);

	return (
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
					<div className="">
						{selectedProducts.map((selectedProduct, index) => (
							<div
								key={index}
								className="mt-4 flex items-center justify-between pb-2 border-b"
							>
								<div className="flex items-center gap-2">
									<img
										src={selectedProduct.image}
										alt={selectedProduct.title}
										className="h-20 w-20 "
									/>
									<div
										className="flex flex-col
"
									>
										<p>
											{selectedProduct.title.slice(0, 20)}
											...
										</p>
										<p>{selectedProduct.price}</p>
										<p>
											x{" "}
											{getItemQuantity(
												selectedProduct.id
											)}
										</p>
									</div>
								</div>
								<div className="flex flex-col items-center gap-2">
									<p className="font-bold">
										{getItemQuantity(selectedProduct.id) *
											selectedProduct.price}
									</p>
									<button className="bg-blue-400 text-white px-2 py-1 cursor-pointer rounded-lg">
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between">
						<p className="font-bold text-xl">Total</p>
						<p className="font-bold text-xl">00000</p>
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default Sidebar;
