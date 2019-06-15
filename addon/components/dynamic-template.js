import Component from '@ember/component';
import layout from '../templates/components/dynamic-template';

import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { compileTemplate } from '@ember/template-compilation';

let templateOwnerMap = new Map();
let templateId = 0;

export default Component.extend({
  tagName: '',
  layout,
  init() {
    this._super(...arguments);

    let owner = getOwner(this);
    let templateMap = templateOwnerMap.get(owner);
    if (templateMap === undefined) {
      templateMap = templateOwnerMap.set(owner, new Map());
    }
    this.templateMap = templateMap;
  },

  componentName: computed('templateString', function() {
    let { templateMap, templateString } = this;
    if (!templateString) { return null; }

    let componentName = templateMap.get(templateString);
    if (componentName === undefined) {
      let owner = getOwner(this);

      let compiledTemplate;
      try {
        compiledTemplate = compileTemplate(templateString);
      } catch (err) {
        console.error(err);
        console.log(templateString);
        compiledTemplate = compileTemplate(`<DynamicTemplateError />`)
      }

      componentName = `some-prefix-${templateId++}`;
      owner.register(`template:components/${componentName}`, compiledTemplate);
    }

    return componentName;
  })
});
