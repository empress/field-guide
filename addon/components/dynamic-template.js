import { setComponentTemplate } from '@ember/component';
import { getOwner } from '@ember/application';
import { compileTemplate } from '@ember/template-compilation';

import Component from '@glimmer/component';

let templateOwnerMap = new Map();
let templateId = 0;

export default class DynamicTemplateComponent extends Component {
  constructor() {
    super(...arguments);

    let owner = getOwner(this);
    let templateMap = templateOwnerMap.get(owner);
    if (templateMap === undefined) {
      templateMap = templateOwnerMap.set(owner, new Map());
    }
    this.templateMap = templateMap;
  }

  get component() {
    let { templateString } = this.args;
    if (!templateString) {
      return null;
    }

    let componentName = this.templateMap.get(templateString);
    let component;
    if (componentName === undefined) {
      let owner = getOwner(this);

      let compiledTemplate;
      try {
        compiledTemplate = compileTemplate(templateString);
      } catch (err) {
        console.error(err);
        console.error(templateString);
        compiledTemplate = compileTemplate(`<DynamicTemplateError />`);
      }

      component = owner.factoryFor(`component:${this.args.componentId}`);

      if (!component) {
        component = class extends Component {};
      } else {
        component = class extends component.class {};
      }

      componentName = `some-prefix-${templateId++}`;

      setComponentTemplate(compiledTemplate, component);
    }

    return component;
  }
}
