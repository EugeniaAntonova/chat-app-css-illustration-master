import {$$class, $class, animate, quad, quadEaseOut} from './utils';
import {createMessageHistory, animatePhone} from './animations';

document.addEventListener('DOMContentLoaded', () => {

    const content = $$class('.content');
    const phone = $$class('.illustration');

    const messagesToAnimate = $class('.animate-message', phone);

    const button = $$class('.send-button', phone);
    const input = $$class('.input .text', phone);

    const decors = $class('.decor');

    decors[0].addEventListener('animationend', () => {
        animatePhone()
            .then(() => createMessageHistory())
    })
})