import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
	const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState(cartFromLocalStorage);


	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const getCartQuantity = cartItems.reduce((cartQuantity, item) => {
		return (cartQuantity += item.quantity);
	}, 0);

	const getItemQuantity = (id) => {
		const foundItem = cartItems.find((item) => item.id === id);
		return foundItem?.quantity || 0;
	};

	const increaseItemQuantity = (id) => {
		setCartItems((currItems) => {
			const foundItem = currItems.find((item) => item.id === id);

			if (!foundItem) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
		});
	};

	const decreaseItemQuantity = (id) => {
		setCartItems((currItems) => {
			return currItems
				.map((item) =>
					item.id === id && item.quantity > 1
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
				.filter((item) => item.quantity > 0);
		});
	};

	const removeFromCart = (id) => {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	};

	const contextValue = {
		products,
		cartItems,
		getCartQuantity,
		getItemQuantity,
		increaseItemQuantity,
		decreaseItemQuantity,
		removeFromCart,
	};

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
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
