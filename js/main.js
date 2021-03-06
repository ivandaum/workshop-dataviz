var app = d3.select('#app')
var canvas = app.append('canvas')
.attr('width',window.innerWidth)
.attr('height',window.innerHeight)
var ctx = canvas.node().getContext('2d')
var CATEGORIES = []
var globalR = Math.min(window.innerHeight, window.innerWidth) / 4
var activeCategoryR = Math.min(window.innerHeight, window.innerWidth) / 4
var reductedR = Math.min(window.innerHeight, window.innerWidth) / 20
var mouse = {x:0,y:0}
var ROTATE = 0
var TIMMING = 0
var activeCategory = false
var TEST = 0

window.addEventListener('click',function(e){
    if(e.clientX) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    var circle = getCircleOnMouse()

    var fullTitles = document.getElementsByClassName('full-title')

    for(var a=0;a<fullTitles.length;a++) {
      fullTitles[a].style.opacity = 0
    }

    if(!circle) {
      activeCategory = false
      document.getElementById('legend').style.opacity = 1
    } else {
      document.getElementById('legend').style.opacity = 0

      activeCategory = circle.category

      setTimeout(function() {
        document.querySelector('.full-title[data-title="' + circle.category.title +'"]').style.opacity = 1
      },400)
    }
})

window.addEventListener('mousemove',function(e) {
  if(e.clientX) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  var circle = getCircleOnMouse()

  if(!circle) return

})

var activeRotateVariation = 0

function getCircleOnMouse() {

  for(var b=0;b<CATEGORIES.length;b++) {
    var circles = CATEGORIES[b].datas

    for(var q=0;q<circles.length;q++) {
      var c = circles[q]
      if(mouse.x >= c.position.x - c.hoverSize && mouse.x <= c.position.x + c.size
      && mouse.y >= c.position.y - c.hoverSize && mouse.y <= c.position.y + c.size) {
        return c
        break
      }

    }
  }
  return false
}
function random(min, max) {
  return Math.random()*(max-min+1)+min
}

function circlePoint(ratio,number,count) {
  number++

  var radian = (number * (Math.PI * 2)) / count
  return {
    x: ratio * Math.cos(radian),
    y: ratio * Math.sin(radian)
  }
}

// FILL CATEGORIES
for(var x=0;x<DATA.length;x++) {
  var data = DATA[x]
  var category = new Category({
    title:data.title,
    color:data.color,
    datas:data.datas,
    number:x
  })
  CATEGORIES.push(category)

  CATEGORIES[x].writeTitle()
}

function frame() {
  //activeRotateVariation += 0.001

  requestAnimationFrame(frame)
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

  for(var b=0;b<CATEGORIES.length;b++) {
    CATEGORIES[b].show()
  }
}

frame()
