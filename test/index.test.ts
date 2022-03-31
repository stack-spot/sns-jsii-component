import * as index from '../lib/index';

describe('Index', () => {
  test('export Sns class', () => {
    const classes = Object.keys(index);
    expect(classes).toContain('Sns');
  });
});
