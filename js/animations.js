import {$$class, $class, animate, quad, quadEaseOut} from './utils.js'

const getPhoneTranslate = () => {
    if (window.innerWidth < 740) return 0;

    let shift = Math.round((((content.clientWidth - phone.clientWidth) / 2) / phone.clientWidth) * 100);
    return shift;
}

const animatePhone = () => {
    return animate({
        timing: quadEaseOut,
        duration: 600,
        draw: (progress) => {
            phone.style.setProperty('--opacity', progress);
            phone.style.setProperty('--translate', `${getPhoneTranslate()}% ${-30 + 30 * progress}%`)
        }
    })
}

const animateMessage = (message, direction) => {
    return animate({
        timing: quadEaseOut,
        duration: 300,
        draw: (progress) => {
            message.style.setProperty('--opacity', `${progress}`);
            message.style.setProperty('--translate', `${100 * direction + 100 * (-direction) * progress}% ${50 - 50 * progress}%`);
        }
    })
}

const printMessage = (text) => {
    return animate({
        timing: quadEaseOut,
        duration: (text.length) * 60,
        draw: (progress) => {
            let result = Math.ceil(text.length * progress);
            input.textContent = text.slice(0, result);
        }
    })
}

const createMessageHistory = () => {
    messagesToAnimate.reduce((promiseChain, message) => {
        return promiseChain.then(() => {
            if (message.classList.contains('sent-message')) {
                let text = $$class('.text', message).textContent.trim();
                return printMessage(text)
                    .then(() => buttonClick())
                    .then(() => input.textContent = '')
                    .then(() => pause(200))
                    .then(() => animateMessage(message, 1))
                    .then(() => pause(400));
            }
            return animateMessage(message, -1).then(() => pause(400));
        });
    }, Promise.resolve());
}
const pause = (n) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, n)
    })
}

const buttonClick = () => {
    return new Promise((resolve) => {
        button.classList.add('active');

        const onAnimationEnd = () => {
            button.classList.remove('active');
            button.removeEventListener('animationend', onAnimationEnd);
            resolve();
        }

        button.addEventListener('animationend', onAnimationEnd);
    });
}

export {createMessageHistory, animatePhone}