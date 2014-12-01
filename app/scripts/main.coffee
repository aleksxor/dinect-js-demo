React = require('react')
Greet = React.createFactory(require('./greet'))

console.log('initialized')
document.addEventListener('DOMContentLoaded', ->
  console.log('started')
  React.render(Greet(null), document.body))
