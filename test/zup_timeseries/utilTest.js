/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { DTW } from '../../src/zup_timeseries/util'

describe('util', () => {
  describe('#DTW', () => {

    const stringFixture = ['supanat', 'supanat', 's'];
    const transformedString = stringFixture;

    it('should return 0 for same string', () => {
      expect(DTW(transformedString[0], transformedString[1])).to,equal(0);
    });
  });
});
