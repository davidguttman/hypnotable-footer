# Hypnotable Footer #

Add a footer to your Hypnotable! Great for totals or other reductions of data.

# Usage #

Install: `npm i -S hypnotable-footer`

Columns now take a `reduce` function. The object returned by `reduce` will be fed into `property` and then `template`:

```js
var columns = [
  {
    title: 'Repos per Follower',
    property: function(user) {
      return user.public_repos / user.followers
    },
    template: function(val) {
      return val.toFixed(3)
    },
    reduce: function(user, memo) {
      memo = memo || {public_repos: 0, followers: 0}
      memo.public_repos += user.public_repos
      memo.followers += user.followers
      return memo
    }
  },
  {
    title: 'Repos',
    property: 'public_repos',
    className: 'repositories',
    reduce: function(user, memo) {
      memo = memo || {public_repos: 0}
      memo.public_repos += user.public_repos
      return memo
    }
  }
]

var ht = hypnotable(columns)
var htf = require('hypnotable-footer')(ht.el, columns)

data.pipe(ht)
data.pipe(htf)

```

# Example #

`npm run example`

# License #

MIT
