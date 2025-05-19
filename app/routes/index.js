/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';

const backingClasses = import.meta.glob('docs/**/*.js');
const badPathMarkdowns = import.meta.glob('docs/**/*.md', { query: '?raw', import: 'default' });
const markdowns = {}

for (let md in badPathMarkdowns) {
  markdowns[md.replace(/.*\/docs\//, '/docs/')] = badPathMarkdowns[md]
}

export default class IndexRoute extends Route {
  templateName = 'show';

  async model() {
    console.log('index route')
    let componentClass = backingClasses[`/docs/index.js`];

    if (componentClass) {
      componentClass = (await componentClass()).default;
    }

    let markdown = markdowns[`/docs/index.md`];

    markdown = (await markdown());
    return {
      componentClass,
      markdown,
    };
  }
}
