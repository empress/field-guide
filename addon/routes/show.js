import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

export default class ShowRoute extends Route {
  @service router;

  model(params) {
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');
    return fetch(`${config.rootURL}docs/${path}.json`)
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
