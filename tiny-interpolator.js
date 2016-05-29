'use strict';
var Interpolation  = function (renderTarget, data, templateString){
  this.data = data;
  this.templateString = templateString;
  this.output = '';
  this.renderTarget = document.getElementById(renderTarget);
  if (this.renderTarget === null) throw new Error('tiny-interpolator: Render target was not found. Make sure a DOM element exists with id "' +  renderTarget + '".')
  return this.fillTemplate();
}

Interpolation.prototype.getNestedValue = function(string,context){
  var values = string.split('.');
  return values.reduce(function(current,next){
    return current[next];
  }, context)
}

Interpolation.prototype.fillTemplate = function(){
  this.output = this.data.reduce(function(str, datum){
    return str + this.templateString.replace(/(\{{2}[\S]*\}{2})/g, function(match){
      var key = this.stripBrackets(match)
      if (key.indexOf('.') !== -1){
        return this.getNestedValue(key,datum)
      }
      return datum[key]
    }.bind(this));
  }.bind(this), '')
  this.renderTarget.innerHTML = this.output;
  return this.renderTarget;
}

Interpolation.prototype.stripBrackets = function(str){
  return str.substring(2, str.length-2)
}
