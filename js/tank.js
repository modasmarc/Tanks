class Player {
    constructor ( index, name, tankColor, position, screenSize ) {
        this.index = index;
        this.DOMtank;
        this.name = name;
        this.life = 3;                                  // 3 gyvybes
        this.tankColor = tankColor || 'red';
        this.tankSize = { width: 46, height: 46 }
        this.position;
        this.speed = 0;
        this.maxForwardSpeed = 100;                     // 100px/s - max greitis i prieki
        this.maxBackwardSpeed = 50;                     // 50px/s - max greitis atbulomis
        this.forwardAccelaration = 20;                  // 20px/s - pagreitis i prieki
        this.backwardAccelaration = 30;                 // 20px/s - pagreitis atbulomis
        this.breakingSpeed = 10;                        // 10px/s - stabdymo pagreitis
        this.frictionSpeed = 5;                         // 5px/s - stabdymo pagreitis (trintis), jei nevaldai tanko
        this.direction = 0;                             // 0deg - tanko pasisukimo kryptis
        this.directionSpeed = 10;                       // 10deg/s - tanko posukio greitis
        this.fireRate = 3;                              // 1 bullet per 3 seconds
        this.lastFire = 0;
        this.keyboard;
        this.keyboardPressed = {
            up: false,
            down: false,
            right: false,
            left: false
        };
        
        this.init( position, screenSize );
    }

    init( position, screenSize ) {
        this.setInitialPosition( position, screenSize );
        this.setInitialDirection( position );
        this.setKeybind();
    }

    setInitialPosition( position, screenSize ) {
        const positions = {
            topCenter: {
                top: 0,
                left: (screenSize.width - this.tankSize.width) / 2
            },
            bottomCenter: {
                top: screenSize.height - this.tankSize.height,
                left:  (screenSize.width - this.tankSize.width) / 2
            },
            leftCenter: {
                top: (screenSize.height - this.tankSize.height) / 2,
                left: 0
            },
            rightCenter: {
                top: (screenSize.height - this.tankSize.height) / 2,
                left: screenSize.width - this.tankSize.width
            },
        }
        this.position = positions[position];
    }

    setInitialDirection( position ) {
        const positions = {
            topCenter: 0,
            bottomCenter: 180,
            leftCenter: 270,
            rightCenter: 90
        }
        this.direction = positions[position];
    }

    setKeybind() {
        // binding keyCode's
        const sets = [
            { up: 87, down: 83, right: 68, left: 65, fire: 32 },
            { up: 38, down: 40, right: 39, left: 37, fire: 13 }
        ];

        this.keyboard = sets[this.index];
    }

    renderTank = ( DOM ) => {
        const tank = `<img class="tank"
                        src="./img/tanks/tank_${this.tankColor}.png"
                        data-index="${this.index}"
                        style="width: ${this.tankSize.width}px;
                            height: ${this.tankSize.height}px;
                            top: ${this.position.top}px;
                            left: ${this.position.left}px;
                            transform: rotate(${this.direction}deg);">`;
        DOM.insertAdjacentHTML('beforeend', tank);

        this.DOMtank = DOM.querySelector(`.tank[data-index="${this.index}"]`);

        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case this.keyboard.up:
                    this.keyboardPressed.up = true;
                    break;
                case this.keyboard.left:
                    this.keyboardPressed.left = true;
                    break;
                case this.keyboard.down:
                    this.keyboardPressed.down = true;
                    break;
                case this.keyboard.right:
                    this.keyboardPressed.right = true;
                    break;
            
                default:
                    break;
            }
        })

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case this.keyboard.up:
                    this.keyboardPressed.up = false;
                    break;
                case this.keyboard.left:
                    this.keyboardPressed.left = false;
                    break;
                case this.keyboard.down:
                    this.keyboardPressed.down = false;
                    break;
                case this.keyboard.right:
                    this.keyboardPressed.right = false;
                    break;
            
                default:
                    break;
            }
        })
    }

    move = ( dt ) => {
        this.position.top += 0;
        this.position.left += 0;
        this.DOMtank.style.top = this.position.top + 'px';
        this.DOMtank.style.left = this.position.left + 'px';
    }
}

export default Player;