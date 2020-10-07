import test from "ava";
import microtime from "microtime";
import seedrandom from "seedrandom";
import {BitVec} from "./bitvec.js";



function logtime(tag, mt1, mt2, nbits, iteration) {
    let elapse = mt2 - mt1;
    let rate = Math.floor( iteration / (elapse || 1) * 1000000 );
    let msg = (tag + " - ").padEnd(25, " ") +
        "bits: " + (nbits.toLocaleString() + "; ").padEnd(11, " ") +
        "pass: " + (iteration.toLocaleString() + "; ").padEnd(13, " ") +
        "time: " + elapse.toLocaleString() + "us; " +
        "rate: " + rate.toLocaleString() + " op/sec";
    console.log(msg);
}

test("benchmark", t => {
    console.log("BitVec benchmark tests, on a million-bit vector.");

    let mt1, mt2, iteration, nbits = 1000000;
    let b1 = new BitVec(nbits);     // one million bits

    // console.log("number of bits: " + b1.nbits.toLocaleString() + "; number of words: " + b1.wordCount.toLocaleString());
    // console.log("");

    iteration = 100000000;
    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOn(0);
    logtime("bitOn 0", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOn(1);
    logtime("bitOn 1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOn(32);
    logtime("bitOn 32", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOn(999999);
    logtime("bitOn 999999", mt1, microtime.now(), nbits, iteration);


    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOff(0);
    logtime("bitOff 0", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOff(1);
    logtime("bitOff 1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOff(32);
    logtime("bitOff 32", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.bitOff(999999);
    logtime("bitOff 999999", mt1, microtime.now(), nbits, iteration);

    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.flip(0);
    logtime("flip 0", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.flip(1);
    logtime("flip 1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.flip(32);
    logtime("flip 32", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.flip(999999);
    logtime("flip 999999", mt1, microtime.now(), nbits, iteration);

    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.get(0);
    logtime("get 0", mt1, microtime.now(), nbits, iteration);
    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.get(1);
    logtime("get 1", mt1, microtime.now(), nbits, iteration);
    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.get(32);
    logtime("get 32", mt1, microtime.now(), nbits, iteration);
    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.get(999999);
    logtime("get 999999", mt1, microtime.now(), nbits, iteration);


    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOn(0, 1);
    logtime("rangeOn 0-1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOn(1,31);
    logtime("rangeOn 1-31", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOn(32,256);
    logtime("rangeOn 32-256", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOn(999900,999999);
    logtime("rangeOn 999900-999999", mt1, microtime.now(), nbits, iteration);

    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOff(0, 1);
    logtime("rangeOff 0-1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOff(1,31);
    logtime("rangeOff 1-31", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOff(32,256);
    logtime("rangeOff 32-256", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeOff(999900,999999);
    logtime("rangeOff 999900-999999", mt1, microtime.now(), nbits, iteration);
    
    
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeFlip(0, 1);
    logtime("rangeFlip 0-1", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeFlip(1,31);
    logtime("rangeFlip 1-31", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeFlip(32,256);
    logtime("rangeFlip 32-256", mt1, microtime.now(), nbits, iteration);

    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.rangeFlip(999900,999999);
    logtime("rangeFlip 999900-999999", mt1, microtime.now(), nbits, iteration);
    
    
    iteration = 1000;
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.cardinality();
    logtime("cardinality", mt1, microtime.now(), nbits, iteration);

    
    iteration = 1000;
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.clear();
    logtime("clear", mt1, microtime.now(), nbits, iteration);


    iteration = 1000;
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.setAll();
    logtime("setAll", mt1, microtime.now(), nbits, iteration);
    
    
    iteration = 100000000;
    let b2 = new BitVec(1000000);
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.equals(b2);
    logtime("equals early diff", mt1, microtime.now(), nbits, iteration);
    
    
    iteration = 10000;
    b1.randomize(new seedrandom("test123"));        // generate the same random bits with the same seed
    b2.randomize(new seedrandom("test123"));        // generate the same random bits with the same seed
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++)
        b1.equals(b2);
    logtime("equals same", mt1, microtime.now(), nbits, iteration);


    iteration = 1000;
    nbits = 100000;
    let bn = new BitVec(nbits);
    bn.randomize(new seedrandom("test123"));
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++) {
        let from = 0, found = 0;
        while (true) {
            if ((found = bn.nextOn(from)) < 0)
                break;
//            t.is(bn.isOn(found), true);
            from = found + 1;
        }
    }
    logtime("nextOn search loop", mt1, microtime.now(), nbits, iteration);

    
    iteration = 1000;
    nbits = 100000;
    bn = new BitVec(nbits);
    bn.randomize(new seedrandom("test123"));
    mt1 = microtime.now();
    for (let i = 0; i < iteration; i++) {
        let from = 0, found = 0;
        while (true) {
            if ((found = bn.nextOff(from)) < 0)
                break;
//            t.is(bn.isOff(found), true);
            from = found + 1;
        }
    }
    logtime("nextOff search loop", mt1, microtime.now(), nbits, iteration);


    t.pass();
});

