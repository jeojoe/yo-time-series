/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { stringToKeyboardPosition } from '../../src/zup_timeseries/string_series'

describe('stringSeries', () => {
  describe('#stringToKeyboardPosition', () => {

    const stringFixture = ['ช้าง', '=hk\'', 'พ่อขุนราม', 'rjv-6oik,'];
    const transformedString = stringFixture.map(stringToKeyboardPosition);

    it('should have the same pattern with a shift for the characters from the same keyboard position', () => {
      const offsetLength = 92;
      expect(transformedString[0]).to.deep.equal(transformedString[1].map(v => v + offsetLength));
      expect(transformedString[2]).to.deep.equal(transformedString[3].map(v => v + offsetLength));
    });
  });
});
