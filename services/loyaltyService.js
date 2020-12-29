const client = require("./squareClient");
const { loyaltyApi } = client;
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

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
      `Loyalty API Error: Failed to get account. Message: ${error.message}`
    );
  }
};

const createAccount = async (phoneNumber) => {
  const program = await getLoyaltyProgram();
  try {
    const {
      result: { loyaltyAccount },
    } = await loyaltyApi.createLoyaltyAccount({
      loyaltyAccount: {
        mappings: [
          {
            type: "PHONE",
            value: phoneNumber,
          },
        ],
        programId: program.id,
      },
      idempotencyKey: uuidv4(),
    });
    return loyaltyAccount;
  } catch (error) {
    throw new Error(
      `Loyalty API Error. Failed to create loyalty account. Message: ${error.message}`
    );
  }
};

const getLoyaltyProgram = async () => {
  try {
    const {
      result: { programs },
    } = await loyaltyApi.listLoyaltyPrograms();
    return programs && programs.length > 0 ? programs[0] : null; // there is only one loyalty program
  } catch (error) {
    throw new Error(
      `Loyalty API Error: Failed to get loyalty program. Message: ${error.message}`
    );
  }
};

const getReward = async (loyaltyAccount) => {
  const program = await getLoyaltyProgram();
  const {
    id,
    points,
    name,
    definition: { percentageDiscount },
  } = program.rewardTiers[0]; // there is only one reward in this program
  if (loyaltyAccount.balance >= points) {
    return { hasReward: true, name, percentageDiscount, rewardTierId: id };
  } else {
    return false;
  }
};

const createLoyaltyReward = async (
  loyaltyAccountId,
  orderId,
  locationId,
  rewardTierId
) => {
  try {
    const {
      result: { reward },
    } = await loyaltyApi.createLoyaltyReward({
      reward: {
        loyaltyAccountId,
        rewardTierId,
        orderId,
      },
      idempotencyKey: uuidv4(),
    });

    console.log(chalk.yellow(JSON.stringify(reward, null, 2)));

    // redeem reward
    // const response = loyaltyApi.redeemLoyaltyReward(reward.id, {
    //   idempotencyKey: uuidv4(),
    //   locationId,
    // });
    // console.log(JSON.stringify(response, null, 2));
    // return response;
    return { reward };
  } catch (error) {
    throw new Error(
      `Loyalty API Error. Unable to create loyalty reward. Message: ${error.message}`
    );
  }
};

module.exports = { getAccount, getReward, createAccount, createLoyaltyReward };
