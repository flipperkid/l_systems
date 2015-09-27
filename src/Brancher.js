import Iterator from './Iterator';

class Brancher {
  constructor() {
    this.iterator = new Iterator();

    this.state = {};
    this.update();
    this.iterator.subscribe(() => this.update());
  }

  get() {
    return this.state;
  }

  subscribe(listener) {
    Object.observe(this.state, listener);
  }

  update() {
    var iteratorState = this.iterator.get();
    var angleIncrement = iteratorState.angleIncrement * Math.PI / 180;
    var angle = iteratorState.angle;
    var x = iteratorState.startCoords.x;
    var y = iteratorState.startCoords.y;

    var iterations = iteratorState.iterations;
    var pattern = iterations[iterations.length - 1].pattern;

    var branches = [];
    var nextBranchesStack = [];
    var currBranch = [];
    currBranch.push(x + ',' + y);
    for (var currPos = 0; currPos < pattern.length; currPos++) {
      var currChar = pattern[currPos];
      switch(currChar) {
				case '-':
					angle -= angleIncrement * iteratorState.lineLength;
					break;
				case '+':
					angle += angleIncrement * iteratorState.lineLength;
					break;
				case '[':
					nextBranchesStack.push({
            x: x,
            y: y,
            angle: angle
          });
					break;
				case ']':
					var nextBranch = nextBranchesStack.pop();
					x = nextBranch.x;
					y = nextBranch.y;
					angle = nextBranch.angle;

          branches.push({
            points: currBranch.join(' ')
          });
          currBranch = [];
          currBranch.push(x + ',' + y);
					break;
				default:
					x += Math.cos(angle) * 5;
					y += Math.sin(angle) * 5;
					currBranch.push(x + ',' + y)
			}
    }
    branches.push({
      points: currBranch.join(' ')
    });
    this.state.branches = branches;
  }
}

export default Brancher;
