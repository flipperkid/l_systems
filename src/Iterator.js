import store from './store';

class Iterator {
  constructor() {
    this.state = {};
    this.update();
    store.subscribe(() => this.update());
  }

  get() {
    return this.state;
  }

  subscribe(listener) {
    Object.observe(this.state, listener);
  }

  update() {
    var iterations = [];
    var storeState = store.getState();
    iterations.push({
      number: 0,
      pattern: storeState.start
    });

    for (var iteration = 0; iteration < storeState.iterations; iteration++) {
      var initialPattern = iterations[iteration];
      var patternLength = initialPattern.length;
      var newPattern = '';
      for (var currPos = 0; currPos < patternLength; currPos++) {
        var currChar = initialPattern[currPos];
        if (currChar in storeState.rules) {
          newPattern += storeState.rules[currChar];
        } else {
          newPattern += currChar;
        }
      }
      iterations.push({
        number: iteration + 1,
        pattern: newPattern
      });
    }
    this.state.iterations = iterations;
  }
}

export default Iterator;
