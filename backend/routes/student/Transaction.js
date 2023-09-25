const express = require("express");
const router = express.Router();
const studentDetail = require("../../models/studentschema");
const stripe = require("stripe")(
  "sk_test_51Nr5KGSJ5d6Cj4qWnlFnC3SS8bpAUsQCsNb8yAaV4npP2HvaR9Do2lXKM8lKRWQyNx5KxYLuJA2qQjxCPB1soKkl00E3sOgOG4"
);

router.post("/crerate-checkout-session", async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000";
  const { id, amount, qty } = req.body;

  try {
    const userData = await studentDetail.findById(id);
    if (userData) {
      console.log(id, amount, qty);

      const receipt = {
        amount: amount,
        type: "deposit",
        status:"success",
        dateStamp: Date.now(),
      };

      userData.transactions.receipt
        ? userData.transactions.receipt.push(receipt)
        : (userData.transactions.receipt = receipt);
      await userData.save();

      const session = await stripe.checkout.sessions.create({
        // payment_method_types:["upi"],
        line_items: [
          {
            price_data:{
                currency:"inr",
                product_data:{

                    name: "Fees Payment",
                },
                unit_amount: amount *100
            },
            quantity: qty,
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/FeesStructure`,
        cancel_url: `${YOUR_DOMAIN}/StudentHome`,
      });
      res.json({ success: true, id:session.id });

    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    // Handle error
  }
});


router.post("/getTransactions", async (req, res) => {
  const { id } = req.body;
  try {
    const userData = await studentDetail.findById(id);
    if (userData) {
      const transactions = userData.transactions;
      return res.json({ success: true, transactions });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    // Handle error
  }
});

module.exports = router;
