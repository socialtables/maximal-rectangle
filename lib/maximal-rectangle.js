const utils = require("geometry-utils");
const solver = require("./solver");
const debug = require("debug")("st:maximal-rect:main");
const SEARCH_GRID_SIZE_DEFAULT = 12; //because our normal use case units are inches, we use 1ft as a reasonable default

/**
 Return the largest rectangle inside the given polygon.

 @param poly Array of x, y coordinates describing a polygon, in the order in which those points should be drawn.
 @param options Object describing options, including:

 vdebug: Whether to pump algorithm events to the array for visual debugging.  If this is false, the events array
 returned will be empty,

 searchGridSize: Size of unit for the search grid in phase 1

 @return [rect, area, events] Array of result data, including:
 rect Object describing the result rectangle, including:
 cx Center X coordinate of the result rectangle
 cy Center Y coordinate of the result rectangle
 width Width of the result rectangle
 height Height of the result rectangle
 angle Angle of the rectangle's axis, in degrees
 area Total area of the result rectangle
 events Array of events that occurred while finding the rectangle
 */
module.exports = function(poly, options) {
    var searchGridSize = SEARCH_GRID_SIZE_DEFAULT;
    if (options) {
        if (options.vdebug) {
            vDebugFlag = true;
        }
        if (options.searchGridSize) {
            searchGridSize = options.searchGridSize;
        }

    }

    // Step - Bounding Box
    var bbox = boundingBox(poly);
    debug("bounding-box", bbox);

    // Step - Use the bounding box to contruct a grid, mark squares that are inside the poly as such
    var grid = searchGrid(bbox, searchGridSize, poly);
    debug("search-grid-creation", JSON.stringify({
        gWidth: grid[0].length,
        gHeight: grid.length
    }));

    // Step - Algorithm to find largest rect in the constructed data grid
    var maxRectCorners = solver(grid);
    debug("solver-done", maxRectCorners);

    var maxRect = {
        nwX: grid[maxRectCorners.ll.row][maxRectCorners.ll.col].nw.x,
        nwY: grid[maxRectCorners.ll.row][maxRectCorners.ll.col].nw.y,
        seX: grid[maxRectCorners.ur.row][maxRectCorners.ur.col].se.x,
        seY: grid[maxRectCorners.ur.row][maxRectCorners.ur.col].se.y
    };
    maxRect.width = maxRect.seX - maxRect.nwX;
    maxRect.height = maxRect.seY - maxRect.nwY;

    return {
        bbox: bbox,
        grid: grid,
        maxRect: maxRect
    };
};

function boundingBox(poly) {
    var tmp = utils.getBoundingBox(poly);
    vdebug({
        type: "bbox",
        value: tmp
    });
    return tmp;
}

function searchGrid(box, size, poly) {
    var gridHeight = Math.ceil(box.height / size);
    var gridWidth = Math.ceil(box.width / size);

    var grid = [];
    for (var y = 0; y < gridHeight; y++) {
        var row = [];
        for (var x = 0; x < gridWidth; x++) {
            //TODO construct the square
            var square = {
                nw: {x: box.minX + x*size, y: box.minY + y*size},
                ne: {x: box.minX + x*size + size, y: box.minY + y*size},
                se: {x: box.minX + x*size + size, y: box.minY + y*size + size},
                sw: {x: box.minX + x*size, y: box.minY + y*size + size}
            };
            square.inside = isSquareInsidePoly(square, poly);
            row.push(square);
        }
        grid.push(row)
    }

    return grid;
}

function isSquareInsidePoly(square, poly) {
    var nwInPoly = utils.pointInPoly(square.nw, poly);
    var neInPoly = utils.pointInPoly(square.ne, poly);
    var seInPoly = utils.pointInPoly(square.se, poly);
    var swInPoly = utils.pointInPoly(square.sw, poly);

    //TODO check edge intersections as well as vertices
    /*var nSideInPoly = utils.lineIntersection();
     var eSideInPoly = utils.lineIntersection();
     var sSideInPoly = utils.lineIntersection();
     var wSideInPoly = utils.lineIntersection();*/

    return nwInPoly && neInPoly && seInPoly && swInPoly;
}

var debugEvents = [];
var vDebugFlag = false;
function vdebug(obj) {
    if (vDebugFlag) {
        debugEvents.push(obj);
    }
}
