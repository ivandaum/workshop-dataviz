var Circle = function(param) {
  this.value = param.value
  this.category = param.category
  this.number = param.number
  this.color = param.color
  this.size = 10
  this.position = {}
  this.initPosition = {}
  this.sizeRatio = 1.5
  this.easing = random(0.1,1)
  this.rotate = 0
  this.initVariation = {x:0,y:0}
  this.activeVariation = {x:0.1,y:0.1}
  this.progressiveRotate = 10
  this.lanePoints = {
    x:0,
    y:0
  }
  this.textPoints = {
    x:0,
    y:0
  }
}

Circle.prototype.updateWithStats = function() {
    var category = this.category
    this.rayon = globalR / 2
    this.radius = globalR
    this.endRadius = this.radius

    this.initPosition = circlePoint(globalR,this.number,category.datas.length)
    this.initPosition.x += window.innerWidth / 2
    this.initPosition.y += window.innerHeight / 2

    this.variationValue = 100

    this.initVariation = {
      x:random(this.number - this.variationValue, this.number + this.variationValue),
      y:random(this.number - this.variationValue, this.number + this.variationValue)
    }

    this.variation = {x:this.initVariation.x,y:this.initVariation.y}

    if(this.initPosition.x < this.rayon) {
        this.initPosition.x += this.initVariation.x
    } else {
      this.initPosition.x -= this.initVariation.x
    }

    if(this.initPosition.y < this.rayon) {
      this.initPosition.y += this.initVariation.y
    } else {
      this.initPosition.y -= this.initVariation.y
    }

    this.position = this.initPosition
    this.easing = this.size / 100
    this.size *= this.sizeRatio * this.percent / 70
    if(this.size < 2) this.size = 2
    this.hoverSize = this.size * 2
    this.initSize = this.size

    this.activeRotate = this.differentsValue.current + (this.number * 0.015)
    this.valuesLength = 360
    this.activeRotateVariation = 0

}

Circle.prototype.update = function() {

  // Point rotation

  // R GLOBAL
  if(activeCategory != false) {
    this.endRadius = activeCategory.title == this.category.title ? activeCategoryR : reductedR
  } else {
    this.endRadius = globalR
  }

  // POSITION WITH EASING
  var minimum = 0.1

  this.progressiveRotate += (minimum - this.progressiveRotate ) * this.easing

  if(this.progressiveRotate <= minimum) this.progressiveRotate = minimum


  if(this.category.isActive() == true) {
    this.activeRotateVariation += 0.001
    this.rotate = this.activeRotate - this.activeRotateVariation
    this.valuesLength += (this.differentsValue.count - this.valuesLength) * 0.1
    if(this.activeRotateVariation >= this.valuesLength) this.activeRotateVariation = 0

  } else {
    this.valuesLength += (360 - this.valuesLength) * 0.001
    this.rotate += (this.progressiveRotate * this.number) * this.easing
  }

  if(this.rotate == 360) this.rotate = 0

  this.radius += (this.endRadius - this.radius) * 0.1
  var points = circlePoint(this.radius,this.rotate,this.valuesLength)
  var lanePoints = circlePoint(this.radius * 1.1, this.rotate,this.valuesLength)
  var textPoints = circlePoint(this.radius * 1.3, this.rotate,this.valuesLength)

  this.position.x = points.x
  this.position.y = points.y

  this.position.x += window.innerWidth / 2
  this.position.y += window.innerHeight / 2

  this.lanePoints.x = lanePoints.x
  this.lanePoints.y = lanePoints.y

  this.lanePoints.x += window.innerWidth / 2
  this.lanePoints.y += window.innerHeight / 2

  this.textPoints.x = textPoints.x
  this.textPoints.y = textPoints.y

  this.textPoints.x += window.innerWidth / 2
  this.textPoints.y += window.innerHeight / 2

  // Variations between points (prevent makign a perfect circle)
  if(this.category.isActive() == true) {
    this.variation.x += (this.activeVariation.x - this.variation.x) * 0.3
    this.variation.y += (this.activeVariation.x - this.variation.y) * 0.3
  } else {
    this.variation.x += (this.initVariation.x - this.variation.x) * 0.1
    this.variation.y += (this.initVariation.y - this.variation.y) * 0.1
  }

  // Variation for each blocs
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

  if(this.category.isActive()) {
    if(this.differentsValue.current == 0 || this.differentsValue.current == this.differentsValue.count -1) {
        this.category.textPosition.push([this.position.x,this.position.y])
    }
  }

  if(this.category.isActive() != true) {
    if(mouse.x >= this.position.x - this.hoverSize && mouse.x <= this.position.x + this.hoverSize
    && mouse.y >= this.position.y - this.hoverSize && mouse.y <= this.position.y + this.hoverSize) {
      this.size += (this.hoverSize - this.size) * 0.2
    } else {
      this.size += (this.initSize - this.size) * 0.2
    }
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
