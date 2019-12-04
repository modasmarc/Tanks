class Bullet {
    constructor ( playerID, x, y, direction ) {
        this.playerID = playerID;
        this.x = x;
        this.y = y;
        this.direction = direction;             // deg - sutampa su tanko kryptimi
        this.speed = 150;                       // 150px/s - greitis
        // this.lifeExpectancy = 2;
    }
}

export default Bullet;
© 2019 GitHub, Inc.