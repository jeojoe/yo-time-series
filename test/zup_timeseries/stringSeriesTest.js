/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { stringToUTF16Series } from '../../src/zup_timeseries/string_series'

describe('stringSeries', () => {
  describe('#stringToUTF16Series', () => {

    const stringFixture = ['chang', 'mac', 'node'];

    it('should transform string to an array of unicode', () => {
      const transformedString = stringFixture.map(stringToUTF16Series);
      expect(transformedString[0]).to.deep.equal([99, 104, 97, 110, 103]);
      expect(transformedString[1]).to.deep.equal([109, 97, 99]);
      expect(transformedString[2]).to.deep.equal([110, 111, 100, 101]);
    });
  });
});
