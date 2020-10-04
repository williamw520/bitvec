import test from "ava";
import microtime from "microtime";
import {BitVec} from "./bitvec.js";


let nowMS = new Date().getTime();
let beginUS = microtime.now();
console.log("Benchmark tests ");


test("test100", t => {
    t.pass();
});


test("dummy", t => {
    t.pass();
});
