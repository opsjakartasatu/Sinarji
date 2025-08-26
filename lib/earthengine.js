const ee = require('@google/earthengine');
const fs = require('fs');
const path = require('path');

export const initializeEarthEngine = async () => {
  const privateKey = JSON.parse(process.env.EE_JSON);

  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(privateKey, () => {
      ee.initialize(null, null, () => {
        resolve();
      }, (error) => {
        console.error('Failed to initialize Earth Engine:', error);
        reject(error);
      });
    }, (error) => {
      console.error('Authentication failed:', error);
      reject(error);
    });
  });
};
