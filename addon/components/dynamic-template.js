import { setComponentTemplate } from '@ember/component';
import { getOwner } from '@ember/application';
import { compileTemplate } from '@ember/template-compilation';
import { importSync } from '@embroider/macros';
import Component from '@glimmer/component';

let templateOwnerMap = new Map();

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

    let component = this.templateMap.get(templateString);
    if (component === undefined) {
      let compiledTemplate;
      try {
        compiledTemplate = compileTemplate(templateString);
      } catch (err) {
        console.error(err);
        console.error(templateString);
        compiledTemplate = compileTemplate(`<DynamicTemplateError />`);
      }

      let module;
      try {
        // eslint-disable-next-line no-undef
        module = importSync(`/docs/${this.args.componentId}.js`);
      } catch (err) {
        // backing class doesn't exist so just ignore the error
      }

      component = module?.default;

      if (!component) {
        component = class extends Component {};
      }

      setComponentTemplate(compiledTemplate, component);

      // eslint-disable-next-line ember/no-side-effects
      this.templateMap.set(templateString, component);
    }

    return component;
  }
}
