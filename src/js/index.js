import "../css/index.css";
import slide1 from "../img/slides/slide1.jpg";
import slide2 from "../img/slides/slide2.jpg";
import slide3 from "../img/slides/slide3.jpg";

import Carousel from "./libs/carousel.js";

let slider = new Carousel();
slider.setImages(".slide", slide1, slide2, slide3);
console.log(slider.name);

