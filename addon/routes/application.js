import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service fastboot;

  model() {
    let host = this.fastboot.isFastBoot
      ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}`
      : '';

    return fetch(`${host}${config.rootURL}toc.json`).then((res) => res.json());
  }
}
