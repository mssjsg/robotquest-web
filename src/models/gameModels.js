export const MODE_MAP = 0;
export const MODE_BATTLE = 1;

export function Game({
    stage,
    player,
    timeUpdateInterval = 100,
    mode = MODE_MAP,
    modeMeta
}) {
    if (stage) {
        this.stage = new Stage(stage);
    }
    if (player) {
        this.player = new Player(player);
    }
    this.timeUpdateInterval = timeUpdateInterval;
    this.mode = mode;
    if (modeMeta != undefined) {
        this.modeMeta = Object.assign({}, modeMeta);
    }
}

export function Position({ x, y }) {
    this.x = x;
    this.y = y;
}

export function Stage({
    index = 0,
    width = 10,
    height = 10,
    tiles,
    objs,
    chars,
    mapX = -1, 
    mapY = -1,
    targetPosition = { x: 0, y: 0 },
    screenWidth = 0,
    screenHeight = 0,
    tileDimen = 80
}) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    this.objs = objs;
    this.chars = chars;
    this.mapX = mapX;
    this.mapY = mapY;
    this.targetPosition = targetPosition;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.tileDimen = tileDimen;
}

export function Tile({ color }) {
    this.color = color;
}

export function Player({
    name = "Teku",
    position = { x: -1, y: -1 },
    screenPosition = { x: -99999, y: 0 },
    hp = 100,
    mp = 0,
    exp = 0,
    speed = 70
}) {
    this.name = name;
    this.position = new Position(position);
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
    this.speed = speed;
    this.screenPosition = screenPosition;
}

export function GameObject({
    type = 0,
    name = "unknown"
}) {
    this.type = type;
    this.name = name;
}