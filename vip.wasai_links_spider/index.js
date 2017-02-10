var _ = require('lodash')

var casper = require('casper').create({
  verbose: true,
  logLevel: "debug",
  pageSettings: {
    loadImages: false
  }
})

var all = []
casper.start('https://vip.wasai.org/page/1', function() {
  this.emit('parse')
})

casper.on('parse', function(url) {
  console.log('Loading data from', this.getCurrentUrl())
  var links = this.evaluate(function() {
    var $ = jQuery
    return $('.powerpress_link_d').map(function(i, a) {
      var url = $(a).attr('href').toString()
      var name = $(a).closest('article').find('.article-header h2 a').text()

      return {
        url: url,
        name: name
      }
    }).toArray()
  })

  _.forEach(links, function(link) {
    all.push(link)
  })

  this.emit('next')
})

casper.on('next', function() {
  var next = this.evaluate(function() {
    return jQuery('ul.pagination li.current + li').find('a').attr('href')
  });

  if (next) {
    this.thenOpen(next, function() {
      this.emit('parse', next)
    })
  } else {
    console.log('Load completed')

    _.forEach(all, function(link) {
      var url = link.url
      var name = link.name
      console.log(name, url)
    })
  }
})

casper.run()
