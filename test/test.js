var expect = chai.expect;


describe('Interpolation', function() {
  let BlogPosts,
  data,
  template

  before(function(){
    template = 
    `<div class="post">
      <h1>{{title}}</h1>
      <h3>{{author.firstName}} {{author.lastName}}</h3>
      <p>{{content}}</p>
    </div>`

    data = [
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
    ];

    BlogPosts = new Interpolation('blog', data, template);
  })

  describe('constructor', function () {
    it('should return set properties to their corresponding arguments', function () {
      expect(BlogPosts.data).to.equal(data)
      expect(BlogPosts.templateString).to.equal(template)
    });
    it('should throw an error if the render target is not found', function() {
      expect(()=>new Interpolation('blarg', data, template)).to.throw(Error)
    })
  });
  describe('getNestedValue', function() {
    it('should return an object value from a nested property name', function() {
      var getNestedValue = Interpolation.prototype.getNestedValue;
      var object = {
        dog: {
          tail: 'bushy'
        }
      }
      expect(getNestedValue('dog.tail', object)).to.equal('bushy')
    })
  })
  describe('fillTemplate', function() {
    it('should set the output property to the interpolated html', function(){
      expect(BlogPosts.output).to.equal(
        `<div class="post">\n      <h1>My first blog post</h1>\n      <h3>CoolGuy Jefferson</h3>\n      <p>Wow, I sure love writing blogs. What a neat new idea.</p>\n    </div><div class="post">\n      <h1>My second blog post</h1>\n      <h3>Jared Ganglyfingers</h3>\n      <p>This website is just okay, in my opinion. It could use a comments section</p>\n    </div>`)
    })
    it('should put the output in the renderTarget', function(){
      expect(BlogPosts.renderTarget.innerHTML).to.equal(BlogPosts.output)
    })
  })
  describe('stripBrackets', function() {
    it('should strip the brackets from a squiggly string', function(){
      var stripBrackets = Interpolation.prototype.stripBrackets;
      expect(stripBrackets('{{wow}}')).to.equal('wow')
    })
  })
});