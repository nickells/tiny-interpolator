# tiny-interpolator
###Usage:
#####0. Include script in HTML
```html
<script src="interpolator.js"/></script> <!-- or wherever you put it -->
```
#####1. Create a DOM element with a unique `id` to use as your `render-target`
```html
<div id="blog"></div>
```
#####2. Write HTML template. ES6 Template Strings are recommended for easy line break support.
```js
let template = 
`<div class="post">
  <h1>{{title}}</h1>
  <h3>{{author.firstName}} {{author.lastName}}</h3>
  <p>{{content}}</p>
</div>`
```
#####3. Write data. This should be an array of objects, in any order you wish.
```js
let data = [
  {
    title: 'My first blog post',
    author: {
      firstName: 'CoolGuy', //nested values supported!
      lastName: 'Jefferson'
    },
    content: 'Wow, I sure love writing blogs. What a neat new idea.'
  },
  {
    title: 'My second blog post',
    author: {
      firstName: 'Jared',
      lastName: 'Ganglyfingers'
    },
    content: 'This website is just okay, in my opinion. It could use a comments section'
  }
]
```
#####4: Create new `Interpolation` to fill a DOM element with your content.
```js
let BlogPosts = new Interpolation('blog', data, template);
```

#####Observe!
![preview](http://i.imgur.com/YO21eUt.png)
---
![code](http://i.imgur.com/TIV0Lrb.png)
