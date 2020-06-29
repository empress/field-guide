import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import showdown from 'showdown';
const converter = new showdown.Converter();

async function renderMarkdown(context, markdown) {
  context.set('markdown', converter.makeHtml(markdown));

  await render(hbs`<DynamicTemplate @templateString={{this.markdown}}/>`);
}

module('Integration | Component | dynamic-template', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a basic example', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await renderMarkdown(this, `# Markdown Test

this is just a quick markdown example`)

    assert.dom('h1').hasText('Markdown Test')
  });

  test('it can render components inline in markdown', async function(assert) {
    await renderMarkdown(this, `# component test

<ColorPallet
  @color="#E04E39"
  @name="Brand"
  @variable="--color-brand"
  @class-name="bg-brand"
/>`);

    assert.dom('[data-test-field-guide-color-pallet] dd').hasText('Brand');
  });

  test('it auto-executes html code sample blocks', async function(assert) {
    await renderMarkdown(this, `# HTML code sample test

\`\`\`html
<h2>I am in a sample</h2>
<p>save me</p>
\`\`\`
`);

    assert.dom('.self-executing-code-block .example h2').hasText('I am in a sample');
    assert.dom('.self-executing-code-block pre.language-html code.language-html').exists();
  });

  test('it does not auto-execute js code sample blocks', async function(assert) {
    await renderMarkdown(this, `# JS code sample test

\`\`\`js
console.log('dont you be executing me');
\`\`\`
`);

    assert.dom('.self-executing-code-block .example').doesNotExist();
    assert.dom('pre.language-js code.language-js').exists();
  });
});
