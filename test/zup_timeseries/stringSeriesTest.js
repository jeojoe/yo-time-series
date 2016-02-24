/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { stringToKeyboardPosition, findCharPosition } from '../../src/zup_timeseries/string_series'

describe('stringSeries', () => {
  describe('#findCharPosition', () => {
    const simpleQwerty = [
      'qwerty',
      'asdfg',
      'zxcvb'
    ];

    it('should return keyboard layout position of a particular character', () => {
      expect(findCharPosition('q', simpleQwerty)).to.deep.equal({ x: 0, y: 0 });
      expect(findCharPosition('b', simpleQwerty)).to.deep.equal({ x: 4, y: 2 });
      expect(findCharPosition('d', simpleQwerty)).to.deep.equal({ x: 2, y: 1 });
      expect(findCharPosition(' ', simpleQwerty)).to.deep.equal({ x: -1, y: -1 });
    });
  });

  describe('#stringToKeyboardPosition', () => {
    it('transform string to a two dimensional time series data', () => {
      expect(stringToKeyboardPosition("!QS")).to.deep.equal([
        { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 2, z: 0 }
      ]);
      expect(stringToKeyboardPosition("๑๐ฆ")).to.deep.equal([
        { x: 1, y: 0, z: 1 }, { x: 0, y: 1, z: 1 }, { x: 1, y: 2, z: 1 }
      ]);
      expect(stringToKeyboardPosition("!Qฆ")).to.deep.equal([
        { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 2, z: 1 }
      ]);
    });
  });
});
