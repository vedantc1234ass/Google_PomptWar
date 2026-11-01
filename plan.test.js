const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('../netlify/functions/plan.js');

test('rejects non-POST', async () => {
  assert.strictEqual((await handler({ httpMethod: 'GET' })).statusCode, 405);
});
test('rejects invalid JSON', async () => {
  assert.strictEqual((await handler({ httpMethod: 'POST', body: '{bad' })).statusCode, 400);
});
test('rejects empty and oversized prompts', async () => {
  assert.strictEqual((await handler({ httpMethod: 'POST', body: JSON.stringify({ prompt: '' }) })).statusCode, 400);
  assert.strictEqual((await handler({ httpMethod: 'POST', body: JSON.stringify({ prompt: 'x'.repeat(9000) }) })).statusCode, 400);
});
