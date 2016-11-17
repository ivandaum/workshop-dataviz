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

  var infos = []
  var infosPosition = []
  var positionCount = 0
  var infoCount = 0

  for(var a =0; a<this.datas.length;a++) {
    var percent = this.datas[a].percent

    if(typeof infos[percent] == 'undefined') {
      infos[percent] = []
    }

    if (infos[percent].indexOf(this.datas[a]) == -1) {
        infos[percent].push(this.datas[a].value)
        infoCount++

    }

    if(typeof infosPosition[percent] == 'undefined') {
        infosPosition[percent] = []
    }

    infosPosition[percent].push(this.datas[a].position)
    positionCount++
  }

  for(cInfo in infos) {
    var usedVar = []
    var position = {x:0,y:0}
    var currentPercent = infosPosition[cInfo]

    // FIRST TITLE
    position.x = currentPercent[0].x
    position.y = currentPercent[0].y

    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.font="50px Abril Fatface"
    ctx.fillText(cInfo + '%',position.x,position.y)
    ctx.fill()
    ctx.closePath()

    var y = 0
    var canDraw = false
    var lane = ''
    var countWords = 1
    for(var x=0;x<infos[cInfo].length;x++) {
      var text = infos[cInfo][x]

      if(typeof infos[cInfo][x-1] == 'undefined') {
        usedVar.push(text)
      } else if (usedVar.indexOf(text) == -1) {
          usedVar.push(text)
      } else {
        text = false
      }

      if(text) {
          lane += text + ', '
          canDraw = countWords % 3 == 0 ? true : false
          countWords++
      }
      if(canDraw && lane != false || x >= infos[cInfo].length - 1 && lane != false ) {
        lane = (x >= infos[cInfo].length - 1) ? lane.slice(0,-2) : lane

        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = 'red'
        ctx.font="15px Montserrat"
        ctx.fillText(lane,position.x,position.y + (20 * (y+1)))
        ctx.fill()
        ctx.closePath()
        y++
        lane = ''
      }
    }
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
