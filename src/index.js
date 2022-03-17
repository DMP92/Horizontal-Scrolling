import './style.css';
import horizontalSlider from './HorizontalSlider.js';

window.addEventListener('scroll', (ev) => 
{
    horizontalSlider.scrollHorizontally(ev);
})