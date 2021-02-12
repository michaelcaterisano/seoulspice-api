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

  /******************** MODIFIER BUILDERS ********************/

  _buildModifiers() {
    this._item.modifiers = [];
    if (this._isKBBQ()) {
      this._buildKBBQModifiers();
    } else if (this._isKoreanFeast()) {
      this._buildKoreanFeastModifiers();
    } else if (this._isBowl()) {
      this._buildBowlModifiers();
    } else if (this._isKorrito()) {
      this._buildKorritoModifiers();
    } else if (this._isKidsBowl()) {
      this._buildKidsBowlModifiers();
    }
  }

  _buildEntreeModifiers(modifiers) {
    modifiers.forEach((modifier) => {
      // if no choices for option, send string NO {OPTION}
      if (!this._data.options.some((option) => option.cartLabel === modifier)) {
        let modifierName;
        switch (true) {
          case modifier === "Veggies":
            modifierName = `+ NO ${modifier.toUpperCase()}`;
            break;
          case modifier === "Toppings":
            modifierName = `+ NO ${modifier.toUpperCase()}`;
            break;
          default:
            modifierName = `NO ${modifier.toUpperCase()}`;
        }
        if (modifier !== "Extras" && modifier !== "Extra Proteins") {
          this._item.modifiers.push({
            basePriceMoney: {
              amount: 0, // because price is already included in total
              currency: "USD",
            },
            name: modifierName,
          });
        }
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

  _buildBowlModifiers() {
    const modifiers = this._isBuildYourOwn()
      ? [
          "Bases",
          "Proteins",
          "Extra Proteins",
          "Veggies",
          "Sauces",
          "Toppings",
          "Extras",
        ]
      : ["Bases", "Extra Proteins", "Extras"];
    this._buildEntreeModifiers(modifiers);
  }

  _buildKorritoModifiers() {
    const modifiers = this._isBuildYourOwn()
      ? [
          "Bases",
          "Proteins",
          "Extra Proteins",
          "Veggies",
          "Sauces",
          "Toppings",
          "Extras",
        ]
      : ["Bases", "Extra Proteins", "Extras"];
    this._buildEntreeModifiers(modifiers);
  }

  _buildKidsBowlModifiers() {
    const modifiers = [
      "Bases",
      "Proteins",
      "Veggies",
      "Sauces",
      "Toppings",
      "Extras",
    ];
    this._buildEntreeModifiers(modifiers);
  }

  _buildKBBQModifiers() {
    let kbbqModifiers;

    if (this._data.name === "Korean BBQ Kit") {
      const defaultModifiers = [];
      const bases = ["- WHITE RICE (2LB)"];
      const remainingDefaults = [
        "- GARLIC CLOVES (EGG CUP)",
        "- HOT SAUCE (EGG CUP)",
        "- CREAMY SRIRACHA (EGG CUP)",
        "- GINGER-CARROT (EGG CUP)",
        "- SES OIL + SALT (HALF EGG CUP)",
      ];
      if (this._data.signature === "With Grill") {
        defaultModifiers.push("- GRILL + TOP + BUTANE");
      }
      const veggies = this._getKBBQVeggies();
      const proteins = this._getKBBQProteins();
      const additionsAndExtras = this._getKBBQAdditionsAndExtras();
      kbbqModifiers = defaultModifiers.concat(
        bases,
        veggies,
        remainingDefaults,
        proteins,
        additionsAndExtras
      );
    } else {
      kbbqModifiers = this._getKBBQAdditionsAndExtras();
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

  /******************** ENTREE BOOLEANS ********************/

  _isBowl() {
    return this._data.name === "Bowl";
  }

  _isKorrito() {
    return this._data.name === "Korrito";
  }

  _isKidsBowl() {
    return this._data.name === "Kid's Bowl";
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

  _isBuildYourOwn() {
    return this._data.signature === "Build Your Own";
  }

  /******************** UTILS ********************/

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

  _getKBBQVeggies() {
    const selectedModifiers = [];
    this._data.options.forEach((option) => {
      if (option.cartLabel === "Veggies") {
        option.choices.forEach((choice) => {
          selectedModifiers.push(`- ${choice.name.toUpperCase()} (10oz)`);
        });
      }
    });
    return selectedModifiers;
  }

  _getKBBQProteins() {
    const selectedModifiers = [];
    this._data.options.forEach((option) => {
      if (option.cartLabel === "Proteins") {
        option.choices.forEach((choice) => {
          selectedModifiers.push(`- RAW ${choice.name.toUpperCase()} (3LB)`);
        });
      }
    });
    return selectedModifiers;
  }

  _getKBBQAdditionsAndExtras() {
    const selectedModifiers = [];
    this._data.options.forEach((option) => {
      // check for additional items
      if (option.cartLabel === "Additional Items") {
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
        formattedChoiceName = `EXTRA ${choiceName}`;
      } else if (
        option.cartLabel === "Veggies" ||
        option.cartLabel === "Bases" ||
        option.cartLabel === "Toppings"
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
}

module.exports = OrderItem;
