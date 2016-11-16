var Circle = function(param) {
  this.value = param.value
  this.category = param.category
  this.number = param.number
  this.color = param.color
  this.size = 1
  this.position = {}
  this.initPosition = {}
  this.sizeRatio = 0.3
  this.easing = random(0.1,1)
  this.rotate = 0
  this.progressiveRotate = 10
}

Circle.prototype.updateWithStats = function() {
    var category = this.category
    this.rayon = globalR / 2

    this.initPosition = circlePoint(globalR,this.number,category.datas.length)
    this.initPosition.x += window.innerWidth / 2
    this.initPosition.y += window.innerHeight / 2

    this.variationValue = 100

    this.variation = {
      x:random(this.number - this.variationValue, this.number + this.variationValue),
      y:random(this.number - this.variationValue, this.number + this.variationValue)
    }

    if(this.initPosition.x < this.rayon) {
        this.initPosition.x += this.variation.x
    } else {
      this.initPosition.x -= this.variation.x
    }

    if(this.initPosition.y < this.rayon) {
      this.initPosition.y += this.variation.y
    } else {
      this.initPosition.y -= this.variation.y
    }

    this.position = this.initPosition
    this.easing = this.size / 100
    this.size = this.percent * this.sizeRatio
    this.hoverSize = this.size * 2
    this.initSize = this.size

}

Circle.prototype.update = function() {
  var minimum = 0.3
  this.progressiveRotate += (minimum - this.progressiveRotate ) * this.easing

  if(this.progressiveRotate <= minimum) this.progressiveRotate = minimum

  this.rotate += (this.progressiveRotate * this.number) * this.easing

  if(this.rotate == 360) this.rotate = 0

  var points = circlePoint(globalR,this.rotate,360)

  this.position.x = points.x
  this.position.y = points.y

  this.position.x += window.innerWidth / 2
  this.position.y += window.innerHeight / 2


  if(this.position.x < this.rayon) {
      this.position.x += this.variation.x
  } else {
    this.position.x -= this.variation.x
  }

  if(this.position.y < this.rayon) {
    this.position.y += this.variation.y
  } else {
    this.position.y -= this.variation.y
  }

  if(mouse.x >= this.position.x - this.hoverSize && mouse.x <= this.position.x + this.hoverSize
  && mouse.y >= this.position.y - this.hoverSize && mouse.y <= this.position.y + this.hoverSize) {
    this.size += (this.hoverSize - this.size) * 0.2
  } else {
    this.size += (this.initSize - this.size) * 0.2
  }

  this.draw()
}

Circle.prototype.draw = function() {
  ctx.save();
  ctx.beginPath()

  ctx.fillStyle = this.color
  ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}
