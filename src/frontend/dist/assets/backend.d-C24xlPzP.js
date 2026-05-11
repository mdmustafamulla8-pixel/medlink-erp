var GstRate = /* @__PURE__ */ ((GstRate2) => {
  GstRate2["gst5"] = "gst5";
  GstRate2["gst12"] = "gst12";
  GstRate2["gst18"] = "gst18";
  return GstRate2;
})(GstRate || {});
var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2["shipped"] = "shipped";
  OrderStatus2["cancelled"] = "cancelled";
  OrderStatus2["pending"] = "pending";
  OrderStatus2["delivered"] = "delivered";
  OrderStatus2["confirmed"] = "confirmed";
  return OrderStatus2;
})(OrderStatus || {});
var PaymentMode = /* @__PURE__ */ ((PaymentMode2) => {
  PaymentMode2["upi"] = "upi";
  PaymentMode2["card"] = "card";
  PaymentMode2["cash"] = "cash";
  return PaymentMode2;
})(PaymentMode || {});
export {
  GstRate as G,
  OrderStatus as O,
  PaymentMode as P
};
