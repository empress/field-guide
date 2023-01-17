import normalisePath from 'field-guide/utils/normalise-path';
import { module, test } from 'qunit';

import toc from '../../fixtures/toc';

module('Unit | Utility | normalise-path', function () {
  test('it works when there is an index', function (assert) {
    let result = normalisePath('concepts', toc);
    assert.equal(result, 'concepts/index');
  });

  test('it does not do anything when there is no index', function (assert) {
    let result = normalisePath('components', toc);
    assert.equal(result, 'components');
  });

  test('it does not do anything when there is a url that does not exist in toc', function (assert) {
    let result = normalisePath('blah', toc);
    assert.equal(result, 'blah');
  });
});
