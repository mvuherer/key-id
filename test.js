const assert = require('assert');

const keyId = require('./');

const ABC_HEX_KEY = '6162636465666768696A6B6C6D6E6F70';
const INTEGER_HEX_KEY = 'C02EA67E2E18DF36481A1E614296A495';
const NON_ALPHANUMERIC_HEX_KEY = '3F94C09BCFD43CDF8021C11EC122E419';
const STRING_HEX_KEY = 'E19E7A078463C3260B86B5574D5C7970';
const CUSTOM_STRING_HEX_KEY = 'EF725806DE5E6ECE96B79BC2C953D1F4';

const CUSTOM_KEY = 'test key';

const INTEGER = 42;
const NON_ALPHANUMERIC = '_@#$^&!.?`\\|//';
const SHORT_STRING = 'foo';

describe('key-id', () => {
  describe('setPrivateKey', () => {
    it('it should return false for undefined', () => {
      assert.equal(keyId.setPrivateKey(), false);
    });

    it('it should return false for null', () => {
      assert.equal(keyId.setPrivateKey(null), false);
    });

    it('it should return false for false', () => {
      assert.equal(keyId.setPrivateKey(false), false);
    });

    it('it should return key for integer', () => {
      assert.equal(keyId.setPrivateKey(INTEGER), '2E2E2E2E2E2E2E2E2E2E2E2E2E2E3432');
    });

    it('it should return key for non-alphanumeric', () => {
      assert.equal(keyId.setPrivateKey(NON_ALPHANUMERIC), '2E2E5F4023245E26212E3F605C7C2F2F');
    });

    it('it should return key for string under 16 bytes', () => {
      assert.equal(keyId.setPrivateKey(SHORT_STRING), '2E2E2E2E2E2E2E2E2E2E2E2E2E666F6F');
    });

    it('it should return key for string for 16 bytes', () => {
      assert.equal(keyId.setPrivateKey('abcdefghijklmnop'), ABC_HEX_KEY);
    });

    it('it should return key for string for over 16 bytes', () => {
      assert.equal(keyId.setPrivateKey('abcdefghijklmnopqrstuvwxyz'), ABC_HEX_KEY);
    });
  });

  describe('idToKey', () => {
    it('it should return false for undefined', () => {
      assert.equal(keyId.idToKey(), false);
    });

    it('it should return false for null', () => {
      assert.equal(keyId.idToKey(null), false);
    });

    it('it should return key for false', () => {
      assert.equal(keyId.idToKey(false), 'D1E2F4E98641C59DF598A4D4BB360279');
    });

    it('it should return key for true', () => {
      assert.equal(keyId.idToKey(true), 'E5ABF6798EB66F8B519768B3B7C8E289');
    });

    it('it should return key for integer', () => {
      assert.equal(keyId.idToKey(INTEGER), INTEGER_HEX_KEY);
    });

    it('it should return key for non-alphanumeric', () => {
      assert.equal(keyId.idToKey(NON_ALPHANUMERIC), NON_ALPHANUMERIC_HEX_KEY);
    });

    it('it should return key for string', () => {
      assert.equal(keyId.idToKey(SHORT_STRING), STRING_HEX_KEY);
    });

    it('it should return key for string with custom private key', () => {
      assert.equal(keyId.idToKey(SHORT_STRING, CUSTOM_KEY), CUSTOM_STRING_HEX_KEY);
    });
  });


  describe('keyToId', () => {
    it('it should return false for undefined', () => {
      assert.equal(keyId.keyToId(), false);
    });

    it('it should return false for null', () => {
      assert.equal(keyId.keyToId(null), false);
    });

    it('it should return false for false', () => {
      assert.equal(keyId.keyToId(false), false);
    });

    it('it should return false for true', () => {
      assert.equal(keyId.keyToId(true), false);
    });

    it('it should return integer for key', () => {
      assert.equal(keyId.keyToId(INTEGER_HEX_KEY), INTEGER);
    });

    it('it should return non-alphanumeric for key', () => {
      assert.equal(keyId.keyToId(NON_ALPHANUMERIC_HEX_KEY), NON_ALPHANUMERIC);
    });

    it('it should return string for key', () => {
      assert.equal(keyId.keyToId(STRING_HEX_KEY), SHORT_STRING);
    });

    it('it should return string for key with custom private key', () => {
      assert.equal(keyId.keyToId(CUSTOM_STRING_HEX_KEY, CUSTOM_KEY), SHORT_STRING);
    });
  });
});