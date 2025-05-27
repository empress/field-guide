/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  controllerName = 'show';
  templateName = 'show';

  @service fastboot;

  model() {
    let host = this.fastboot.isFastBoot
      ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}`
      : '';
    const url = `${host}${config.rootURL}docs/index.json`;

    return fetch(url)
      .then(res => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        }
      });
  }
}
