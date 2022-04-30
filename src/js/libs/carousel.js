export default class {
    name = "Carousel";

    setImages(selector, ...images){
        document.querySelectorAll(selector).forEach((elem, index) => {
            let image = document.createElement('img');
            image.src = images[index];
            image.classList.add("image");
            elem.append(image);
        })
    }
}