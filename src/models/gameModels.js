function Game({ stage, player }) {
    this.stage = new Stage(stage);
    this.player = new Player(player);
}

function Position({ x, y }) {
    this.x = x;
    this.y = y;
}

function Stage({ index = 0, width = 10, height = 10, tiles, objs, enemy }) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    this.objs = objs;
    this.enemy = enemy;
}

function Tile({ color }) {
    this.color = color;
}

function Player({ name = "Teku", position = { x: 0, y: 0 }, hp = 100, mp = 0, exp = 0}) {
    this.name = name;
    this.position = new Position(position);
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
}

export {
    Position, Game, Stage, Tile, Player
}