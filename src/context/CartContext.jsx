import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	console.log(cartItems);
	// {
	//     id: 0,
	//     quantity: 0,
	// }

	const getCartQuantity = cartItems.reduce((cartQuantity, item) => {
		return (cartQuantity += item.quantity);
	}, 0);

	const getItemQuantity = (id) => {
		const foundItem = cartItems.find((item) => item.id === id);
		return foundItem?.quantity;
	};

	const increaseItemQuantity = (id) => {
		setCartItems((currItems) => {
			const foundItem = currItems.find((item) => item.id === id);

			if (!foundItem) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseItemQuantity = (id) => {
		setCartItems((currItems) => {
			const newItems = currItems.map((item) => {
				if (item.id === id && item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 };
				} else if (item.id === id && item.quantity === 1) {
					return null;
				} else {
					return item;
				}
			});

			return newItems.filter((item) => item !== null);
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
