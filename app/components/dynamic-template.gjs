import { setComponentTemplate } from '@ember/component';
import { getOwner } from '@ember/application';
import { template } from '@ember/template-compiler/runtime';
import { importSync } from '@embroider/macros';
import Component from '@glimmer/component';
import DynamicTemplateError from 'field-guide/components/dynamic-template-error';

let templateOwnerMap = new Map();

export default class DynamicTemplateComponent extends Component {
  <template><this.component /></template>

  get component() {
    console.log(this.args.componentId, this.args.componentClass);
    return template(this.args.templateString, {
      component: this.args.componentClass,
      strictMode: false,
    });
  }

  get componentDefinition() {
    let newTemplate = template(this.args.templateString, {
      scope: () => ({}),
    });

    console.log(newTemplate);

    return newTemplate;

    let owner = getOwner(this);

    let { templateString } = this.args;
    if (!templateString) {
      return null;
    }

    console.log({ templateString });

    let component = this.templateMap.get(templateString);
    if (component === undefined) {
      let compiledTemplate;
      try {
        return template(templateString, {
          strictMode: false,
        });
      } catch (err) {
        console.error(err);
        console.error(templateString);
        compiledTemplate = template(`<DynamicTemplateError />`, {
          // strictMode: f
          scope() {
            return {
              DynamicTemplateError: DynamicTemplateError,
            };
          },
        });
      }

      component = owner.factoryFor(`component:${this.args.componentId}`);

      if (component) {
        component = class extends component.class {};
      } else {
        // if component couldn't be found the old way try importing it directly
        let module;
        try {
          // module = importSync(`/docs/${this.args.componentId}.js`);
        } catch (err) {
          // backing class doesn't exist so just ignore the error
        }

        component = module?.default;
      }

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
