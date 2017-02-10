var username = "USERNAME"
var password = "PASSWROD"

var casper = require('casper').create({
  verbose: true,
  logLevel: "debug",
  pageSettings: {
    loadImages: false
  }
})

casper.start()
casper.open('https://vip.wasai.org/wp-login.php', {
  method: "post",
  data: {
    log: username,
    pwd: password,
    rememberme: 'forever'
  }
}).then(function() {
  console.log('Logged in: ' + this.getTitle())
})

casper.run()
