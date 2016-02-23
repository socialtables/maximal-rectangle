// http://www.drdobbs.com/database/the-maximal-rectangle-problem/184410529
// status: brute force approach implemented
/*module.exports = function findMaxRect(grid) {
    var ll;
    var ur;
    var gHeight = grid.length;
    var gWidth = grid[0].length;

    var best_ll = {row: 1, col: 1};
    var best_ur = {row: 0, col: 0};
    for (var llRow = 0; llRow < gHeight; llRow++) {
        for (var llCol = 0; llCol < gWidth; llCol++) {
            for (var urRow = llRow; urRow < gHeight; urRow++) {
                for (var urCol = llCol; urCol < gWidth; urCol++) {
                    ll = {row: llRow, col: llCol};
                    ur = {row: urRow, col: urCol};
                    if (areaInGrid(ll, ur) > areaInGrid(best_ll, best_ur) && allInside(ll, ur, grid)){
                        best_ll = ll;
                        best_ur = ur;
                    }
                }
            }
        }
    }


    return {
        ll: best_ll,
        ur: best_ur
    };
};

function areaInGrid(ll, ur) {
    if (ll.col > ur.col || ll.row > ur.row) {
        return 0;
    }
    return (ur.col - ll.col + 1) * (ur.row - ll.row + 1);
}

function allInside(ll, ur, grid) {
    if (ll.col > ur.col || ll.row > ur.row) {
        return false;
    }
    for (var row = ll.row; row <= ur.row; row++) {
        for(var col = ll.col; col <= ur.col; col++) {
            if (!grid[row][col].inside) {
                return false;
            }
        }
    }
    return true;
}*/

module.exports = function findMaxRect(grid) {
    var ll;
    var ur;
    var gHeight = grid.length;
    var gWidth = grid[0].length;

    var best_ll = {row: 1, col: 1};
    var best_ur = {row: -1, col: -1};

    for (var row = 0; row < gHeight-1; row++) {
        for (var col = 0; col < gWidth-1; col++) {
            ll = { row: row, col: col };
            ur = grow_ones(grid, ll, gWidth, gHeight);
            if (areaInGrid(ll, ur) > areaInGrid(best_ll, best_ur)){
                best_ll = ll;
                best_ur = ur;
            }
        }
    }

    return {
        ll: best_ll,
        ur: best_ur
    };
}

function areaInGrid(ll, ur) {
    if (ll.col > ur.col || ll.row > ur.row) {
        return 0;
    }
    return (ur.col - ll.col + 1) * (ur.row - ll.row + 1);
}

function grow_ones(grid, ll, width, height) {
    var ur = {row: ll.row-1, col: ll.col-1 } // start the upper right at the same position as lower left
    var y_max = height;
    var x = ll.col-1;

    //console.log("x1:" + (x+1), "y1:" + ll.row, "gridVal: " + grid[ll.row][x+1].inside);
    while ( (x+1) < width && grid[ll.row][x+1].inside) {
        x += 1;
        var y = ll.row;
        //console.log("x2:" + (x), "y2:" + (y+1), "gridVal: " + grid[y+1][x].inside);
        while ( (y+1) < y_max && grid[y+1][x].inside) {
            y += 1;
        } 
        x_max = x;
        var test_ur = { row: y, col: x };
        if (areaInGrid(ll, test_ur) > areaInGrid(ll, ur)) {
            ur = test_ur;
        }
    }
    return ur;
}

