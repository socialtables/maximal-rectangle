// http://www.drdobbs.com/database/the-maximal-rectangle-problem/184410529
// status: brute force approach implemented
module.exports = function findMaxRect(grid) {
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
}