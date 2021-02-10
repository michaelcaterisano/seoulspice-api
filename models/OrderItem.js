const { Console } = require("winston/lib/winston/transports");
const {
  koreanFeastFor2Modifiers,
  koreanFeastFor4Modifiers,
} = require("./KoreanFeastModifiers");

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
      note: this._getItemNotes(),
    };

    if (this._data.type === "entree") {
      this._buildModifiers();
    }
  }

  _buildModifiers() {
    this._item.modifiers = [];
    if (this._isKBBQ()) {
      this._buildKBBQModifiers();
    } else if (this._isKoreanFeast()) {
      this._buildKoreanFeastModifiers();
    } else {
      const modifierCategories = [
        "Bases",
        "Proteins",
        "Veggies",
        "Sauces",
        "Toppings",
        "Extras",
      ];
      modifierCategories.forEach((modifier) => {
        // if no choices for option, send string NO {OPTION}
        if (
          !this._data.options.some((option) => option.cartLabel === modifier)
        ) {
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
  }

  _buildKoreanFeastModifiers() {
    const modifiers = [];
    if (this._data.name === "Korean Feast For 2") {
      this._data.options.forEach((option, index) => {
        if (index === this._getSauceIndex()) {
          modifiers.push("- ALL SAUCES (1 EACH)");
        }
        option.choices.forEach((choice) => {
          modifiers.push(
            koreanFeastFor2Modifiers[choice.name]
              ? koreanFeastFor2Modifiers[choice.name]
              : `${choice.name.toUpperCase()} x ${choice.qty}`
          );
        });
      });
      if (this._data.options.length === 1) {
        modifiers.push("- ALL SAUCES (1 EACH)");
      }
    } else {
      this._data.options.forEach((option, index) => {
        if (index === this._getSauceIndex()) {
          modifiers.push("- ALL SAUCES (2 EACH)");
        }
        option.choices.forEach((choice) => {
          modifiers.push(
            koreanFeastFor4Modifiers[choice.name]
              ? koreanFeastFor4Modifiers[choice.name]
              : `${choice.name.toUpperCase()} x ${choice.qty}`
          );
        });
      });
      if (this._data.options.length === 1) {
        modifiers.push("- ALL SAUCES (2 EACH)");
      }
    }
    modifiers.forEach((modifier) => {
      this._item.modifiers.push({
        basePriceMoney: {
          amount: 0,
          currency: "USD",
        },
        name: modifier,
      });
    });
  }

  _getSauceIndex() {
    let sauceIndex;
    const modifierCategories = this._data.options.map((option) => option.type);

    if (!modifierCategories.includes("veggies")) {
      if (!modifierCategories.includes("proteins")) {
        sauceIndex = modifierCategories.indexOf("bases") + 1;
      } else {
        sauceIndex = modifierCategories.indexOf("proteins") + 1;
      }
    } else {
      sauceIndex = modifierCategories.indexOf("veggies") + 1;
    }
    return sauceIndex;
  }

  _buildKBBQModifiers() {
    let kbbqModifiers;

    if (this._data.name === "Korean BBQ Kit") {
      const defaultModifiers = [
        "- WHITE RICE (2LB)",
        "- RADISH (10oz)",
        "- KIMCHI (10oz)",
        "- SPROUTS (10oz)",
        "- KALE (10oz)",
        "- GARLIC CLOVES (EGG CUP)",
        "- HOT SAUCE (EGG CUP)",
        "- CREAMY SRIRACHA (EGG CUP)",
        "- GINGER-CARROT (EGG CUP)",
        "- SES OIL + SALT (HALF EGG CUP)",
      ];
      if (this._data.signature === "With Grill") {
        defaultModifiers.unshift("- GRILL + TOP + BUTANE");
      }
      const selectedModifiers = this._getKBBQModifiers();
      kbbqModifiers = defaultModifiers.concat(selectedModifiers);
    } else {
      kbbqModifiers = this._getKBBQModifiers();
    }

    kbbqModifiers.forEach((modifier) => {
      this._item.modifiers.push({
        basePriceMoney: {
          amount: 0,
          currency: "USD",
        },
        name: modifier,
      });
    });
  }

  _getKBBQModifiers() {
    const selectedModifiers = [];
    this._data.options.forEach((option) => {
      // check for proteins
      if (option.cartLabel === "Proteins") {
        option.choices.forEach((choice) => {
          selectedModifiers.push(`- RAW ${choice.name.toUpperCase()} (3LB)`);
        });
      }
      // check for additional items
      else if (option.cartLabel === "Additional Items") {
        option.choices.forEach((choice) => {
          selectedModifiers.push(this._getAdditionalItemName(choice));
        });
      }
      // check for extras
      else if (option.cartLabel === "Extras") {
        option.choices.forEach((choice) => {
          selectedModifiers.push(
            `+ ${choice.name.toUpperCase()} x ${choice.qty}`
          );
        });
      }
    });
    return selectedModifiers;
  }

  _getAdditionalItemName(choice) {
    if (
      choice.name === "Uncooked Beef" ||
      choice.name === "Uncooked Chicken" ||
      choice.name === "Uncooked Spicy Pork"
    ) {
      let newName;
      let names = choice.name.split(" ");
      names.splice(0, 1, "Raw");
      newName = names.join(" ");
      return `+ ${newName.toUpperCase()} (PER LB) x ${choice.qty}`;
    } else if (choice.name === "Purple Rice" || choice.name === "White Rice") {
      return `+ ${choice.name.toUpperCase()} (2 LB) x ${choice.qty}`;
    } else if (choice.name === "Japchae Noodles") {
      return `+ NOODLES (2 LB) x ${choice.qty}`;
    } else if (choice.name === "Kimchi") {
      return `+ ${choice.name.toUpperCase()} (10oz)`;
    } else if (
      choice.name === "Korean Hot Sauce" ||
      choice.name === "Creamy Sriracha" ||
      choice.name === "Ginger-Carrot" ||
      choice.name === "Cilantro-Lime Ranch"
    ) {
      return `+ ${choice.name.toUpperCase()} (BOTTLE)`;
    } else if (choice.name === "Extra Butane Gas") {
      return `+ BUTANE GAS (CANISTER) `;
    }
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
      notes = "";
    }
    return notes;
  }

  _getModifierNames(option) {
    const choiceNames = option.choices.map((choice) => {
      return choice.qty
        ? `${this._getCapitalization(choice.name)} x ${choice.qty}`
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
      lowercasedName === "tofu"
    ) {
      formattedName = choiceName.toUpperCase();
    }
    return formattedName;
  }

  _isKoreanFeast() {
    return (
      this._data.name === "Korean Feast For 2" ||
      this._data.name === "Korean Feast For 4"
    );
  }

  _isKBBQ() {
    return (
      this._data.name === "Korean BBQ Kit" ||
      this._data.name === "Korean BBQ Refills"
    );
  }
}

module.exports = OrderItem;
