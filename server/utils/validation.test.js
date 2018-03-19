const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  
  it('should reject non string values', () => {
    expect(isRealString(1234)).toBe(false);
  });

  it('should reject a string with only spaces', () => {
    expect(isRealString('     ')).toBe(false);
  });

  it('should trim and allow a string with non space characters', () => {
    expect(isRealString('   4r fs fsfdf       ')).toBe(true);
  });
});