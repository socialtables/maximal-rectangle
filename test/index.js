const test = require("tape").test;
const maximalRect = require("../index");
const solver = require("../lib/solver");

//test set to test the solver, the solution is ()
// northwest(lower left) corner: row 1, col 1
// southeast(upper right) corner: row 3, col 3
var testSetForSolver = [
    [{"inside": 0}, {"inside": 0},{"inside": 1},{"inside": 0},{"inside": 0}],
    [{"inside": 1}, {"inside": 1},{"inside": 1},{"inside": 1},{"inside": 1}],
    [{"inside": 0}, {"inside": 1},{"inside": 1},{"inside": 1},{"inside": 0}],
    [{"inside": 1}, {"inside": 1},{"inside": 1},{"inside": 1},{"inside": 1}],
    [{"inside": 0}, {"inside": 0},{"inside": 1},{"inside": 0},{"inside": 0}]
];

test('it is a function', (t) => {
    t.ok(maximalRect, "We are exporting the function.");
    t.end();
});

test('it can solve our test set', (t) => {
    var solution = solver(testSetForSolver);
    t.ok(solution.ll.row === 1 && solution.ll.col === 1 , "Solved the northwest corner.");
    t.ok(solution.ur.row === 3 && solution.ur.col === 3 , "Solved the southeast corner.");
    t.end();
});

