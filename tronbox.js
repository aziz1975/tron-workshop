require('dotenv').config();

module.exports = {
  networks: {
    nile: {
      privateKey: process.env.NILE_PRIVATE_KEY_A,
      consume_user_resource_percent: 50,
      fee_limit: 1e9,
      fullHost: process.env.NILE_FULL_HOST,
      network_id: '*',
    },
  },
  compilers: {
    solc: {
      version: "0.8.25",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "shanghai",
      },
    },
  }

};
