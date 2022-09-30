import React, { useState } from "react";

const Store = () => {
  const [checkout, setCheckout] = useState(false);

  return (
    <div className="store">
      {checkout ? (
        <PayPal />
      ) : (
        <button
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default Store;
