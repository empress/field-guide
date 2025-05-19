import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

import normalisePath from '../utils/normalise-path';

const backingClasses = import.meta.glob('docs/**/*.js');
const badPathMarkdowns = import.meta.glob('docs/**/*.md', { query: '?raw', import: 'default' });
const markdowns = {}

for (let md in badPathMarkdowns) {
  markdowns[md.replace(/.*\/docs\//, '/docs/')] = badPathMarkdowns[md]
}

export default class ShowRoute extends Route {
  @service router;

  async model(params) {
    console.log('show route')
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');

    if(path === 'index') {
      return this.router.transitionTo('index')
    } else if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // check if there is a path/index in the TOC
    const toc = this.modelFor('application');
    path = normalisePath(path, toc);

    let componentClass = backingClasses[`/docs/${path}.js`];

    if (componentClass) {
      componentClass = (await componentClass()).default;
    }

    let markdown = markdowns[`/docs/${path}.md`];

    markdown = (await markdown());
    return {
      path,
      componentClass,
      markdown,
    };
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
