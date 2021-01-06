const client = require("./squareClient");
const { loyaltyApi } = client;
const { v4: uuidv4 } = require("uuid");
const { phoneNumberIsValid } = require("../utils/utils");

const accumulateLoyaltyPoints = async ({
  phoneNumber,
  orderId,
  locationId,
}) => {
  try {
    let loyaltyAccount = await getLoyaltyAccount(phoneNumber);
    if (!loyaltyAccount) {
      loyaltyAccount = await createAccount(phoneNumber);
    }
    const response = await loyaltyApi.accumulateLoyaltyPoints(
      loyaltyAccount.id,
      {
        accumulatePoints: {
          // points: 1,
          orderId,
        },
        idempotencyKey: uuidv4(),
        locationId,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.errors[0].detail);
  }
};

const createAccount = async (phoneNumber) => {
  const program = await getLoyaltyProgram();
  try {
    const result = await loyaltyApi.createLoyaltyAccount({
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
  } catch (error) {
    throw new Error(error.errors[0].detail);
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
      `Loyalty Service createLoyaltyReward failed. Error: ${error.errors[0].detail}`
    );
  }
};

const getLoyaltyAccount = async (phoneNumber) => {
  if (!phoneNumberIsValid(phoneNumber)) {
    throw new Error(
      "Loyalty Service getLoyaltyAccount failed. Error: Invalid phone number."
    );
  }
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
      `Loyalty API searchLoyaltyAccounts failed. Error: ${error.errors[0].detail}`
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
      `Loyalty API listLoyaltyPrograms failed. ${error.errors[0].detail}`
    );
  }
};

const getAccountRewards = async (phoneNumber) => {
  try {
    let loyaltyAccount = await getLoyaltyAccount(phoneNumber);
    if (!loyaltyAccount) {
      loyaltyAccount = await createAccount(phoneNumber);
      return { hasReward: false, newAccount: true, loyaltyAccount };
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
        newAccount: false,
        accountBalance: loyaltyAccount.balance,
        name,
        percentageDiscount,
        // rewardTierId: id,
      };
    } else {
      return {
        hasReward: false,
        newAccount: false,
      };
    }
  } catch (error) {
    throw new Error(`Loyalty Service getAccountRewards failed. ${error}`);
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
    throw new Error(error.errors[0].detail);
  }
};

const redeemLoyaltyReward = async (rewardId, locationId) => {
  try {
    const { result } = await loyaltyApi.redeemLoyaltyReward(rewardId, {
      idempotencyKey: uuidv4(),
      locationId,
    });
    return result;
  } catch (error) {
    throw new Error(error.errors[0].detail);
  }
};

const deleteLoyaltyReward = async (rewardId) => {
  try {
    const { result } = await loyaltyApi.deleteLoyaltyReward(rewardId);
  } catch (error) {
    throw new Error(error.errors[0].detail);
  }
};

module.exports = {
  getAccountRewards,
  createAccount,
  createLoyaltyReward,
  redeemLoyaltyReward,
  accumulateLoyaltyPoints,
};
