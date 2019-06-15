import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  model() {
    return fetch(`/toc.json`)
      .then(res => res.json())
  }
})
