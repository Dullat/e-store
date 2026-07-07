import React, { useContext, useEffect, useState } from "react";
import { useGetCartQuery } from "../features/cart/cartApi";
import CartItem from "../components/CartItem";
import ScrollToTop from "../components/ScrollToTop";

const CartPage = () => {
  const { data, isLoading, isError, error } = useGetCartQuery();
  const [filteredCart, setFilteredCart] = useState([]);
  const cart = [];

  console.log(data, isLoading, "this is cart loading");

  useEffect(() => {
    setFilteredCart(data?.cart);
  }, [data?.cart]);

  if (isLoading)
    return (
      <div className="w-full grid place-content-center mt-8">
        <p>Loading...</p>
      </div>
    );

  if (data?.cart.length < 1 || !data)
    return (
      <div className="w-full grid place-content-center mt-8">
        <p>Not items in cart...</p>
      </div>
    );

  return (
    <div className="w-full p-4 max-w-[900px] m-auto min-h-screen">
      <ScrollToTop />
      <p className="text-2xl font-bold sm:my-4">Your Cart</p>
      <div className="flex flex-col gap-4 w-full">
        {/* {cart && cart.length === 0 && ( */}
        {/*   <p className="mt-20 m-auto opacity-60 text-sm "> */}
        {/*     Cart is Empty, Try adding some games... */}
        {/*   </p> */}
        {/* )} */}
        {filteredCart &&
          filteredCart.map((item) => <CartItem key={item.id} game={item} />)}
      </div>
    </div>
  );
};

export default CartPage;

const MissingCart = () => {
  const { getData } = useContext(CartContext);
  const { userProfile } = useContext(AuthContext);
  const createCart = async () => {
    const { data: cart } = await supabase
      .from("carts")
      .insert([{ user_id: userProfile.id }])
      .select();
    console.log(cart);

    getData();
  };

  return (
    <button
      onClick={createCart}
      className="m-auto mt-5 p-2 bg-blue-800 rounded"
    >
      init cart
    </button>
  );
};
