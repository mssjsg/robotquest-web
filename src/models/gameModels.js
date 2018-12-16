function Game({ stage, player, timeUpdateInterval = 100, screenWidth = 0, screenHeight = 0, tileDimen = 80 }) {
    if (stage) {
        this.stage = new Stage(stage);
    }
    if (player) {
        this.player = new Player(player);
    }
    this.timeUpdateInterval = timeUpdateInterval;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.tileDimen = tileDimen;
}

function Position({ x, y }) {
    this.x = x;
    this.y = y;
}

function Stage({ index = 0, width = 10, height = 10, tiles,
    objs, enemy, mapX = -1,  mapY = -1}) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    this.objs = objs;
    this.enemy = enemy;
    this.mapX = mapX;
    this.mapY = mapY;
}

function Tile({ color }) {
    this.color = color;
}

function Player({ name = "Teku", position = { x: 0, y: 0 }, targetPosition = { x: 0, y: 0 },
    hp = 100, mp = 0, exp = 0}) {
    this.name = name;
    this.position = new Position(position);
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
    this.targetPosition = targetPosition;
}

export {
    Position, Game, Stage, Tile, Player
}