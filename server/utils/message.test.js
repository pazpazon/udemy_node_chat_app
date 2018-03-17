const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generteMessage', () => {
  it('should generate correct message object', () => {
    let message = generateMessage('testFrom', 'testText');
    expect(typeof message).toBe('object');
    expect(message).toMatchObject(message);
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    let lat = 123231, lon = 45654;
    let location = generateLocationMessage('Admin', lat, lon);
    expect(typeof location).toBe('object');
    expect(location.from).toBe('Admin');
    expect(typeof location.createdAt).toBe('number');
    expect(location.url).toBe(`https://www.google.com/maps/?q=${lat},${lon}`);
  });
});