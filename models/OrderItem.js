class OrderItem {
  constructor(data) {
    this._data = data;
    this._item;
  }

  getItem() {
    this._buildItem();
    return this._item;
  }

  _buildItem() {
    this._item = {
      quantity: this._data.qty,
      basePriceMoney: {
        amount: this._data.price,
        curency: "USD",
      },
      name: `${this._data.signature} ${this._data.name}`,
      note: this._data.notes ? `${this._data.notes.join(", ")}.` : "",
    };

    if (this._data.type === "entree") {
      this._buildModifiers();
    }
  }

  _buildModifiers() {
    this._data.options.forEach((option) => {
      this._item["modifiers"] = {
        basePriceMoney: {
          amount: 0, // because price is already included in total
          currency: "USD",
        },
        name: this._getModifierName(option),
      };
    });
  }

  _getModifierName(option) {
    const choiceNames = option.choices.map((choice) => {
      return choice.qty ? `${choice.name} + (${choice.qty})` : choice.name;
    });
    return `${option.cartLabel}: ${choiceNames.join(", ")}.`;
  }
}

module.exports = OrderItem;
