import Player from "./tank.js";

class TanksGame {
    constructor ( target, p1Name, p2Name, groundType ) {
        this.game;
        this.DOM = document.querySelector(target);
        this.DOMground;
        // this.map = [];
        this.screenSize = {
            width: 900,
            height: 600
        }
        this.player1 = new Player(0, p1Name, 'red', 'rightCenter', this.screenSize);
        this.player2 = new Player(1, p2Name, 'blue', 'bottomCenter', this.screenSize);
        this.bullets = [];
        this.groundType = groundType || 'grass';

        this.init();
    }

    init() {
        this.DOM.classList.add('game');
        this.DOM.innerHTML = `<div class="ground"></div>`;
        this.DOMground = this.DOM.querySelector('.ground');
        this.DOMground.style.width = this.screenSize.width + 'px';
        this.DOMground.style.height = this.screenSize.height + 'px';
        this.DOMground.classList.add(this.groundType);
        this.player1.renderTank( this.DOMground );
        this.player2.renderTank( this.DOMground );

        // uzkuriame interfeiso perpiesima
        this.game = window.requestAnimationFrame(() => {
            this.start()
        })
    }

    start(){
        // tanku judejimas
        this.player1.move();
        this.player2.move();
        // kulku atsiradimas ir skrydimas
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