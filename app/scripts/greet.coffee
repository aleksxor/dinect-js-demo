# @cjsx React.DOM

React = require('react')

module.exports = React.createClass
  displayName: 'Greet'
  render: ->
    <div className="greeting">Hello, world!</div>
