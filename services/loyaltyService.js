const client = require("./squareClient");
const { loyaltyApi } = client;
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const accumulateLoyaltyPoint = async (phoneNumber, orderId, locationId) => {
  try {
    const loyaltyAccount = await getLoyaltyAccount(phoneNumber);
    if (!loyaltyAccount) {
      return false;
    }
    const response = await loyaltyApi.accumulateLoyaltyPoint(
      loyaltyAccount.id,
      {
        accumulatePoints: {
          points: 1,
          orderId,
        },
        idempotencyKey: uuidv4(),
        locationId,
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      `Loyalty API Error. Faild to accumulate loyalty point. Message: ${error.message}`
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

const createLoyaltyReward = async (phoneNumber, orderId) => {
  try {
    const loyaltyAccount = await getLoyaltyAccount(phoneNumber);
    const { rewardTierId } = await getRewardTierInfo(phoneNumber);
    const {
      result: { reward },
    } = await loyaltyApi.createLoyaltyReward({
      reward: {
        loyaltyAccountId: loyaltyAccount.id,
        rewardTierId,
        orderId,
      },
      idempotencyKey: uuidv4(),
    });
    return reward;
  } catch (error) {
    throw new Error(
      `Loyalty API Error. Unable to create loyalty reward. Message: ${error.message}`
    );
  }
};

const getLoyaltyAccount = async (phoneNumber) => {
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

const getAccountRewards = async (phoneNumber) => {
  try {
    let loyaltyAccount = await getLoyaltyAccount(phoneNumber);
    if (!loyaltyAccount) {
      console.log("no account");
      loyaltyAccount = await createAccount(phoneNumber);
      console.log(loyaltyAccount);
    }
    const program = await getLoyaltyProgram();
    const {
      id,
      points,
      name,
      definition: { percentageDiscount },
    } = program.rewardTiers[0]; // there is only one reward in this program
    if (loyaltyAccount.balance >= points) {
      return {
        hasReward: true,
        accountBalance: loyaltyAccount.balance,
        name,
        percentageDiscount,
        rewardTierId: id,
      };
    } else {
      return {
        hasReward: false,
      };
    }
  } catch (error) {
    `Loyalty API Error. Could not get rewards info. Message: ${error.message}`;
  }
};

const getRewardTierInfo = async () => {
  try {
    const program = await getLoyaltyProgram();
    const {
      id,
      points,
      name,
      definition: { percentageDiscount },
    } = program.rewardTiers[0]; // there is only one reward in this program
    return { rewardTierId: id, points, name, percentageDiscount };
  } catch (error) {
    `Loyalty API Error. Could not get reward tier id. Message: ${error.message}`;
  }
};

const redeemLoyaltyReward = async (rewardId, locationId) => {
  console.log({ rewardId, locationId });
  try {
    const { result } = await loyaltyApi.redeemLoyaltyReward(rewardId, {
      idempotencyKey: uuidv4(),
      locationId,
    });
    return result;
  } catch (error) {
    throw new Error(
      `Loyalty api Error. Unable to redeem loyalty reward. Message: ${error.message}`
    );
  }
};

const deleteLoyaltyReward = async (rewardId) => {
  try {
    const { result } = await loyaltyApi.deleteLoyaltyReward(rewardId);
  } catch (error) {
    throw new Error(
      `Loyalty API Error. Unable to delete loyalty reward. Message: ${error.message}`
    );
  }
};

module.exports = {
  // getLoyaltyAccount,
  getAccountRewards,
  createAccount,
  createLoyaltyReward,
  redeemLoyaltyReward,
  accumulateLoyaltyPoint,
};
