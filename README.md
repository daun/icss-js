# ICSS-JS

Helpers for sharing style tokens between (S)CSS and JS.

Useful for:

- re-using named breakpoints
- synchronising transition durations
- defining global color themes

Requirements:

- Valid [ICSS exports](https://github.com/css-modules/icss#export)
- A JS bundler that supports CSS modules

This package won't do the heavy lifting of configuring your bundler to output
CSS modules. Rather, it provides a few helpers for streamlining the whole
import/export business.

## Install

```bash
npm install icss-js
```

## Usage

### Exporting data from CSS

Use ICSS [export statements](https://github.com/css-modules/icss#export):

```css
:export {
  transitionDuration: 500;
  mainColor: purple;
}
```

### Exporting data from SCSS

ICSS exports are flat by nature. Exporting complex SASS data structures like
lists and maps requires an intermediate step. We'll use the `icss-export`
function to convert those to JSON that can later be parsed by the JS helpers.

```scss
@import "icss-js/src/icss-export.scss";

$breakpoints: (small: 420px, medium: 768px, large: 1024px);

:export {
  breakpoints: icss-export($breakpoints);
}
```

### Importing data into JS

Import your stylesheet as a CSS module, then pass the exports into the provided
helper function to receive a valid JS object.

```js
import parseIcssExports from 'icss-js/css-exports'

import cssExports from './styles/main.scss'

const {
  breakpoints,
  transitionDuration
} = parseIcssExports(cssExports)

console.log(breakpoints)         // { "small": 420, "medium": 768 }
console.log(transitionDuration)  // 500
```

## License

[MIT License](https://opensource.org/licenses/MIT) © Philipp Daun
