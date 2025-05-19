import Component from '@glimmer/component';
import ColorPalletResult from './color-pallet-result.gjs';

function convertHex(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

export default class ColorPalletComponet extends Component {
  <template>
    <div
      class="field-guide-color-pallet"
      data-test-field-guide-color-pallet
      ...attributes
    >
      <div class="color-pallet__example" style="background-color: {{@color}}">

        {{#each this.textColorClasses as |textColorClass|}}
          <div class="color-pallet__example-text-row">
            {{#each this.textClasses as |textClass|}}
              <ColorPalletResult
                @rgb={{this.rgb}}
                @className={{textClass}}
                class={{textColorClass}}
              />
            {{/each}}
          </div>
        {{/each}}
      </div>
      <div class="color-pallet__details">
        {{#if @name}}
          <dl>
            <dt class="color-pallet__details-title">Name</dt>
            <dd>{{@name}}</dd>
          </dl>
        {{/if}}

        {{#if @variable}}
          <dl>
            <dt class="color-pallet__details-title">Variable</dt>
            <dd>{{@variable}}</dd>
          </dl>
        {{/if}}

        {{#if @class-name}}
          <dl>
            <dt class="color-pallet__details-title">Class Name</dt>
            {{! template-lint-disable  }}
            <dd>{{@class-name}}</dd>
            {{! template-lint-enable  }}
          </dl>
        {{/if}}

        <dl>
          <dt class="color-pallet__details-title">RGB</dt>
          <dd>{{this.rgbString}}</dd>
        </dl>

        <dl>
          <dt class="color-pallet__details-title">HEX</dt>
          <dd>{{@color}}</dd>
        </dl>

      </div>
    </div>
  </template>
  constructor(attrs) {
    super(...arguments);

    this.rgb = convertHex(this.args.color);

    if (this.args.textClasses) {
      this.textClasses = this.args.textClasses;
    } else {
      // there needs to be at least one class
      this.textClasses = ['field-guide-text-sm'];
    }

    if (this.args.textColorClasses) {
      this.textColorClasses = this.args.textColorClasses;
    } else {
      // there needs to be at least one class
      this.textColorClasses = ['field-guide-normal-text'];
    }

    let [r, g, b] = this.rgb;
    this.rgbString = `${r}, ${g}, ${b}`;
  }
}
