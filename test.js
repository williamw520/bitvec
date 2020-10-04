
import test from "ava";
import {BitVec} from "./bitvec.js";


test("nbits", t => {
    t.is(new BitVec( ).nbits, 32);
    t.is(new BitVec(0).nbits, 32);
    t.is(new BitVec(1).nbits, 1);
    t.is(new BitVec(2).nbits, 2);
    t.is(new BitVec(3).nbits, 3);
    t.is(new BitVec(7).nbits, 7);
    t.is(new BitVec(8).nbits, 8);
    t.is(new BitVec(15).nbits, 15);
    t.is(new BitVec(16).nbits, 16);
    t.is(new BitVec(31).nbits, 31);
    t.is(new BitVec(32).nbits, 32);
    t.is(new BitVec(33).nbits, 33);
    t.is(new BitVec(63).nbits, 63);
    t.is(new BitVec(64).nbits, 64);
    t.is(new BitVec(65).nbits, 65);
});

test("bitOn", t => {
    let b1 = new BitVec(32);
    b1.bitOn(0);
    t.is(b1.get(0), 1);
    t.is(b1.get(1), 0);
    t.is(b1.get(31), 0);
    for (let i = 1; i < 32; i++)
        t.is(b1.get(i), 0);

    b1 = new BitVec(100);
    b1.bitOn(0);
    b1.bitOn(1);
    b1.bitOn(98);
    b1.bitOn(99);
    t.is(b1.get(0), 1);
    t.is(b1.get(1), 1);
    t.is(b1.get(98), 1);
    t.is(b1.get(99), 1);
    for (let i = 2; i < 98; i++)
        t.is(b1.get(i), 0);
});

test("bitOff", t => {
    let b1 = new BitVec(32);

    b1.bitOn(0);
    b1.bitOff(0);
    for (let i = 1; i < 32; i++)
        t.is(b1.get(i), 0);

    b1 = new BitVec(100);
    b1.bitOn(0);
    b1.bitOn(1);
    b1.bitOff(1);
    b1.bitOn(98);
    b1.bitOff(98);
    t.is(b1.get(0), 1);
    t.is(b1.get(1), 0);
    t.is(b1.get(98), 0);
});

test("set", t => {
    let b1 = new BitVec(32);
    b1.set(0, 1);
    b1.set(1, 0);
    b1.set(2, 1);
    b1.set(2, 0);
    t.is(b1.get(0), 1);
    t.is(b1.get(1), 0);
    t.is(b1.get(2), 0);
    for (let i = 2; i < 32; i++)
        t.is(b1.get(i), 0);

    b1 = new BitVec(100);
    b1.set(0, 0);
    t.is(b1.get(0), 0);
    b1.set(0, 1);
    t.is(b1.get(0), 1);
    for (let i = 0; i < 99; i++) {
        b1.set(i, 0);
        t.is(b1.get(i), 0);
        b1.set(i, 1);
        t.is(b1.get(i), 1);
    }
});

test("flip", t => {
    let b1 = new BitVec(32);
    b1.flip(1);
    t.is(b1.get(1), 1);
    b1.flip(1);
    t.is(b1.get(1), 0);
    t.is(b1.get(0), 0);
    for (let i = 2; i < 32; i++)
        t.is(b1.get(i), 0);

    b1 = new BitVec(100);
    b1.flip(1);
    t.is(b1.get(1), 1);
    b1.flip(1);
    t.is(b1.get(1), 0);
    t.is(b1.get(0), 0);
    for (let i = 2; i < 99; i++)
        t.is(b1.get(i), 0);
});

test("isOn", t => {
    let b1 = new BitVec(32);
    b1.flip(1);
    t.is(b1.isOn(1), true);
    b1.flip(1);
    t.is(b1.isOn(1), false);
    t.is(b1.isOn(0), false);
    for (let i = 2; i < 32; i++)
        t.is(b1.isOn(i), false);

    b1 = new BitVec(100);
    b1.flip(1);
    t.is(b1.isOn(1), true);
    b1.flip(1);
    t.is(b1.isOn(1), false);
    t.is(b1.isOn(0), false);
    for (let i = 2; i < 99; i++)
        t.is(b1.isOn(i), false);
});

