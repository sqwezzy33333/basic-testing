import { generateLinkedList } from './index';

const elements = [1, 3, 5];

describe('generateLinkedList', () => {

  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(elements);
    const validLinkedList = {
      value: 1,
      next: {
        value: 3,
        next: {
          value: 5,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(result).toStrictEqual(validLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
