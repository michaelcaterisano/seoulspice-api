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
      note: "",
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
        const modifierNames = this._getModifierNames(optionToAdd);
        modifierNames.forEach((name) => {
          this._item.modifiers.push({
            basePriceMoney: {
              amount: 0, // because price is already included in total
              currency: "USD",
            },
            name,
          });
        });
      }
    });
  }
  _getItemName() {
    let name;
    if (this._isKBBQ()) {
      if (this._data.name === "Korean BBQ Refills") {
        name = "Korean BBQ Refills";
      } else if (this._data.signature === "Without the grill.") {
        name = `${this._data.name} (NO GRILL)`;
      } else if (this._data.signature === "Includes tabletop grill.") {
        name = `${this._data.name} (WITH GRILL)`;
      }
    } else {
      name = `${this._data.signature ? this._data.signature + " " : ""}${
        this._data.name
      }`;
    }
    return name;
  }

  _getItemNotes() {
    let notes;
    if (this._data.notes) {
      notes = this._data.notes.length
        ? `** ${this._data.notes.map((note) => note.toUpperCase()).join(", ")}`
        : "";
    } else {
      notes = this._getItemNotes();
    }
    return notes;
  }

  _getModifierNames(option) {
    const choiceNames = option.choices.map((choice) => {
      return choice.qty ? `${choice.name} (${choice.qty})` : choice.name;
    });
    return choiceNames.map((choiceName) => {
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
    });
  }
  _isKBBQ() {
    return (
      this._data.name === "Korean BBQ At Home Kit" ||
      this._data.name === "Korean BBQ Refills"
    );
  }
}

module.exports = OrderItem;
