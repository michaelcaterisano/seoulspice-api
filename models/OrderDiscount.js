const { v4: uuidv4 } = require("uuid");

class OrderDiscount {
  constructor({ orderToUpdate, discount }) {
    this._order = orderToUpdate;
    this._discount = discount;
  }

  getDiscountedOrder() {
    this._buildDiscount();
    return { order: this._order };
  }

  _buildDiscount() {
    this._order.idempotencyKey = uuidv4();
    if (this._discount.type === "percentage") {
      this._order.discounts = [
        {
          uid: uuidv4(),
          type: "FIXED_PERCENTAGE",
          percentage: this._discount.value,
          name: this._discount.name,
          scope: "ORDER",
        },
      ];
    } else if (this._discount.type === "fixed") {
      this._order.discounts = [
        {
          uuid: uuidv4(),
          name: this._discount.name,
          type: "FIXED_AMOUNT",
          amountMoney: {
            amount: this._discount.value,
            currency: "USD",
          },
          scope: "ORDER",
        },
      ];
    }
  }
}

module.exports = OrderDiscount;
