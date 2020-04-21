"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RxJS v6+
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
//emit value every 1s
const source = rxjs_1.interval(1000);
const example = source.pipe(operators_1.map(val => {
    if (val > 5) {
        //error will be picked up by retryWhen
        throw val;
    }
    return val;
}), operators_1.retryWhen(errors => errors.pipe(
//log error message
operators_1.tap(val => console.log(`Value ${val} was too high!`)), 
//restart in 6 seconds
operators_1.delayWhen(val => rxjs_1.timer(val * 1000)))));
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 6 seconds then repeat
*/
const subscribe = example.subscribe(val => console.log(val));
//# sourceMappingURL=retryWhen.js.map