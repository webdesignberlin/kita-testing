import { expect, describe, test } from 'vitest';
import { tests } from '../../../../src/use/tests';

describe('Tests', async () => {
  test('should return default empty list', async () => {
    expect(tests.value).toEqual([]);
  });
});
