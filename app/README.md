# scrollAnimation.js

Reveal CSS animation as you scroll down a page.
It use [animate.css](https://github.com/daneden/animate.css) animations.

### [LIVE DEMO ➫](http://kreont.com/)

## Version

1.0.0 Alpha

## License

### MIT license

## Documentation

### Dependencies
- [animate.css](https://github.com/daneden/animate.css)

### Installation

- Bower

```bash
   bower install 
```

- NPM

```bash
   npm install 
```

### Usage

- HTML

```html
  <section class="is-animated slideInLeft"></section>
  <section class="is-animated slideInRight"></section>
```

- JavaScript

```javascript
$('.is-animated').scrollAnimation({
    // Options
        animationDelay: ".0s"
    });
```

