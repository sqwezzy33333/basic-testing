
import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 6, action: Action.Add, expected: 11 },
  { a: 6, b: 6, action: Action.Add, expected: 12 },
  { a: 1, b: 2, action: Action.Add, expected: 3 },

  { a: 8, b: 2, action: Action.Subtract, expected: 6 },
  { a: 18, b: 2, action: Action.Subtract, expected: 16 },
  { a: 6, b: 5, action: Action.Subtract, expected: 1 },

  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 6, b: 5, action: Action.Multiply, expected: 30 },
  { a: 18, b: 2, action: Action.Multiply, expected: 36 },


  { a: 16, b: 1, action: Action.Divide, expected: 16 },
  { a: 30, b: 5, action: Action.Divide, expected: 6 },
  { a: 16, b: 2, action: Action.Divide, expected: 8 },

  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },

  { a: 5, b: 6, action: 'unknownAction', expected: null },
  { a: 2, b: 3, action: true, expected: null },

  { a: '5', b: 6, action: 'undefined', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({ a: $a, b: $b, action: $action })',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
