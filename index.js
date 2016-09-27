var webgl_heatmap = require('./bin/webgl-heatmap');
// var req_anim_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame;

function HM(map) {
    this.heatmap_canvas = document.createElement('canvas');
    this.heatmap_canvas.classList.add('heatmap-canvas');
    map._canvasContainer.appendChild(this.heatmap_canvas);
    this.heatmap_canvas.setAttribute('style', 'position: absolute;');
    map.on('move', (this.draw).bind(this));
    // map.on('moveend', (this._resetHeatmap).bind(this));
    // map.on('zoom', (this._resetHeatmap).bind(this));
    // map.on('resize', (this._resetHeatmap).bind(this));
    this.data = [];

    this.heatmap = webgl_heatmap.createWebGLHeatmap({
        canvas: this.heatmap_canvas
    });

    this._resizeCanvas(map._container.offsetWidth, map._container.offsetHeight);
    // req_anim_frame((this._updateHeatmap).bind(this));
};

// HM.prototype._updateHeatmap = function() {
//     this.heatmap.multiply(.99925);
//     this.heatmap.clamp(0.0, 1.0);
//     this.heatmap.blur();
//     this.heatmap.update();
//     this.heatmap.display();
//     req_anim_frame((this._updateHeatmap).bind(this));
// }

HM.prototype.resize = function() {
    this._resizeCanvas(event.target.container.offsetWidth, event.target.container.offsetHeight);
    this.heatmap.adjustSize();
    this.reposition();
    this.draw();
}

HM.prototype.reposition = function() {

}

HM.prototype._resetHeatmap = function(event) {
    if (event.type === 'resize') {
        this._resizeCanvas(event.target.container.offsetWidth, event.target.container.offsetHeight);
    }
    // this.heatmap.multiply(0.5);
    this.heatmap.update();
    this.heatmap.display();
    // this.heatmap.clamp(0.0, 1.0);
    // this.heatmap.blur();
}

HM.prototype._resizeCanvas = function(width, height) {
    var pixelRatio = window.devicePixelRatio || 1;

    // Request the required canvas size taking the pixelratio into account.
    this.heatmap_canvas.width = pixelRatio * width;
    this.heatmap_canvas.height = pixelRatio * height;

    // Maintain the same canvas size, potentially downscaling it for HiDPI displays
    this.heatmap_canvas.style.width = width + 'px';
    this.heatmap_canvas.style.height = height + 'px';

    this.heatmap.adjustSize();
}

HM.prototype.addPoint = function(x, y, size, intensity) {
    this.data.push([x, y, size, intensity]);
}

HM.prototype.draw = function() {
    this.heatmap.clear();

    var length = this.data.length;
    for (var i = 0; i < length; i++) {

        var lnglat = new mapboxgl.LngLat(this.data[i][0], this.data[i][1]);
        var point = mainmap.project(lnglat);

        this.heatmap.addPoint(point.x, point.y,
            this.data[i][2],
            this.data[i][3]);
    }
    this.heatmap.update();
    this.heatmap.display();
}

module.exports.HeatMap = HM;

module.exports.heatmap = function(map) {
    return new HM(map);
}