const unitPrice = 1.2
const priceScale = 0.83

String.prototype.insert = function (index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substring(index, this.length)
  } else {
    return string + this
  }
};

const iconsSrc = [
  {
    id: '1',
    img: './word.png',
    title: 'Word',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '2',
    img: './1password.png',
    title: '1Password',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '3',
    img: './excel.png',
    title: 'Excel',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '4',
    img: './office.png',
    title: 'Office',
    number: 5,
    author: 'Connor Christensen'
  }, {
    id: '5',
    img: './one-note.png',
    title: 'One Note',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '6',
    img: './outlook.png',
    title: 'Outlook',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '7',
    img: './photoshop-square.png',
    title: 'Photoshop',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '8',
    img: './photoshop-circle.png',
    title: 'Photoshop',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '9',
    img: './photoshop-squrcle.png',
    title: 'Photoshop',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '10',
    img: './powerpoint.png',
    title: 'Powerpoint',
    number: 1,
    author: 'Connor Christensen'
  }, {
    id: '11',
    img: './vlc.png',
    title: 'VLC',
    number: 1,
    author: 'Connor Christensen'
  }
]

function upvote() {
  console.log("this");
}

var app = new Vue({
  el: '#app',
  data: {
    iconNumber: '',
    icons: iconsSrc,
    appName: '',
    author: ''
  },
  beforeMount() {
    // mock upvotes and downvotes
    this.icons.forEach(function(icon) {
      // icon.votes = Math.floor(Math.random() * 8000)
      icon.votes = 0
      icon.price = '$' + Math.pow(icon.number * unitPrice, priceScale).toFixed(2)
    })
  },
  watch: {
    iconNumber: function() {
      let self = this
      if (this.iconNumber !== '') {
        this.icons = iconsSrc.filter(function(icon) {
          return icon.number == self.iconNumber
        })
      } else {
        this.icons = iconsSrc
      }
    },
    appName: function() {
      let self = this
      if (this.appName !== '') {
        this.icons = iconsSrc.filter(function(icon) {
          return icon.title.toLowerCase() === self.appName.toLowerCase()
        })
      } else {
        this.icons = iconsSrc
      }
    },
    author: function() {
      let self = this
      if (this.author !== '') {
        this.icons = iconsSrc.filter(function(icon) {
          return icon.author.toLowerCase() === self.author.toLowerCase()
        })
      } else {
        this.icons = iconsSrc
      }
    }
  },
  methods: {
    // takes any number in the thousands and converts the string into
    // a smaller form (eg 4500 -> 4.5k)
    roundNumber: function(number) {
      // it is unikely that the site will ever have more than a million votes
      // TODO: deal with big negatives
      if (number >= 1000 && number < 100000) {
        let cut = (Math.floor((number / 100))).toString()
        cut = cut.insert(cut.length - 1, '.')
        return cut + 'k'
      }
      return number
    }
  }
})
