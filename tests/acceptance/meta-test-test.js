/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import config from '../../config/environment';

let originalConfig;

module('Acceptance | meta test', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    originalConfig = config['field-guide'];
  })

  hooks.afterEach(() => {
    config['field-guide'] = originalConfig;
  })

  test('index meta', async function(assert) {
    await visit('/');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Field Guide - Field Guide');

    // TODO this should not have the title in the description. This is happening
    // because the title is part of the content and not part of the metadata
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', `Welcome Welcome to Field Guide 🎉 You have now successfully setup your own Field Guide, if things are looking a bit bare bones right now that's because Field Guide is designed to provide...`);
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://field-guide.netlify.app/');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'website');
    assert.dom('head meta[property="og:site_name"]', document)
      .hasAttribute('content', 'Field Guide - Field Guide');
  });

  test('index meta with a tagline', async function(assert) {
    config['field-guide'] = {
      ...originalConfig,
      tagLine: 'the most face addon ever',
    }

    await visit('/');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Field Guide - the most face addon ever');
    assert.dom('head meta[property="og:site_name"]', document)
      .hasAttribute('content', 'Field Guide - the most face addon ever');
  })

  test('index meta with a logo', async function(assert) {
    config['field-guide'] = {
      ...originalConfig,
      logo: '/images/face.png',
    }

    await visit('/');

    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://field-guide.netlify.app/images/face.png');
  })
});
