import HeadLayout from 'ember-cli-head/components/head-layout';
import DynamicTemplate from '../components/dynamic-template.gjs'
import Component from '@glimmer/component';
import showdown from 'showdown';
// import { tracked } from '@glimmer/tracking';

export default class ColourPalletResult extends Component {
  <template>
    <HeadLayout />

    <DynamicTemplate
      @templateString={{this.renderedContent}}
      @componentId={{@model.id}}
      @componentClass={{@model.componentClass}}
    />
  </template>

  get renderedContent() {
    const converter = new showdown.Converter();
    return converter.makeHtml(this.args.model.markdown);
    return this.args.model.markdown
  }
}
