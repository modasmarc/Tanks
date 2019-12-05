import Player from "./tank.js";
import Bullet from "./bullet.js";

class TanksGame {
    constructor ( target, p1Name, p2Name, groundType ) {
        this.game;
        this.dt = 0;
        this.gameTime = Date.now();
        this.DOM = document.querySelector(target);
        this.DOMground;
        // this.map = [];
        this.screenSize = {
            width: 900,
            height: 600
        }
        this.player1 = new Player(0, p1Name, 'red', 'leftCenter', this.screenSize);
        this.player2 = new Player(1, p2Name, 'blue', 'bottomCenter', this.screenSize);
        this.bullets = [];
        this.groundType = groundType || 'grass';

        this.init();
    }

    init() {
        this.DOM.classList.add('game');
        this.DOM.innerHTML = `
        <div class="info player-0"></div>
        <div class="info player-1"></div>
        <div class="ground"></div>`;
        this.DOMground = this.DOM.querySelector('.ground');
        this.DOMplayer0info = this.DOM.querySelector('.info.player-0');
        this.DOMplayer1info = this.DOM.querySelector('.info.player-1');
        this.DOMground.style.width = this.screenSize.width + 'px';
        this.DOMground.style.height = this.screenSize.height + 'px';
        this.DOMground.classList.add(this.groundType);
        this.player1.renderTank( this.DOMground, this.DOMplayer0info );
        this.player2.renderTank( this.DOMground, this.DOMplayer1info );

        // uzkuriame interfeiso perpiesima
        this.game = window.requestAnimationFrame(() => {
            this.start()
        })
    }

    start(){
        const now = Date.now();
        this.dt = (now - this.gameTime) / 1000;
        this.gameTime = now;

        // tanku judejimas
        this.player1.move( this.dt );
        this.player2.move( this.dt );

        // kulku atsiradimas ir skrydimas
            // tanko objektas savo viduje tai suvaldo
        if ( this.player1.didFire() ) {
            this.bullets = [...this.bullets, new Bullet( this.DOMground, ...this.player1.positionInfo() )];
        }
        if ( this.player2.didFire() ) {
            this.bullets = [...this.bullets, new Bullet( this.DOMground, ...this.player2.positionInfo() )];
        }
        for ( let b=0; b<this.bullets.length; b++ ) {
            const bullet = this.bullets[b];
            bullet.move();
        }
    
        // patikrinimas, ar kulkos tarpusavyje nesusinaikino
        // patikrinimas, ar kulkos nesunaikino prieso tanko
        // patikrinimas, ar kulka nepaliete sienos (ismetame is zaidimo)
        // patikrinimas, ar tankas neatsitrenke i siena (jei taip - visiskas sustojimas)
        // patikrinimas, ar tankas neprarado visu gyvybiu (kitam pergale)
        // patikrinimas, ar tankai nesusidauze tarpusavyje (visiskas sustojimas)

        // is naujo perpiesime interfeisa
        window.requestAnimationFrame(() => {
            this.start()
        })
    }
}

export default TanksGame;