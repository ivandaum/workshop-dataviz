var Category = function(param) {
  this.color = param.color
  this.title = param.title
  this.number = param.number
  this.regroupIfMinPercent = 10
  this.textPosition = []
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
  this.percentsArray = []

  for(var a =0; a<circles.length; a ++) {
      var circle = this.datas[a]

      if(circle.percent <= this.regroupIfMinPercent) {
        percent += (circle.percent / this.stats[circle.value])
      }
  }

  percent = percent * 10
  percent = Math.round(percent)
  percent = percent / 10


  for(var a=0; a<circles.length; a ++) {
      if(this.datas[a].percent <= this.regroupIfMinPercent) {
          this.datas[a].percent = percent
      }

      if(this.percentsArray.indexOf(this.datas[a].percent) == -1) {
        this.percentsArray.push(this.datas[a].percent)
      }
  }

  for(var z = 0;z<circles.length;z++) {
    this.datas[z].differentsValue = {
      current:this.percentsArray.indexOf(this.datas[z].percent),
      count:this.percentsArray.length
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

      var percent = (ind * 100) / count

      percent = percent * 10
      percent = Math.round(percent)
      percent = percent / 10

      this.datas[e].percent = percent
    }
  }

}

Category.prototype.showPercents = function() {
    var percentsValues = []

    for(var a = 0; a<this.percentsArray.length;a++) {
        var position = circlePoint(activeCategoryR,a,this.percentsArray.length)

        var sizePercent = this.percentsArray[a] / 0.8
        position.x += window.innerWidth / 2
        position.y += window.innerHeight / 2
        ctx.beginPath()
        ctx.strokeStyle = '#fff'
        ctx.fillStyle = '#fff'
        ctx.lineWidth = 5
        ctx.font="20px Abril Fatface";
        ctx.fillText(this.percentsArray[a] + '%',position.x,position.y)
        ctx.stroke()
        ctx.closePath()
    }

    for(var q = 0; q<this.datas.length;q++) {
        
    }

}

Category.prototype.show = function() {
  if(this.isActive()) {
    this.showPercents()
  }
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
