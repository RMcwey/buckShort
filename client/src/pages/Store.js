import React, { useState } from "react";
import PayPal from "../components/PayPal/PayPal";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

const Store = () => {
  const [checkout, setCheckout] = useState(false);

  return (
    <div className="store">
      <Card
        sx={{ minHeight: "100vh", backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <CardContent>
          <Box
            sx={{
              p: 2,
              backgroundColor: "secondary.extraLight",
              borderRadius: "3px",
            }}
          >
            {checkout ? (
              <PayPal />
            ) : (
              <Button
                sx={{ p: 2, mt: 10 }}
                onClick={() => {
                  setCheckout(true);
                }}
              >
                Checkout
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Store;
