const cloudinaryTransform = "c_scale,w_300,f_auto,q_auto";

const menuData = {
  categories: [
    {
      name: "Korean BBQ",
      description:
        "Bring home the Korean BBQ experience for a fun, communal experience you can enjoy in the comfort of your home.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/kbbq_rracik.jpg`,
      price: null,
      tags: [],
    },
    {
      name: "Korean Feast For 2",
      description:
        "Let us do the heavy lifting and prepare a complete meal for you and your family! All orders come with an assortment of our four sauces. Serves 2.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/korean-feast_leyysd.jpg`,
      price: 2500,
      tags: [],
    },
    {
      name: "Korean Feast For 4",
      description:
        "Let us do the heavy lifting and prepare a complete meal for you and your family! All orders come with an assortment of our four sauces. Serves 4.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/korean-feast_leyysd.jpg`,
      price: 4000,
      tags: [],
    },
    {
      name: "Bowl",
      description:
        "Build a bowl with your choice of base, proteins, veggies, sauces, and toppings.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/bowl_b1vhvv.jpg`,
      price: 850,
      tags: [],
    },
    {
      name: "Korrito",
      description:
        "The ORIGINAL Korean-style sushi burrito! Your choice of ingredients wrapped in white or purple rice and nori (seaweed).",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/korrito_subb9u.jpg`,
      price: 775,
      tags: [],
    },
    {
      name: "Kid's Bowl",
      description: "A perfectly sized meal for our smaller #SEOULMATES.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/kids-bowl_amtgy6.jpg`,
      price: 550,
      tags: [],
    },
    {
      name: "$6 Signature Sundays",
      description:
        "Enjoy any of your favorite signature combinations for $6, every Sunday!",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/entrees/sunday-signature_twgv7j`,
      price: 600,
      tags: [],
    },
  ],
  signatures: [
    {
      name: "Build Your Own",
      description: "Follow your heart...and your cravings.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/build-your-own_dnsabs.jpg`,
      price: 0,
      tags: [],
    },
    {
      name: "Klassic",
      subtitle: "TRADITIONAL KOREAN FLAVORS",
      description:
        "Beef, sprouts-carrots-cucumbers-kale, korean hot sauce, scallions-sesame seeds-sesame oil.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/klassic_kj8ni5.jpg`,
      price: 299,
      tags: ["beef"],
    },
    {
      name: "Seoul Train",
      subtitle: "EAST MEETS WEST",
      description:
        "Beef, corn-cucumbers-kale-kimchi, creamy sriracha sauce, crispy garlic-cilantro-scallions-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/seoul-train_yhlpjw.jpg`,
      price: 299,
      tags: ["beef"],
    },
    {
      name: "Kimchi Krunch",
      subtitle: "CRUNCHY, PICKLEY, FUNKY",
      description:
        "Chicken, sprouts-carrots-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-cilantro-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/kimchi-krunch_xzzpuy.jpg`,
      price: 249,
      tags: ["chicken"],
    },
    {
      name: "Southwest",
      subtitle: "SOUTHWESTERN FLAVORS",
      description:
        "Chicken, corn-carrots-kale, cilantr-lime ranch sauce, crispy garlic-cilantro-scallions.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/southwest_tsgjpc.jpg`,
      price: 249,
      tags: ["chicken"],
    },
    {
      name: "Fireball",
      subtitle: "UNAPOLOGETICALLY SPICY",
      description:
        "Spicy pork, corn-radish-kale-kimchi, korean hot sauce, creamy sriracha sauce, crispy garlic-scallions-sesame seeds-fire powder.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/fireball_ob1b8c.jpg`,
      price: 279,
      tags: ["pork"],
    },
    {
      name: "Herbivore",
      subtitle: "A VEGAN DELIGHT",
      description:
        "Tofu, sprouts-corn-carrots-cucumbers-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-scallions-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/herbivore_qfscrr.jpg`,
      price: 229,
      tags: ["tofu"],
    },
  ],
  sundaySignatures: [
    {
      name: "Klassic",
      subtitle: "TRADITIONAL KOREAN FLAVORS",
      description:
        "Beef, sprouts-carrots-cucumbers-kale, korean hot sauce, scallions-sesame seeds-sesame oil.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/klassic_kj8ni5.jpg`,
      price: 0,
      tags: ["beef"],
    },
    {
      name: "Seoul Train",
      subtitle: "EAST MEETS WEST",
      description:
        "Beef, corn-cucumbers-kale-kimchi, creamy sriracha sauce, crispy garlic-cilantro-scallions-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/seoul-train_yhlpjw.jpg`,
      price: 0,
      tags: ["beef"],
    },
    {
      name: "Kimchi Krunch",
      subtitle: "CRUNCHY, PICKLEY, FUNKY",
      description:
        "Chicken, sprouts-carrots-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-cilantro-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/kimchi-krunch_xzzpuy.jpg`,
      price: 0,
      tags: [],
    },
    {
      name: "Southwest",
      subtitle: "SOUTHWESTERN FLAVORS",
      description:
        "Chicken, corn-carrots-kale, cilantr-lime ranch sauce, crispy garlic-cilantro-scallions.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/southwest_tsgjpc.jpg`,
      price: 0,
      tags: [],
    },
    {
      name: "Fireball",
      subtitle: "UNAPOLOGETICALLY SPICY",
      description:
        "Spicy pork, corn-radish-kale-kimchi, korean hot sauce, creamy sriracha sauce, crispy garlic-scallions-sesame seeds-fire powder.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/fireball_ob1b8c.jpg`,
      price: 0,
      tags: [],
    },
    {
      name: "Herbivore",
      subtitle: "A VEGAN DELIGHT",
      description:
        "Tofu, sprouts-corn-carrots-cucumbers-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-scallions-sesame seeds.",
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/signatures/herbivore_qfscrr.jpg`,
      price: 0,
      tags: [],
    },
  ],
  kbbqTypes: [
    {
      name: "Korean BBQ Kit",
      subtitle: "",
      description: "Includes a tabletop grill and grill plate (yours to keep).",
      detail: "With Grill",
      imageUrl: "",
      price: 9900,
      tags: [],
    },
    {
      name: "Korean BBQ Kit",
      subtitle: "",
      description: "Without the grill and grill plate.",
      detail: "No Grill",
      imageUrl: "",
      price: 6000,
      tags: [],
    },
    {
      name: "Korean BBQ Refills",
      subtitle: "",
      description: "Order additional items ala carte.",
      detail: null,
      imageUrl: "",
      price: null,
      tags: [],
    },
  ],
  options: [
    {
      type: "bases",
      label: "Choose your base",
      max: 2,
      KFmax: 1,
      cartLabel: "Bases",
      choices: [
        {
          name: "White Rice",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/white-rice_oa0vya.jpg`,
          tags: [],
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/purple-rice_hxr1vw.jpg`,
          tags: [],
        },
        {
          name: "Noodles",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/noodles_zamq8r.jpg`,
          tags: [],
        },
        {
          name: "Salad",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/salad_fkvauj.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "rices",
      label: "Choose your rice",
      max: 1,
      cartLabel: "Bases",
      choices: [
        {
          name: "White Rice",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/white-rice_oa0vya.jpg`,
          tags: [],
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/purple-rice_hxr1vw.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "proteins",
      label: "Pick your protein",
      max: 1,
      cartLabel: "Proteins",
      choices: [
        {
          name: "Beef",
          price: 299,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/beef_vhmzxi.jpg`,
          tags: ["beef"],
        },
        {
          name: "Chicken",
          price: 249,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/chicken_gbew64.jpg`,
          tags: [],
        },
        {
          name: "Spicy Pork",
          price: 279,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/spicy-pork_cj6adp.jpg`,
          tags: [],
        },
        {
          name: "Tofu",
          price: 229,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/tofu_h5uzl0.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "kbbq-proteins",
      label: "Pick your protein",
      max: 1,
      cartLabel: "Proteins",
      choices: [
        {
          name: "Beef",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/beef_vhmzxi.jpg`,
          tags: ["beef"],
        },
        {
          name: "Chicken",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/chicken_gbew64.jpg`,
          tags: [],
        },
        {
          name: "Spicy Pork",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/spicy-pork_cj6adp.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "extra proteins",
      label: "Choose your extra protein",
      cartLabel: "Extra Proteins",
      max: 4,
      choices: [
        {
          name: "Beef",
          price: 299,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/beef_vhmzxi.jpg`,
          tags: ["beef"],
        },
        {
          name: "Chicken",
          price: 249,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/chicken_gbew64.jpg`,
          tags: [],
        },
        {
          name: "Spicy Pork",
          price: 279,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/spicy-pork_cj6adp.jpg`,
          tags: [],
        },
        {
          name: "Tofu",
          price: 229,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/tofu_h5uzl0.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "veggies",
      label: "Pick your veggies",
      cartLabel: "Veggies",
      max: 7,
      KFmax: 4,
      choices: [
        {
          name: "Cucumbers",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/cucumbers_ccv5ee.jpg`,
          tags: [],
        },
        {
          name: "Corn",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/corn_yhtkds.jpg`,
          tags: [],
        },
        {
          name: "Korean Radish",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/radish_uzvvzv.jpg`,
          tags: [],
        },
        {
          name: "Carrots",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/carrots_ndtoi5.jpg`,
          tags: [],
        },
        {
          name: "Bean Sprouts",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/sprouts_c62biy.jpg`,
          tags: [],
        },
        {
          name: "Kimchi",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/kimchi_qqsyyo.jpg`,
          tags: [],
        },
        {
          name: "Kale",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/kale_r1av43.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "sauces",
      label: "Pick your sauces",
      cartLabel: "Sauces",
      max: 2,
      choices: [
        {
          name: "Korean Hot Sauce",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/korean-hot-sauce_yy1imr.jpg`,
          tags: [],
        },
        {
          name: "Creamy Sriracha",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/creamy-sriracha_a2v32l.jpg`,
          tags: [],
        },
        {
          name: "Ginger-Carrot",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/ginger-carrot_a1t804.jpg`,
          tags: [],
        },
        {
          name: "Cilantro-Lime Ranch",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/cilantro-lime-ranch_rhk2n6.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: 6,
      choices: [
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/scallions_htughg.jpg`,
          tags: [],
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/cilantro_mmx5mh.jpg`,
          tags: [],
        },
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/crispy-garlic_ahoerx.jpg`,
          tags: [],
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/sesame-seeds_zr6hr5.jpg`,
          tags: [],
        },
        {
          name: "Fire Powder",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/fire-powder_q6dayu.jpg`,
          tags: [],
        },
        {
          name: "Sesame Oil",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/sesame-oil_ftlnsa.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "korean feast toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: 4,
      choices: [
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/scallions_htughg.jpg`,
          tags: [],
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/cilantro_mmx5mh.jpg`,
          tags: [],
        },
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/crispy-garlic_ahoerx.jpg`,
          tags: [],
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/toppings/sesame-seeds_zr6hr5.jpg`,
          tags: [],
        },
      ],
    },
    {
      type: "kbbq-sides",
      label: "Additional Items",
      cartLabel: "Additional Items",
      max: Infinity,
      choices: [
        {
          name: "Uncooked Beef",
          subtitle: "per pound",
          description:
            "Thin-sliced ribeye marinated in our sweet and savory bulgogi marinade.",
          price: 1500,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/beef_vhmzxi.jpg`,
          qty: 0,
          tags: ["beef"],
        },
        {
          name: "Uncooked Chicken",
          subtitle: "per pound",
          description:
            "Local chicken, marinated in a soy-garlic-ginger marinade.",
          price: 1200,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/chicken_gbew64.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Uncooked Spicy Pork",
          subtitle: "per pound",
          description:
            "Thin-sliced pork marinated in a sweet-spicy chili marinade.",
          price: 1300,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/proteins/spicy-pork_cj6adp.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Purple Rice",
          subtitle: "feeds 3-4",
          description:
            "Multi-grain blend of forbidden black rice and sushi-grade white rice.",
          price: 500,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/purple-rice_hxr1vw.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "White Rice",
          subtitle: "feeds 3-4",
          description: "Perfectly cooked sushi-grade white rice.",
          price: 500,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/white-rice_oa0vya.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Japchae Noodles",
          subtitle: "feeds 3-4",
          description:
            "Delicious chewy gluten-free noodles tossed with kale, carrots, roasted sesame seeds, and a garlic-ginger-soy-sesame marinade.",
          price: 800,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/bases/noodles_zamq8r.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Kimchi",
          subtitle: "12oz",
          description:
            "A Shin family recipe, passed down four generations! Korean cabbage pickled in chilis, ginger, and garlic. Vegan-friendly!",
          price: 600,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/veggies/kimchi_qqsyyo.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Korean Hot Sauce",
          subtitle: "12oz bottle",
          description:
            "Spicy and earthy, traditional Gochujang paste with the sweet umami of miso.",
          price: 799,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/korean-hot-sauce_yy1imr.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Creamy Sriracha",
          subtitle: "12oz bottle",
          description:
            "Chili-garlic aioli made from everyone’s favorite chili sauce.",
          price: 799,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/creamy-sriracha_a2v32l.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Ginger-Carrot",
          subtitle: "12oz bottle",
          description:
            "Crisp and vibrant, beaming with fresh ginger and carrots.",
          price: 799,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/ginger-carrot_a1t804.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Cilantro-Lime Ranch",
          subtitle: "12oz bottle",
          description:
            "Creamy ranch bursting with the brightness of fresh cilantro and lime.",
          price: 799,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/sauces/cilantro-lime-ranch_rhk2n6.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "Extra Butane Gas",
          subtitle: "Canister",
          description: "Add more fuel to the fire!",
          price: 300,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/additional-items/butane_szmvzi.jpg`,
          qty: 0,
          tags: [],
        },
      ],
    },
    {
      type: "extras",
      label: "Extras?",
      cartLabel: "Extras",
      max: Infinity,
      choices: [
        {
          name: "The Egg",
          description:
            "Perfectly set white, liquid-gold yolk marinated in a sweet-soy base.",
          price: 199,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/extras/the-egg_wdncva.jpg`,
          qty: 0,
          tags: [],
        },
        {
          name: "FREE EGG",
          description: "Free egg",
          price: 0,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/extras/the-egg_wdncva.jpg`,
          qty: 0,
          complimentary: true,
          tags: [],
        },
        {
          name: "Avocado",
          description:
            "This nutrient-packed superfood adds a rich, buttery flavor to anything.",
          price: 189,
          selected: false,
          imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/extras/avocado_clmvap.jpg`,
          qty: 0,
          tags: [],
        },
      ],
    },
  ],

  drinks: [
    {
      name: "Kale Apple",
      description: "Fresh pressed apples and kale.",
      price: 199,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/kale-apple_dbc1jr.jpg`,
      tags: [],
    },
    {
      name: "Yuzu Lime",
      description: "Yuzu + lime juice, sweetened with a touch of honey.",
      price: 99,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/yuzu-lime_aihwcz.jpg`,
      tags: [],
    },
    {
      name: "Sac-Sac Grape",
      description: "Nostalgic Korean juice beverage with real fruit.",
      price: 199,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/sac-sac_vxprdq.jpg`,
      tags: [],
    },
    {
      name: "Sac-Sac Orange",
      description: "Nostalgic Korean juice beverage with real fruit.",
      price: 199,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/sac-sac_vxprdq.jpg`,
      tags: [],
    },
    {
      name: "Cherry Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/bubly_ey1sn0.jpg`,
      tags: [],
    },
    {
      name: "Blackberry Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/bubly_ey1sn0.jpg`,
      tags: [],
    },
    {
      name: "Grapefruit Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/bubly_ey1sn0.jpg`,
      tags: [],
    },
    {
      name: "Mango Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/bubly_ey1sn0.jpg`,
      tags: [],
    },
    {
      name: "Givn Water",
      description:
        "Every bottle purchased provides clean water to people in need.",
      price: 200,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/drinks/givn_u63cv4.jpg`,
      tags: [],
    },
  ],
  desserts: [
    {
      name: "Chewy Chocolate Chip Cookie",
      description:
        "Soft, chewy, and buttery gluten-free chocolate chip cookies from our friends at Rise Bakery in Adams Morgan.",
      price: 259,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/desserts/cookie_adwep1.jpg`,
      tags: [],
    },
    {
      name: "Rice Krispie Treat",
      description:
        "Delightfully sweet and chewy gluten-free rice krispie treats from our friends at Rise Bakery in Adams Morgan.",
      price: 299,
      qty: 0,
      imageUrl: `https://res.cloudinary.com/seoulspice/image/upload/${cloudinaryTransform}/seoulspice/desserts/rice-krispie-treat_ivr4gp.jpg`,
      tags: [],
    },
  ],
};

module.exports = menuData;
