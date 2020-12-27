const OrderItem = require("./OrderItem");

class OrderBuilder {
  constructor(data) {
    this._data = data;
    this._order = {
      locationId: null,
      lineItems: [],
      taxes: [],
      serviceCharges: [],
      fulfillments: [],
    };
  }

  getOrder() {
    this._buildOrder();
    return { order: this._order };
  }

  _buildOrder() {
    this._buildOrderItems();
    this._buildFulfillments();
    this._buildTaxes();
    this._buildServiceCharges();
  }

  _buildOrderItems() {
    const { items } = this._data;
    items.forEach((item) => {
      const orderItem = new OrderItem(item);
      this._order.lineItems.push(orderItem.getItem());
    });
  }

  _buildFulfillments() {
    const pickupTime = new Date(this._data.time).toISOString();
    this._order.fulfillments.push({
      type: "PICKUP",
      pickupDetails: {
        recipient: {
          displayName: this._data.name,
          emailAddress: this._data.email,
          // phoneNumber: this._data.phone,
        },
        pickupAt: pickupTime,
        isCurbsidePickup: this._data.curbside,
      },
    });
  }

  _buildTaxes() {
    this._order.taxes.push = {
      name: "Sales Tax",
      scope: "ORDER",
      type: "ADDITIVE",
      percentage: `${this._data.taxRate}`,
    };
  }

  _buildServiceCharges() {
    this._order.serviceCharges.push({
      name: "Tip",
      amountMoney: {
        amount: this._data.tip ? this._data.tip : 0,
        curency: "USD",
      },
      calculationPhase: "TOTAL_PHASE",
      taxable: false,
    });
  }
}

module.exports = OrderBuilder;
