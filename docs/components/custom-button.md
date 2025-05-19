# Button

This is an example page that just shows you how to use a HTML button. Just write a Markdown file as you would expect and the demo will be automatically rendered!

## Usage

Simplest use case: a button with text in it, telling the user what to do.

```html
Count: {{this.count}}

<button type="button" name="button" {{on "click" this.clickButton}}>Click Me</button>
```
