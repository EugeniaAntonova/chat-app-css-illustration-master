function $$class(className, context) {
    context = context || document;
    return context.querySelector(className);
}

function $class(className, context) {
    context = context || document;
    return [...context.querySelectorAll(className)];
}

function animate({ timing, draw, duration }) {
    return new Promise(resolve => {
        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        })
    });
}

function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    };
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

let quadEaseOut = makeEaseOut(quad);

export {$$class, $class, animate, quad, quadEaseOut}