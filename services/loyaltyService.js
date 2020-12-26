const client = require("./squareClient");

const searchLoyaltyAccounts = async (type, value) => {
  try {
    const result = await client.loyaltyApi.searchLoyaltyAccounts({
      query: {
        mappings: [
          {
            type,
            value,
          },
        ],
      },
    });
    return { success: true, body: result };
  } catch (error) {
    return { success: false, body: error };
  }
};

module.exports = { searchLoyaltyAccounts };
