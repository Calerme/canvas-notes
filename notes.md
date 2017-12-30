canvas 是基于状态的绘图——先设置状态，再执行绘制命令。

# context.beginPath()

创建一个新的状态作用域。

新状态作用域中的未设置的样式状态 `fillStyle` `strokeStyle` 会继承之前的值，但新作用域中的绘制操作 `fill()` `stroke()` 等不会重绘之前的状态。

# context.closePath()

封闭路径。

# lineCap

`butt` `round` `square`

`round` 与 `square` 会让线段多出一个圆头或方头。

# 五角星

https://www.imooc.com/video/3488

# lineJoin

线条相交时的形状。

`miter(default)`
`bevel`
`round`

# miterLimit

默认为 10.