test("isOff", t => {
    let b1 = new BitVec(32);
    b1.flip(1);
    t.is(b1.isOff(1), false);
    b1.flip(1);
    t.is(b1.isOff(1), true);
    t.is(b1.isOff(0), true);
    for (let i = 2; i < 32; i++)
        t.is(b1.isOff(i), true);

    b1 = new BitVec(100);
    b1.flip(1);
    t.is(b1.isOff(1), false);
    b1.flip(1);
    t.is(b1.isOff(1), true);
    t.is(b1.isOff(0), true);
    for (let i = 2; i < 99; i++)
        t.is(b1.isOff(i), true);
});

test("clear", t => {
    let b1 = new BitVec(32);
    b1.flip(1);
    t.is(b1.isOn(1), true);
    b1.clear();
    for (let i = 0; i < 32; i++)
        t.is(b1.isOn(i), false);

    b1 = new BitVec(100);
    b1.flip(1);
    t.is(b1.isOff(1), false);
    b1.clear();
    for (let i = 0; i < 100; i++)
        t.is(b1.isOff(i), true);
});

test("setAll", t => {
    let b1 = new BitVec(32);
    b1.setAll();
    for (let i = 0; i < 32; i++)
        t.is(b1.isOn(i), true);

    b1 = new BitVec(100);
    b1.setAll();
    for (let i = 0; i < 100; i++)
        t.is(b1.isOn(i), true);
});

test("randomize", t => {
    let b1 = new BitVec(32);
    b1.randomize();
    let sum = 0;
    for (let i = 0; i < 32; i++)
        sum += b1.get(i);
    t.is(sum > 0, true);
    //console.log("32 bits: " + b1.toString());

    b1 = new BitVec(100);
    b1.randomize();
    sum = 0;
    for (let i = 0; i < 100; i++)
        sum += b1.get(i);
    t.is(sum > 0, true);
});

test("cardinality", t => {
    let b1 = new BitVec(32);
    b1.randomize();
    let sum = 0;
    for (let i = 0; i < 32; i++)
        sum += b1.get(i);
    t.is(sum, b1.cardinality());

    b1.clear();
    b1.bitOn(5);
    t.is(1, b1.cardinality());

    b1 = new BitVec(100);
    b1.bitOn(99);
    t.is(1, b1.cardinality());

    b1.randomize();
    sum = 0;
    for (let i = 0; i < 100; i++)
        sum += b1.get(i);
    t.is(sum, b1.cardinality());

    b1.clear();
    t.is(0, b1.cardinality());
    
});

test("nextOn", t => {
    let b1 = new BitVec(32);
    b1.bitOn(0);
    t.is(b1.nextOn(0), 0);

    b1.bitOn(4);
    b1.bitOn(5);
    b1.bitOn(15);
    b1.bitOn(16);
    b1.bitOn(17);
    b1.bitOn(31);
    t.is(b1.nextOn(1), 4);
    t.is(b1.nextOn(4), 4);
    t.is(b1.nextOn(5), 5);
    t.is(b1.nextOn(6), 15);
    t.is(b1.nextOn(16), 16);
    t.is(b1.nextOn(17), 17);
    t.is(b1.nextOn(18), 31);

    b1 = new BitVec(100);
    b1.bitOn(0);
    t.is(b1.nextOn(0), 0);

    b1.bitOn(74);
    b1.bitOn(75);
    b1.bitOn(85);
    b1.bitOn(86);
    b1.bitOn(87);
    b1.bitOn(99);
    t.is(b1.nextOn(0), 0);
    t.is(b1.nextOn(1), 74);
    t.is(b1.nextOn(74), 74);
    t.is(b1.nextOn(75), 75);
    t.is(b1.nextOn(76), 85);
    t.is(b1.nextOn(86), 86);
    t.is(b1.nextOn(87), 87);
    t.is(b1.nextOn(88), 99);
    
});

