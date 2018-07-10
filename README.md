# key-id

> Convert your sensitive IDs to keys before exposing them and get your IDs back from keys.

[![Build Status](https://travis-ci.org/mvuherer/key-id.svg?branch=master)](https://travis-ci.org/mvuherer/key-id)

## What it is for?

Most common is exposing integer IDs as keys.

Instead of having `/users/42`, that indicates how many users or any other sesitive business information you got in sequence, you would end up with `/users/6CD8818A7F3D2BCDA2C85C3F5331D857`, which can then be reverted back to ID `42` upon requests.

## Install

```
$ npm install --save key-id
```


## Usage

```js
const keyId = require('key-id');

const keyA = keyId.idToKey(42);
// => 6CD8818A7F3D2BCDA2C85C3F5331D857
const idA = keyId.keyToId(keyB);
// => 42

// [optional, but recommended] set global private encrypting and decrypting key
keyId.setPrivateKey('private example');

const keyB = keyId.idToKey(42);
// => AF5337DF44490C7F1D7DFEE51108D190
const idB = keyId.keyToId(keyB);
// => 42

// or use specific private key upon conversion
const CUSTOM_KEY = 'my key';
const keyC = keyId.idToKey(42, CUSTOM_KEY);
// => 76F2E44A9D25670BB27E0CC2C133FB0A
const idC = keyId.keyToId(keyC, CUSTOM_KEY);
// => 42
```


## API
**idToKey(value [, privateKey])**

Returns the encrypted string of the provided value.

**keyToId(value [, privateKey])**

Returns the decrypted value of the provided key.

### NOTE
If provided values are invalid it returns `false`.