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
      quantity: this._data.qty.toString(),
      basePriceMoney: {
        amount: this._data.price,
        currency: "USD",
      },
      name: `${this._data.signature ? this._data.signature + " " : ""}${
        this._data.name
      }`,
      note: this._data.notes
        ? `** ${this._data.notes.map((note) => note.toUpperCase()).join(", ")}`
        : "",
    };

    if (this._data.type === "entree") {
      this._buildModifiers();
    }
  }

  _buildModifiers() {
    this._item.modifiers = [];
    const optionalModifiers = [
      "Bases",
      "Proteins",
      "Veggies",
      "Toppings",
      "Sauces",
    ];
    optionalModifiers.forEach((modifier) => {
      // if no choices for option, send string NO {OPTION}
      if (!this._data.options.some((option) => option.cartLabel === modifier)) {
        this._item.modifiers.push({
          basePriceMoney: {
            amount: 0, // because price is already included in total
            currency: "USD",
          },
          name: `NO ${modifier.toUpperCase()}`,
        });
      } else {
        const optionToAdd = this._data.options.find(
          (option) => option.cartLabel === modifier
        );
        this._item.modifiers.push({
          basePriceMoney: {
            amount: 0, // because price is already included in total
            currency: "USD",
          },
          name: this._getModifierName(optionToAdd),
        });
      }
    });
  }

  _getModifierName(option) {
    const choiceNames = option.choices.map((choice) => {
      return choice.qty ? `${choice.name} (${choice.qty})` : choice.name;
    });
    return `${choiceNames
      .map((choiceName) => {
        let formattedChoiceName;
        if (option.cartLabel === "Extra Proteins") {
          formattedChoiceName = `Extra ${choiceName}`;
        } else if (
          option.cartLabel === "Veggies" ||
          option.cartLabel === "Bases" ||
          option.cartLabel === "Toppings"
        ) {
          formattedChoiceName = `- ${choiceName}`;
        } else {
          formattedChoiceName = choiceName;
        }
        return formattedChoiceName;
      })
      .join("\n")}`;
  }
}

module.exports = OrderItem;