test("nextOff", t => {
    let b1 = new BitVec(32);
    b1.setAll();
    b1.bitOff(0);
    t.is(b1.nextOff(0), 0);

    b1.bitOff(4);
    b1.bitOff(5);
    b1.bitOff(15);
    b1.bitOff(16);
    b1.bitOff(17);
    b1.bitOff(31);
    t.is(b1.nextOff(1), 4);
    t.is(b1.nextOff(4), 4);
    t.is(b1.nextOff(5), 5);
    t.is(b1.nextOff(6), 15);
    t.is(b1.nextOff(16), 16);
    t.is(b1.nextOff(17), 17);
    t.is(b1.nextOff(18), 31);

    b1 = new BitVec(100);
    b1.setAll();
    b1.bitOff(0);
    t.is(b1.nextOff(0), 0);

    b1.bitOff(74);
    b1.bitOff(75);
    b1.bitOff(85);
    b1.bitOff(86);
    b1.bitOff(87);
    b1.bitOff(99);
    t.is(b1.nextOff(0), 0);
    t.is(b1.nextOff(1), 74);
    t.is(b1.nextOff(74), 74);
    t.is(b1.nextOff(75), 75);
    t.is(b1.nextOff(76), 85);
    t.is(b1.nextOff(86), 86);
    t.is(b1.nextOff(87), 87);
    t.is(b1.nextOff(88), 99);
    
});

