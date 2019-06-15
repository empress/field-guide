import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  controllerName: 'show',
  templateName: 'show',
  model() {
    return fetch(`/docs/index.json`)
      .then(res => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        }
      });
  }
});
