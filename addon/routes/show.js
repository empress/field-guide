import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

import normalisePath from '../utils/normalise-path';

export default class ShowRoute extends Route {
  @service router;
  @service fastboot;

  model(params) {
    let host = this.fastboot.isFastBoot
      ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}`
      : '';

    // remove trailing slash
    let path = params.path.replace(/\/$/, '');

    if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // check if there is a path/index in the TOC
    const toc = this.modelFor('application');

    path = normalisePath(path, toc);

    return fetch(`${host}${config.rootURL}docs/${path}.json`)
      .then((res) => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        };
      });
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