test("rangeOn", t => {
    let b1 = new BitVec(100);
    b1.rangeOn(0, 1);
    t.is(b1.cardinality(), 1);
    t.is(b1.isOn(0), true);

    b1.rangeOn(0, 32);
    t.is(b1.cardinality(), 32);
    for (let i = 0; i < 0; i++)     t.is(b1.isOn(i), false);
    for (let i = 0; i < 32; i++)    t.is(b1.isOn(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeOn(0, 32);
    t.is(b1.cardinality(), 32);
    for (let i = 0; i < 0; i++)     t.is(b1.isOn(i), false);
    for (let i = 0; i < 32; i++)    t.is(b1.isOn(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.rangeOn(29, 55);
    t.is(b1.cardinality(), 55);
    for (let i = 0; i < 0; i++)     t.is(b1.isOn(i), false);
    for (let i = 0; i < 55; i++)    t.is(b1.isOn(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeOn(29, 55);
    t.is(b1.cardinality(), 55-29);
    for (let i = 0; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOn(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeOn(29, 29);
    t.is(b1.cardinality(), 0);
    for (let i = 0; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 29; i++)   t.is(b1.isOn(i), true);
    for (let i = 29; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeOn(99, 100);
    t.is(b1.cardinality(), 1);
    for (let i = 0; i < 99; i++)    t.is(b1.isOn(i), false);
    for (let i = 99; i < 100; i++)  t.is(b1.isOn(i), true);
    for (let i = 100; i < 100; i++) t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeOn(6, 8);
    b1.rangeOn(29, 55);
    b1.rangeOn(90, 100);
    t.is(b1.cardinality(), (8-6) + (55-29) + (100-90));
    for (let i = 0; i < 6; i++)     t.is(b1.isOn(i), false);
    for (let i = 6; i < 8; i++)     t.is(b1.isOn(i), true);
    for (let i = 8; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOn(i), true);
    for (let i = 55; i < 90; i++)   t.is(b1.isOn(i), false);
    for (let i = 90; i < 100; i++)  t.is(b1.isOn(i), true);

    b1.clear();
    b1.rangeOn(0, 100);
    t.is(b1.cardinality(), 100);
    for (let i = 0; i < 100; i++)   t.is(b1.isOn(i), true);
});

test("rangeOff", t => {
    let b1 = new BitVec(100);
    b1.setAll();
    b1.rangeOff(0, 1);
    t.is(b1.cardinality(), 99);
    t.is(b1.isOff(0), true);

    b1.rangeOff(0, 32);
    t.is(b1.cardinality(), 100-32);
    for (let i = 0; i < 0; i++)     t.is(b1.isOff(i), false);
    for (let i = 0; i < 32; i++)    t.is(b1.isOff(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOff(i), false);

    b1.setAll();
    b1.rangeOff(0, 32);
    t.is(b1.cardinality(), 100-32);
    for (let i = 0; i < 0; i++)     t.is(b1.isOff(i), false);
    for (let i = 0; i < 32; i++)    t.is(b1.isOff(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOff(i), false);

    b1.rangeOff(29, 55);
    t.is(b1.cardinality(), 100-55);
    for (let i = 0; i < 0; i++)     t.is(b1.isOff(i), false);
    for (let i = 0; i < 55; i++)    t.is(b1.isOff(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOff(i), false);

    b1.setAll();
    b1.rangeOff(29, 55);
    t.is(b1.cardinality(), 100-(55-29));
    for (let i = 0; i < 29; i++)    t.is(b1.isOff(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOff(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOff(i), false);

    b1.setAll();
    b1.rangeOff(29, 29);
    t.is(b1.cardinality(), 100);
    for (let i = 0; i < 29; i++)    t.is(b1.isOff(i), false);
    for (let i = 29; i < 29; i++)   t.is(b1.isOff(i), true);
    for (let i = 29; i < 100; i++)  t.is(b1.isOff(i), false);

    b1.setAll();
    b1.rangeOff(99, 100);
    t.is(b1.cardinality(), 100-1);
    for (let i = 0; i < 99; i++)    t.is(b1.isOff(i), false);
    for (let i = 99; i < 100; i++)  t.is(b1.isOff(i), true);
    for (let i = 100; i < 100; i++) t.is(b1.isOff(i), false);

    b1.setAll();
    b1.rangeOff(6, 8);
    b1.rangeOff(29, 55);
    b1.rangeOff(90, 100);
    t.is(b1.cardinality(), 100 - ((8-6) + (55-29) + (100-90)));
    for (let i = 0; i < 6; i++)     t.is(b1.isOff(i), false);
    for (let i = 6; i < 8; i++)     t.is(b1.isOff(i), true);
    for (let i = 8; i < 29; i++)    t.is(b1.isOff(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOff(i), true);
    for (let i = 55; i < 90; i++)   t.is(b1.isOff(i), false);
    for (let i = 90; i < 100; i++)  t.is(b1.isOff(i), true);

    b1.setAll();
    b1.rangeOff(0, 100);
    t.is(b1.cardinality(), 100 - 100);
    for (let i = 0; i < 100; i++)   t.is(b1.isOff(i), true);
});

test("rangeFlip", t => {
    let b1 = new BitVec(100);
    b1.rangeFlip(0, 1);
    t.is(b1.cardinality(), 1);
    t.is(b1.isOn(0), true);

    b1.rangeFlip(0, 32);
    t.is(b1.cardinality(), 31);
    for (let i = 0; i < 1; i++)     t.is(b1.isOn(i), false);
    for (let i = 1; i < 32; i++)    t.is(b1.isOn(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeFlip(0, 32);
    t.is(b1.cardinality(), 32);
    for (let i = 0; i < 0; i++)     t.is(b1.isOn(i), false);
    for (let i = 0; i < 32; i++)    t.is(b1.isOn(i), true);
    for (let i = 32; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.rangeFlip(29, 55);
    t.is(b1.cardinality(), (29-0) + (55-32));
    for (let i = 0; i < 29; i++)    t.is(b1.isOn(i), true);
    for (let i = 29; i < 32; i++)   t.is(b1.isOn(i), false);
    for (let i = 32; i < 55; i++)   t.is(b1.isOn(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeFlip(29, 55);
    t.is(b1.cardinality(), 55-29);
    for (let i = 0; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOn(i), true);
    for (let i = 55; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeFlip(29, 29);
    t.is(b1.cardinality(), 0);
    for (let i = 0; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 29; i++)   t.is(b1.isOn(i), true);
    for (let i = 29; i < 100; i++)  t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeFlip(99, 100);
    t.is(b1.cardinality(), 1);
    for (let i = 0; i < 99; i++)    t.is(b1.isOn(i), false);
    for (let i = 99; i < 100; i++)  t.is(b1.isOn(i), true);
    for (let i = 100; i < 100; i++) t.is(b1.isOn(i), false);

    b1.clear();
    b1.rangeFlip(6, 8);
    b1.rangeFlip(29, 55);
    b1.rangeFlip(90, 100);
    t.is(b1.cardinality(), (8-6) + (55-29) + (100-90));
    for (let i = 0; i < 6; i++)     t.is(b1.isOn(i), false);
    for (let i = 6; i < 8; i++)     t.is(b1.isOn(i), true);
    for (let i = 8; i < 29; i++)    t.is(b1.isOn(i), false);
    for (let i = 29; i < 55; i++)   t.is(b1.isOn(i), true);
    for (let i = 55; i < 90; i++)   t.is(b1.isOn(i), false);
    for (let i = 90; i < 100; i++)  t.is(b1.isOn(i), true);

    b1.clear();
    b1.rangeFlip(0, 100);
    t.is(b1.cardinality(), 100);
    for (let i = 0; i < 100; i++)   t.is(b1.isOn(i), true);
});

test("equals", t => {
    let b1 = new BitVec(100);
    let b2 = new BitVec(100);
    b1.rangeFlip(15, 40);
    b2.rangeFlip(15, 40);
    t.is(b1.equals(b2), true);

    b1.bitOn(10);
    t.is(b1.equals(b2), false);

    b2.bitOn(10);
    t.is(b1.equals(b2), true);

    b1.bitOn(98);
    t.is(b1.equals(b2), false);

    b2.bitOn(98);
    t.is(b1.equals(b2), true);

});

test("asHex", t=> {
    let b1 = new BitVec(32);
    t.is(b1.asHex(), "00000000");
    b1.bitOn(0);
    t.is(b1.asHex(), "00000001");
    b1.bitOn(1);
    t.is(b1.asHex(), "00000003");
    b1.clear();
    b1.bitOn(1);
    t.is(b1.asHex(), "00000002");
    b1.clear();
    b1.rangeOn(0, 4);
    t.is(b1.asHex(), "0000000f");

    b1 = new BitVec(64);
    t.is(b1.asHex(), "0000000000000000");
    b1.rangeOn(0, 4);
    t.is(b1.asHex(), "000000000000000f");
    b1.bitOn(4);
    t.is(b1.asHex(), "000000000000001f");
    
    b1.clear();
    b1.bitOn(7);
    t.is(b1.asHex(), "0000000000000080");
    b1.rangeOn(0, 4);
    t.is(b1.asHex(), "000000000000008f");

    b1.clear();
    b1.bitOn(32);
    t.is(b1.asHex(), "0000000100000000");
    b1.bitOn(33);
    t.is(b1.asHex(), "0000000300000000");
    b1.bitOn(34);
    t.is(b1.asHex(), "0000000700000000");
});

test("ofHex", t=> {
    let b1 = new BitVec(32);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);

    b1.bitOn(5);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);
    
    b1.rangeOn(3, 10);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);

    b1 = new BitVec(64);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);

    b1.bitOn(5);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);
    
    b1.rangeOn(3, 10);
    t.is(b1.equals(BitVec.ofHex(b1.asHex())), true);

    b1 = new BitVec(33);
    t.is(new BitVec(64).equals(BitVec.ofHex(b1.asHex())), true);
});

test("asBinary", t=> {
    let b1 = new BitVec(32);
    t.is(b1.asBinary(), "00000000000000000000000000000000");
    b1.bitOn(0);
    t.is(b1.asBinary(), "00000000000000000000000000000001");
    b1.bitOn(1);
    t.is(b1.asBinary(), "00000000000000000000000000000011");
    b1.clear();
    b1.bitOn(1);
    t.is(b1.asBinary(), "00000000000000000000000000000010");
    b1.clear();
    b1.rangeOn(0, 4);
    t.is(b1.asBinary(), "00000000000000000000000000001111");
    b1.clear();
    b1.rangeOn(16, 20);
    t.is(b1.asBinary(), "00000000000011110000000000000000");
});

test("ofBinary", t=> {
    let b1 = new BitVec(32);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);

    b1.bitOn(5);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);
    
    b1.rangeOn(3, 10);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);

    b1 = new BitVec(64);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);

    b1.bitOn(5);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);
    
    b1.rangeOn(3, 10);
    t.is(b1.equals(BitVec.ofBinary(b1.asBinary())), true);

    b1 = new BitVec(33);
    t.is(new BitVec(33).equals(BitVec.ofBinary(b1.asBinary())), true);
});

test("bitOn out of bound", t => {
    let b1 = new BitVec(32);
    t.throws( () => { b1.bitOn(32) }, null, "Bit index is out of bound" );
    t.throws( () => { b1.bitOn(-1) }, null, "Bit index is out of bound" );
    t.throws( () => { b1.bitOn(39) }, null, "Bit index is out of bound" );

    b1 = new BitVec(100);
    t.throws( () => { b1.bitOn(100) }, null, "Bit index is out of bound" );
    t.throws( () => { b1.bitOn(-1)  }, null, "Bit index is out of bound" );
    t.throws( () => { b1.bitOn(900) }, null, "Bit index is out of bound" );
});

