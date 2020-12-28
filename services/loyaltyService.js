const client = require("./squareClient");
const { loyaltyApi } = client;
const asyncHandler = require("express-async-handler");

// const addLoyaltyPoint = async (
//   phoneNumber,
//   orderId,
//   locationId,
//   program
// ) => {};

const getAccount = async (phoneNumber) => {
  try {
    const {
      result: { loyaltyAccounts },
    } = await loyaltyApi.searchLoyaltyAccounts({
      query: {
        mappings: [
          {
            type: "PHONE",
            value: phoneNumber,
          },
        ],
      },
    });
    return loyaltyAccounts ? loyaltyAccounts[0] : null;
  } catch (error) {
    throw new Error(
      "Loyalty API Error: Failed to get account. Message: " + error.message
    );
  }
};

const getLoyaltyProgram = async () => {
  const {
    result: { programs },
  } = await loyaltyApi.listLoyaltyPrograms();
  return programs && programs.length > 0 ? programs[0] : null; // there is only one loyalty program
};

getRewards = async (loyaltyAccount) => {
  const program = getLoyaltyProgram();
  if (program) {
    const reward = program.rewardTiers[0]; // there is only one reward in this program
    const {
      id,
      name,
      definition: { percentageDiscount },
    } = reward;
  }
};

module.exports = { getAccount, getLoyaltyProgram };
