const expect = require('expect');

const {generateMessage} = require('./message');

describe('generteMessage', () => {
  it('should generate correct message object', () => {
    let message = generateMessage('testFrom', 'testText');
    expect(typeof message).toBe('object');
    expect(message).toMatchObject(message);
    expect(typeof message.createdAt).toBe('number');
  });
});