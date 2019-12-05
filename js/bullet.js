class Bullet {
    constructor ( DOM, playerID, x, y, direction ) {
        this.playerID = playerID;
        this.x = x;
        this.y = y;
        this.bulletSize = {
            width: 16,
            height: 28
        }
        this.direction = direction;             // deg - sutampa su tanko kryptimi
        this.speed = 150;                       // 150px/s - greitis
        // this.lifeExpectancy = 2;

        this.init(DOM);
    }

    init( DOM ) {
        // sukuriame kulka ir istatome i zaidimo DOM'a
        const bullet = `<img class="tank"
                        src="./img/bullets/bulletBlue1_outline.png"
                        data-index="${this.index}"
                        style="width: ${this.bulletSize.width}px;
                            height: ${this.bulletSize.height}px;
                            top: ${this.x}px;
                            left: ${this.y}px;
                            transform: rotate(${this.direction}deg);">`;
        DOM.insertAdjacentHTML('beforeend', bullet);
    }

    move = () => {
        console.log('skrenda kulka...');
    }
}

export default Bullet;