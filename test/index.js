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
    t.deepEqual(solution.ll, { row: 1, col: 1 }, "Solving the northwest corner.");
    t.deepEqual(solution.ur, { row: 3, col: 3 }, "Solving the southeast corner.");
    t.end();
});

