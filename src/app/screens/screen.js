import v from '../viewElements';

export default class Screen {
    constructor(width, height, style) {
        this.width = width;
        this.height = height;
        this.style = style;
        this.border = v.getBorder(this.style.borderColor, this.width, this.height, 4);
    }

    
}