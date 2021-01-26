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
              ? `+ NO ${modifier.toUpperCase()}`
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
      name = `${this._data.name} ${
        this._data.signature ? this._data.signature : ""
      }`;
    } else {
      name = `${this._data.signature ? this._data.signature : ""} ${
        this._data.name
      }`;
    }
    return name.toUpperCase();
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
      return choice.qty
        ? `${this._getCapitalization(choice.name)} x${choice.qty}`
        : this._getCapitalization(choice.name);
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
        formattedChoiceName = `+ ${choiceName}`;
      } else {
        formattedChoiceName = choiceName;
      }
      return formattedChoiceName;
    });
  }

  _getCapitalization(choiceName) {
    let formattedName = choiceName;
    let lowercasedName = choiceName.toLowerCase();
    if (
      lowercasedName === "beef" ||
      lowercasedName === "chicken" ||
      lowercasedName === "spicy pork" ||
      lowercasedName === "tofu" ||
      lowercasedName === "uncooked beef" ||
      lowercasedName === "uncooked chicken" ||
      lowercasedName === "uncooked spicy pork"
    ) {
      formattedName = choiceName.toUpperCase();
    }
    return formattedName;
  }

  _isKBBQ() {
    return (
      this._data.name === "Korean BBQ Kit" ||
      this._data.name === "Korean BBQ Refills"
    );
  }
}

module.exports = OrderItem;
