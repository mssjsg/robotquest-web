export const MODE_MAP = 0;
export const MODE_BATTLE = 1;

/**
 * overall game status
 */
export function Game({
    stage,
    battle,
    player,
    timeUpdateInterval = 100,
    mode = MODE_MAP
}) {
    if (stage !== undefined) {
        this.stage = new Stage(stage);
    }
    if (player !== undefined) {
        this.player = new Player(player);
    }
    this.timeUpdateInterval = timeUpdateInterval;
    this.mode = mode;
    if (battle !== undefined) {
        this.battle = new Battle(battle);
    }
}

export function Position({ x, y }) {
    this.x = x;
    this.y = y;
}

/**
 * Battle mode
 * @param {enemies, background}
 */
export function Battle({
    enemies,
    background
}) {
    this.enemies = enemies;
    this.background = background;
}

/**
 * map status
 */
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
    if (objs !== undefined) {
        this.objs = objs.map(col => col.map(obj => {
            if (obj != null) {
                return new MapObject(obj);
            } else {
                return null;
            }
        }));
    }
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

export function Enemy({
    name = "Bad guy",
    hp = 100,
    mp = 0,
}) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
}

/**
 * player status
 * TODO teammates models??
 */
export function Player({
    name = "Teku",
    position = { x: -1, y: -1 },
    screenPosition = { x: -99999, y: 0 },
    hp = 100,
    mp = 0,
    exp = 0,
    speed = 70,
    skills
}) {
    this.name = name;
    this.position = new Position(position);
    this.hp = hp;
    this.mp = mp;
    this.exp = exp;
    this.speed = speed;
    this.screenPosition = screenPosition;
    if (skills !== undefined) {
        this.skills = skills.map(skill => new Skill(skill));
    } else {
        this.skills = [];
    }
}

export function MapObject({
    type = 0,
    name = "unknown"
}) {
    this.type = type;
    this.name = name;
}

export function Skill({
    name = "punch",
    damage = 20
}) {
    this.name = name;
    this.damage = damage;
}