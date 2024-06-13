const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    antialias: true,
    autoDensity: true,
    powerPreference: "high-performance"
});

app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "fixed";
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";
app.renderer.view.style.pointerEvents = "none"; 
app.renderer.view.style.zIndex = "20";

document.body.appendChild(app.view);

const handleResponsiveness = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", handleResponsiveness);
setTimeout(handleResponsiveness, 1000);

const historySize = 20;
const ropeSize = 100;

const trailTexture = PIXI.Texture.from("/images/trail.png");
const historyX = [];
const historyY = [];
const points = [];

for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}

for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

const rope = new PIXI.SimpleRope(trailTexture, points);

rope.blendmode = PIXI.BLEND_MODES.ADD;

app.stage.addChild(rope);

let mousePosition = null;
app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on("mousemove", (event) => {
    mousePosition = mousePosition || { x: 0, y: 0 };
    mousePosition.x = event.global.x;
    mousePosition.y = event.global.y;
});

app.ticker.add(() => {
    if (!mousePosition) return;

    historyX.pop();
    historyX.unshift(mousePosition.x);
    historyY.pop();
    historyY.unshift(mousePosition.y);

    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
        const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

        p.x = ix;
        p.y = iy;
    }
});

function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [
        getTangent(k, tangentFactor, array),
        getTangent(k + 1, tangentFactor, array)
    ];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (
        (2 * t3 - 3 * t2 + 1) * p[0] +
        (t3 - 2 * t2 + t) * m[0] +
        (-2 * t3 + 3 * t2) * p[1] +
        (t3 - t2) * m[1]
    );
}