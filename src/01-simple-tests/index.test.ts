import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 6, action: Action.Add })).toBe(106);
    expect(simpleCalculator({ a: 6, b: 6, action: Action.Add })).toBe(12);
    expect(simpleCalculator({ a: 16, b: 4, action: Action.Add })).toBe(20);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 6, action: Action.Subtract })).toBe(94);
    expect(simpleCalculator({ a: 6, b: 6, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 4, b: 6, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 6, action: Action.Multiply })).toBe(600);
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Multiply })).toBe(1);
    expect(simpleCalculator({ a: 4, b: 9, action: Action.Multiply })).toBe(36);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 60, b: 6, action: Action.Divide })).toBe(10);
    expect(simpleCalculator({ a: 3, b: 1, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 12, b: 3, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(4);
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(27);
    expect(simpleCalculator({ a: 1, b: 30000, action: Action.Exponentiate })).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: null, b: 2, action: Action.Exponentiate })).toBe(null);
    expect(simpleCalculator({ a: 3, b: null, action: Action.Exponentiate })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 2, action: 'unknown' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: [], b: 6, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 5, b: {}, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: '5', b: false, action: Action.Add })).toBe(null);
  });
});
