import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting every page', async function (assert) {
    assert.expect(0);
    await visit('/');

    let applicationRoute = this.owner.lookup('route:application');

    let pages = applicationRoute.context;

    for (let section of pages) {
      if (!section.pages?.length) {
        await visit(`/${section.id}`);
      }

      for (let page of section.pages) {
        await visit(`/${page.id}`);
      }
    }
  });
});
