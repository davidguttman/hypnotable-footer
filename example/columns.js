var columns = module.exports = [
  {
    title: 'User Name',
    property: 'login',
    template: function(val, fullObj) {
      return '<a href="https://github.com/'+ val +'">' + val + '</a>'
    }
  },
  {
    property: 'name'
  },
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
  },
  {
    title: 'Followers',
    property: 'followers',
    reduce: function(user, memo) {
      memo = memo || {followers: 0}
      memo.followers += user.followers
      return memo
    }
  }
]
