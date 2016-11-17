var Category = function(param) {
  this.color = param.color
  this.title = param.title
  this.number = param.number
  datas = []
  var currentCategory = this

  param.datas.forEach(function(data,number) {
    var circle = new Circle({
      value:data,
      category: currentCategory,
      number:number,
      color:param.color
    })
    datas.push(circle)
  })

  this.datas = datas
  this.setCirclesStats()
  this.regroupSameCircles()
}

Category.prototype.isActive = function() {
  if(activeCategory == false) return false

  if(activeCategory.title == this.title) return true

  return false
}
Category.prototype.regroupSameCircles = function() {
  var circles = this.datas
  var regrouped = []
  var percent = 0
  var percentsArray = []

  for(var a =0; a<circles.length; a ++) {
      var circle = this.datas[a]
      if(circle.percent <= 10) {
          percent += circle.percent
      }

  }

  percent = percent * 100
  percent = Math.round(percent)
  percent = percent / 100

  for(var a =0; a<circles.length; a ++) {
      if(this.datas[a].percent <= 10) {
          this.datas[a].percent = percent
      }

      if(percentsArray.indexOf(this.datas[a].percent) == -1) {
        percentsArray.push(this.datas[a].percent)
      }
  }

  for(var z =0;z<circles.length;z++) {
    this.datas[z].differentsValue = {
      current:percentsArray.indexOf(this.datas[z].percent),
      count:percentsArray.length
    }
    this.datas[z].updateWithStats()
  }
}

Category.prototype.setCirclesStats = function() {
  values = []
  this.stats = []

  var circles = this.datas
  var count = 0

  for(var a =0; a<circles.length; a ++) {
      var circle = this.datas[a]

      if(typeof values[circle.value] == 'undefined') {
        values[circle.value] = 1
      } else {
        values[circle.value]++
      }
      count++
  }

  this.stats = values

  for(var e=0;e<circles.length; e++) {
    for (value in values) {
      var ind = values[value]

      if(circles[e].value != value) continue

      var percent = ind * 100 / count

      percent = percent * 100
      percent = Math.round(percent)
      percent = percent / 100

      this.datas[e].percent = percent

    }
  }
}

Category.prototype.show = function() {
  this.drawCircles()
}

Category.prototype.writeTitle = function() {
  var p = document.createElement('p')
  var span = document.createElement('span')
 text = document.createTextNode(this.title)

 var color = document.createElement('span')
 color.className += 'color'
 color.style.backgroundColor = this.color
 p.appendChild(span)
 p.appendChild(color)
 span.appendChild(text)
 var div = document.getElementById('legend').appendChild(p)
}

Category.prototype.drawCircles = function() {

  for(var w=0;w<this.datas.length;w++) {
      var circle = this.datas[w]
      circle.update()
  }
}
