import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CustomButtonClass extends Component {
  @tracked
  count = 0;

  clickButton = () => {
    this.count = this.count + 1;
  };
}
