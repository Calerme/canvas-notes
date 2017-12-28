const config = {
    CVS_WIDTH: 1024,
    CVS_HEIGHT: 768,
    MARGIN_TOP: 60,
    MARGIN_LEFT: 30,
    radius: 8,
};

const endTime = new Date(2017, 11, 29);
let curShowTimeSeconds = 0;

const balls = [];
const colors = ['#FFB74D', '#4DB6AC', '#FFF176', '#90A4AE', '#4FC3F7', '#F06292', '#BA68C8', '#FF8A65', '#7986CB', '#64B5F6'];

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas'),
          ctx = canvas.getContext('2d');

    canvas.width = config.CVS_WIDTH;
    canvas.height = config.CVS_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    render(ctx);

    const circle = function () {
        render(ctx); // 绘制
        update(ctx); // 数据改变
        setTimeout(circle, 1000);
    };

    setTimeout(circle, 1000);
});

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);

    return ret >= 0 ? ret : 0;
}

function render(context) {
    let hours = parseInt(curShowTimeSeconds / 3600);
    let minutes = parseInt((curShowTimeSeconds%3600) / 60);
    let seconds = curShowTimeSeconds%60;

    context.clearRect(0, 0, config.CVS_WIDTH, config.CVS_HEIGHT);
    renderDigit(config.MARGIN_LEFT, config.MARGIN_TOP, parseInt(hours/10), context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 7.5, config.MARGIN_TOP, parseInt(hours%10), context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 15, config.MARGIN_TOP, 10, context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 19.5, config.MARGIN_TOP, parseInt(minutes/10), context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 27, config.MARGIN_TOP, parseInt(minutes%10), context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 34.5, config.MARGIN_TOP, 10, context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 39, config.MARGIN_TOP, parseInt(seconds/10), context);
    renderDigit(config.MARGIN_LEFT + (config.radius+1) * 2 * 46.5, config.MARGIN_TOP, parseInt(seconds%10), context);

}

function renderDigit(x, y, num, ctx) {

    ctx.fillStyle = 'rgb(0, 102, 153)';

    for (let i=0; i<digit[num].length; i++) {
        for (let j=0; j<digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                ctx.beginPath();
                ctx.arc(x+(config.radius+1)+(j*2*(config.radius+1)),
                        y+(config.radius+1)+(i*2*(config.radius+1)),
                        config.radius,
                         0, Math.PI*2);
                ctx.fill();
            }
        }
    }
}

function update(context) {
    let nextShowTimeSeconds = getCurrentShowTimeSeconds();

    const nextHours = parseInt(nextShowTimeSeconds / 3600);
    const nextMinutes = parseInt((nextShowTimeSeconds % 3600) / 60);
    const nextSeconds = parseInt(nextShowTimeSeconds % 60);

    const curHours = parseInt(curShowTimeSeconds / 3600);
    const curMinutes = parseInt((curShowTimeSeconds % 3600) / 60);
    const curSeconds = parseInt(curShowTimeSeconds % 60);

    if (nextShowTimeSeconds !== curShowTimeSeconds) {
        // 时
        if (parseInt(nextHours/10) !== parseInt(curHours/10)) {
            addBalls(config.MARGIN_LEFT , config.MARGIN_TOP, parseInt(curHours/10));
        }
        if (nextHours%10 !== curHours%10) {
            addBalls(config.MARGIN_LEFT + (config.radius + 1) * 15, config.MARGIN_TOP, curHours%10);
        }
        // 分
        if (parseInt(nextMinutes/10) !== parseInt(curMinutes/10)) {
            addBalls(config.MARGIN_LEFT + (config.radius + 1) * 39, config.MARGIN_TOP, parseInt(curMinutes/10));
        }
        if (nextMinutes%10 !== curMinutes%10) {
            addBalls(config.MARGIN_LEFT + (config.radius + 1) * 54, config.MARGIN_TOP, curMinutes%10)
        }
        // 秒
        if (parseInt(nextSeconds/10) !== parseInt(curSeconds/10)) {
            addBalls(config.MARGIN_LEFT + (config.radius + 1) * 78, config.MARGIN_TOP, parseInt(curSeconds/10));
        }
        if (nextSeconds%10 !== curSeconds%10) {
            addBalls(config.MARGIN_LEFT + (config.radius +1) * 93, config.MARGIN_TOP, curSeconds%10);
        }

        curShowTimeSeconds = nextShowTimeSeconds;

        updateBalls(context);
    }
}

function  addBalls(x, y, num) {
    for (let i=0; i<digit[num].length; i++) {
        for(let j=0; j<digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                let aBall = {
                    x: x + 2 * (config.radius + 1) * j + (config.radius + 1),
                    y: y + 2 * (config.radius + 1) * i + (config.radius + 1),
                    g: 1.5 + Math.random(), // 加速度
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4, // 水平速度
                    vy: -5, // 垂直速度：负值产生动画起始时小球稍向上抛的效果
                    color: colors[Math.floor(Math.random()*colors.length)] // 0-10 不包含 10 之间的整数
                }
                balls.push(aBall);
            }
        }
    }
}

function updateBalls(context) {
    while(balls.length) {
        const ball = balls.pop();
        context.beginPath()
        context.fillStyle = ball.color;
        context.arc(ball.x, ball.y, config.radius, 0, 2*Math.PI)
        context.closePath();
        context.fill();
    }
}