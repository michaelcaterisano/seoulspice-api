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
      name: this._getItemName(),
      note: this._data.notes.length
        ? `** ${this._data.notes.map((note) => note.toUpperCase()).join(", ")}`
        : "",
    };

    if (this._data.type === "entree") {
      this._buildModifiers();
    }
  }

  _buildModifiers() {
    let optionalModifiers;
    this._item.modifiers = [];
    if (this._isKBBQ()) {
      optionalModifiers = ["Proteins", "Sides", "Extras"];
    } else {
      optionalModifiers = [
        "Bases",
        "Proteins",
        "Veggies",
        "Sauces",
        "Toppings",
        "Extras",
      ];
    }
    optionalModifiers.forEach((modifier) => {
      // if no choices for option, send string NO {OPTION}
      if (!this._data.options.some((option) => option.cartLabel === modifier)) {
        this._item.modifiers.push({
          basePriceMoney: {
            amount: 0, // because price is already included in total
            currency: "USD",
          },
          name:
            modifier === "Veggies" ||
            modifier === "Toppings" ||
            modifier === "Sides"
              ? `- NO ${modifier.toUpperCase()}`
              : `NO ${modifier.toUpperCase()}`,
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
  _getItemName() {
    let name;
    if (this._isKBBQ()) {
      if (this._data.name === "Korean BBQ Refills") {
        name = "Korean BBQ Refills";
      } else {
        name = `${this._data.name} (${this._data.signature})`;
      }
    } else {
      name = `${this._data.signature ? this._data.signature + " " : ""}${
        this._data.name
      }`;
    }
    return name;
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
          option.cartLabel === "Toppings" ||
          option.cartLabel === "Sides"
        ) {
          formattedChoiceName = `- ${choiceName}`;
        } else {
          formattedChoiceName = choiceName;
        }
        return formattedChoiceName;
      })
      .join("\n")}`;
  }
  _isKBBQ() {
    return this._data.name === "Korean BBQ At Home Kit" || "Korean BBQ Refills";
  }
}

module.exports = OrderItem;
