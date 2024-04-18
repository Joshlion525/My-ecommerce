import { createContext, useState } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
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
		return foundItem.quantity;
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

	const decreaseItemQuantity = () => {};

	const removeFromCart = (id) => cartItems.filter((item) => item.id !== id);

	const contextValue = {
		cartItems,
		getCartQuantity,
		getItemQuantity,
		increaseItemQuantity,
		decreaseItemQuantity,
		removeFromCart,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
