# BitVec

BitVec is a high performance and space efficient bit vector library for ES6 JavaScript.
It's cache friendly and works well with modern CPU.  The bit vector is fixed size.
It comes with a rich set of API. See [API Doc](API.md).

# Getting Start

## Install with NPM

    npm install bitvec --save
    
## Import in Javascript

    import {BitVec} from "bitvec";

## Import in HTML

    <script type="module" src="bitvec.js"></script>

## Sample Usage

    let bv = new BitVec(100000);
    
    bv.bitOn(0);
    bv.bitOn(1);
    bv.bitOn(123);
    
    console.log(bv.get(0) == 1);
    console.log(bv.get(1) == 1);
    console.log(bv.get(123) == 1);
    
    bv.bitOff(1);
    console.log(bv.get(1) == 0);
    
    bv.flip(0);
    bv.flip(1);
    console.log(bv.get(0) == 0);
    console.log(bv.get(1) == 1);
    
    console.log(bv.nextOn(0) == 1);     // 0th is 0, 1st is 1
    console.log(bv.nextOn(1) == 1);     // 1st is 1
    console.log(bv.nextOn(2) == 123);   // 123th is 1


# Benchmark

Benchmark is run by:

    npm run test -- test-benchmark.js
   
The result is from running the benchmark on a T460s laptop with i7-6600U @ 2.6GHz.

| Functional Area           | Bits in Vector | Repeated Runs | Time (micro sec) | Rate (operations/sec) |
|:--------------------------|:----------|:------------|:----------|:-------------------|
| bitOn 0                   | 1,000,000 | 100,000,000 | 195,463us | 511,605,777 op/sec |
| bitOn 1                   | 1,000,000 | 100,000,000 | 181,967us | 549,550,193 op/sec |
| bitOn 32                  | 1,000,000 | 100,000,000 | 182,379us | 548,308,741 op/sec |
| bitOn 999999              | 1,000,000 | 100,000,000 | 181,351us | 551,416,865 op/sec |
| bitOff 0                  | 1,000,000 | 100,000,000 | 184,584us | 541,758,765 op/sec |
| bitOff 1                  | 1,000,000 | 100,000,000 | 203,411us | 491,615,497 op/sec |
| bitOff 32                 | 1,000,000 | 100,000,000 | 181,498us | 550,970,258 op/sec |
| bitOff 999999             | 1,000,000 | 100,000,000 | 184,728us | 541,336,451 op/sec |
| flip 0                    | 1,000,000 | 100,000,000 | 189,871us | 526,673,372 op/sec |
| flip 1                    | 1,000,000 | 100,000,000 | 182,475us | 548,020,276 op/sec |
| flip 32                   | 1,000,000 | 100,000,000 | 185,194us | 539,974,297 op/sec |
| flip 999999               | 1,000,000 | 100,000,000 | 186,827us | 535,254,540 op/sec |
| get 0                     | 1,000,000 | 100,000,000 | 82,609us | 1,210,521,855 op/sec |
| get 1                     | 1,000,000 | 100,000,000 | 79,598us | 1,256,312,972 op/sec |
| get 32                    | 1,000,000 | 100,000,000 | 88,546us | 1,129,356,492 op/sec |
| get 999999                | 1,000,000 | 100,000,000 | 62,255us | 1,606,296,682 op/sec |
| rangeOn 0-1               | 1,000,000 | 100,000,000 | 187,215us | 534,145,234 op/sec |
| rangeOn 1-31              | 1,000,000 | 100,000,000 | 186,898us | 535,051,204 op/sec |
| rangeOn 32-256            | 1,000,000 | 100,000,000 | 581,592us | 171,941,842 op/sec |
| rangeOn 999900-999999     | 1,000,000 | 100,000,000 | 442,939us | 225,764,721 op/sec |
| rangeOff 0-1              | 1,000,000 | 100,000,000 | 187,826us | 532,407,653 op/sec |
| rangeOff 1-31             | 1,000,000 | 100,000,000 | 181,685us | 550,403,170 op/sec |
| rangeOff 32-256           | 1,000,000 | 100,000,000 | 556,877us | 179,572,867 op/sec |
| rangeOff 999900-999999    | 1,000,000 | 100,000,000 | 435,935us | 229,391,996 op/sec |
| rangeFlip 0-1             | 1,000,000 | 100,000,000 | 183,393us | 545,277,082 op/sec |
| rangeFlip 1-31            | 1,000,000 | 100,000,000 | 182,872us | 546,830,570 op/sec |
| rangeFlip 32-256          | 1,000,000 | 100,000,000 | 755,334us | 132,391,763 op/sec |
| rangeFlip 999900-999999   | 1,000,000 | 100,000,000 | 485,956us | 205,779,947 op/sec |
| cardinality               | 1,000,000 | 1,000       | 499,653us | 2,001 op/sec |
| clear                     | 1,000,000 | 1,000       | 472,478us | 2,116 op/sec |
| setAll                    | 1,000,000 | 1,000       | 606,670us | 1,648 op/sec |
| equals early diff         | 1,000,000 | 100,000,000 | 391,930us | 255,147,602 op/sec |
| equals same               | 1,000,000 | 10,000      | 356,593us | 28,043 op/sec |
| nextOn search loop        | 100,000   | 1,000       | 430,450us | 2,323 op/sec |
| nextOn search loop 2      | 10,000    | 10,000      | 422,134us | 23,689 op/sec |
| nextOff search loop       | 100,000   | 1,000       | 440,355us | 2,270 op/sec |
| nextOff search loop 2     | 10,000    | 10,000      | 466,184us | 21,450 op/sec |



# API

<a name="module_bitvec"></a>

## bitvec
A high performance JavaScript bit vector class.

* [bitvec](#module_bitvec)
    * [.BitVec](#module_bitvec.BitVec)
        * [new BitVec(numberOfBits)](#new_module_bitvec.BitVec_new)
        * _instance_
            * [.clone()](#module_bitvec.BitVec+clone) ⇒ <code>BitVec</code>
            * [.bitOn(bitIndex)](#module_bitvec.BitVec+bitOn)
            * [.bitOff(bitIndex)](#module_bitvec.BitVec+bitOff)
            * [.flip(bitIndex)](#module_bitvec.BitVec+flip)
            * [.set(bitIndex, val)](#module_bitvec.BitVec+set)
            * [.get(bitIndex)](#module_bitvec.BitVec+get) ⇒ <code>boolean</code>
            * [.isOn(bitIndex)](#module_bitvec.BitVec+isOn) ⇒ <code>boolean</code>
            * [.isOff(bitIndex)](#module_bitvec.BitVec+isOff) ⇒ <code>boolean</code>
            * [.isAllOn()](#module_bitvec.BitVec+isAllOn) ⇒ <code>boolean</code>
            * [.isAllOff()](#module_bitvec.BitVec+isAllOff) ⇒ <code>boolean</code>
            * [.cardinality()](#module_bitvec.BitVec+cardinality) ⇒ <code>int</code>
            * [.clear()](#module_bitvec.BitVec+clear)
            * [.setAll()](#module_bitvec.BitVec+setAll)
            * [.randomize(rng)](#module_bitvec.BitVec+randomize)
            * [.rangeOn(from, to)](#module_bitvec.BitVec+rangeOn)
            * [.rangeOff(from, to)](#module_bitvec.BitVec+rangeOff)
            * [.rangeFlip(from, to)](#module_bitvec.BitVec+rangeFlip)
            * [.rangeIsOn(from, to)](#module_bitvec.BitVec+rangeIsOn) ⇒ <code>boolean</code>
            * [.rangeIsOff(from, to)](#module_bitvec.BitVec+rangeIsOff) ⇒ <code>boolean</code>
            * [.slice(from, to)](#module_bitvec.BitVec+slice) ⇒ <code>BitVec</code>
            * [.nextOn(fromBitIndex)](#module_bitvec.BitVec+nextOn) ⇒ <code>int</code>
            * [.nextOff(fromBitIndex)](#module_bitvec.BitVec+nextOff) ⇒ <code>int</code>
            * [.iterLsb(cb)](#module_bitvec.BitVec+iterLsb)
            * [.iterMsb(cb)](#module_bitvec.BitVec+iterMsb)
            * [.not()](#module_bitvec.BitVec+not)
            * [.and(b)](#module_bitvec.BitVec+and)
            * [.or(b)](#module_bitvec.BitVec+or)
            * [.xor(b)](#module_bitvec.BitVec+xor)
            * [.andNot(b)](#module_bitvec.BitVec+andNot)
            * [.rshift(bitsToShift)](#module_bitvec.BitVec+rshift) ⇒ <code>int</code>
            * [.lshift(bitsToShift)](#module_bitvec.BitVec+lshift) ⇒ <code>int</code>
            * [.equals(b)](#module_bitvec.BitVec+equals) ⇒ <code>boolean</code>
            * [.resize(nbits)](#module_bitvec.BitVec+resize)
            * [.toString()](#module_bitvec.BitVec+toString) ⇒ <code>string</code>
            * [.asBinary()](#module_bitvec.BitVec+asBinary) ⇒ <code>string</code>
            * [.asHex()](#module_bitvec.BitVec+asHex) ⇒ <code>string</code>
        * _static_
            * [.ofBinary()](#module_bitvec.BitVec.ofBinary) ⇒ <code>BitVec</code>
            * [.ofHex()](#module_bitvec.BitVec.ofHex) ⇒ <code>BitVec</code>

<a name="module_bitvec.BitVec"></a>

### bitvec.BitVec
A high performance JavaScript bit vector class.

**Kind**: static class of [<code>bitvec</code>](#module_bitvec)  

* [.BitVec](#module_bitvec.BitVec)
    * [new BitVec(numberOfBits)](#new_module_bitvec.BitVec_new)
    * _instance_
        * [.clone()](#module_bitvec.BitVec+clone) ⇒ <code>BitVec</code>
        * [.bitOn(bitIndex)](#module_bitvec.BitVec+bitOn)
        * [.bitOff(bitIndex)](#module_bitvec.BitVec+bitOff)
        * [.flip(bitIndex)](#module_bitvec.BitVec+flip)
        * [.set(bitIndex, val)](#module_bitvec.BitVec+set)
        * [.get(bitIndex)](#module_bitvec.BitVec+get) ⇒ <code>boolean</code>
        * [.isOn(bitIndex)](#module_bitvec.BitVec+isOn) ⇒ <code>boolean</code>
        * [.isOff(bitIndex)](#module_bitvec.BitVec+isOff) ⇒ <code>boolean</code>
        * [.isAllOn()](#module_bitvec.BitVec+isAllOn) ⇒ <code>boolean</code>
        * [.isAllOff()](#module_bitvec.BitVec+isAllOff) ⇒ <code>boolean</code>
        * [.cardinality()](#module_bitvec.BitVec+cardinality) ⇒ <code>int</code>
        * [.clear()](#module_bitvec.BitVec+clear)
        * [.setAll()](#module_bitvec.BitVec+setAll)
        * [.randomize(rng)](#module_bitvec.BitVec+randomize)
        * [.rangeOn(from, to)](#module_bitvec.BitVec+rangeOn)
        * [.rangeOff(from, to)](#module_bitvec.BitVec+rangeOff)
        * [.rangeFlip(from, to)](#module_bitvec.BitVec+rangeFlip)
        * [.rangeIsOn(from, to)](#module_bitvec.BitVec+rangeIsOn) ⇒ <code>boolean</code>
        * [.rangeIsOff(from, to)](#module_bitvec.BitVec+rangeIsOff) ⇒ <code>boolean</code>
        * [.slice(from, to)](#module_bitvec.BitVec+slice) ⇒ <code>BitVec</code>
        * [.nextOn(fromBitIndex)](#module_bitvec.BitVec+nextOn) ⇒ <code>int</code>
        * [.nextOff(fromBitIndex)](#module_bitvec.BitVec+nextOff) ⇒ <code>int</code>
        * [.iterLsb(cb)](#module_bitvec.BitVec+iterLsb)
        * [.iterMsb(cb)](#module_bitvec.BitVec+iterMsb)
        * [.not()](#module_bitvec.BitVec+not)
        * [.and(b)](#module_bitvec.BitVec+and)
        * [.or(b)](#module_bitvec.BitVec+or)
        * [.xor(b)](#module_bitvec.BitVec+xor)
        * [.andNot(b)](#module_bitvec.BitVec+andNot)
        * [.rshift(bitsToShift)](#module_bitvec.BitVec+rshift) ⇒ <code>int</code>
        * [.lshift(bitsToShift)](#module_bitvec.BitVec+lshift) ⇒ <code>int</code>
        * [.equals(b)](#module_bitvec.BitVec+equals) ⇒ <code>boolean</code>
        * [.resize(nbits)](#module_bitvec.BitVec+resize)
        * [.toString()](#module_bitvec.BitVec+toString) ⇒ <code>string</code>
        * [.asBinary()](#module_bitvec.BitVec+asBinary) ⇒ <code>string</code>
        * [.asHex()](#module_bitvec.BitVec+asHex) ⇒ <code>string</code>
    * _static_
        * [.ofBinary()](#module_bitvec.BitVec.ofBinary) ⇒ <code>BitVec</code>
        * [.ofHex()](#module_bitvec.BitVec.ofHex) ⇒ <code>BitVec</code>

<a name="new_module_bitvec.BitVec_new"></a>

#### new BitVec(numberOfBits)
Initialize the bit vector object with the number of bits.


| Param | Type | Description |
| --- | --- | --- |
| numberOfBits | <code>int</code> | set the bit vector with the number of bits. |

<a name="module_bitvec.BitVec+clone"></a>

#### bitVec.clone() ⇒ <code>BitVec</code>
Clone a new bit vector object.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
<a name="module_bitvec.BitVec+bitOn"></a>

#### bitVec.bitOn(bitIndex)
Turn the bit on at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to set the bit. |

<a name="module_bitvec.BitVec+bitOff"></a>

#### bitVec.bitOff(bitIndex)
Turn the bit off at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to clear the bit. |

<a name="module_bitvec.BitVec+flip"></a>

#### bitVec.flip(bitIndex)
Flip the bit from on to off, or from off to on, at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to flip the bit. |

<a name="module_bitvec.BitVec+set"></a>

#### bitVec.set(bitIndex, val)
Set the bit at the bit index to the value.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to set the bit value. |
| val | <code>boolean</code> | the boolean value to set. |

<a name="module_bitvec.BitVec+get"></a>

#### bitVec.get(bitIndex) ⇒ <code>boolean</code>
Get the bit value at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - the boolean value to set.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to get the bit value. |

<a name="module_bitvec.BitVec+isOn"></a>

#### bitVec.isOn(bitIndex) ⇒ <code>boolean</code>
Check whether the bit is on at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for the bit is on; false for the bit is off.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to check. |

<a name="module_bitvec.BitVec+isOff"></a>

#### bitVec.isOff(bitIndex) ⇒ <code>boolean</code>
Check whether the bit is off at the bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for the bit is off; false for the bit is on.  

| Param | Type | Description |
| --- | --- | --- |
| bitIndex | <code>int</code> | bit index to check. |

<a name="module_bitvec.BitVec+isAllOn"></a>

#### bitVec.isAllOn() ⇒ <code>boolean</code>
Check whether all the bits in the vector are on.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for all the bits are on; false for not all the bits are on.  
<a name="module_bitvec.BitVec+isAllOff"></a>

#### bitVec.isAllOff() ⇒ <code>boolean</code>
Check whether all the bits in the vector are off.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for all the bits are off; false for not all the bits are off.  
<a name="module_bitvec.BitVec+cardinality"></a>

#### bitVec.cardinality() ⇒ <code>int</code>
Get the number of bits that are on.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>int</code> - the number of ON bits  
<a name="module_bitvec.BitVec+clear"></a>

#### bitVec.clear()
Clear all the bits to off in the vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
<a name="module_bitvec.BitVec+setAll"></a>

#### bitVec.setAll()
Set all the bits to on in the vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
<a name="module_bitvec.BitVec+randomize"></a>

#### bitVec.randomize(rng)
Fill the bit vector with randomly ON or OFF bits.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| rng | <code>function</code> | optional random number generator, default to Math.random if none is provided. |

<a name="module_bitvec.BitVec+rangeOn"></a>

#### bitVec.rangeOn(from, to)
Turn the range of bits to on.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit range. |
| to | <code>int</code> | the bit index of the end of the bit range (not inclusive). |

<a name="module_bitvec.BitVec+rangeOff"></a>

#### bitVec.rangeOff(from, to)
Turn the range of bits to off.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit range. |
| to | <code>int</code> | the bit index of the end of the bit range (not inclusive). |

<a name="module_bitvec.BitVec+rangeFlip"></a>

#### bitVec.rangeFlip(from, to)
Flip the range of bits.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit range. |
| to | <code>int</code> | the bit index of the end of the bit range (not inclusive). |

<a name="module_bitvec.BitVec+rangeIsOn"></a>

#### bitVec.rangeIsOn(from, to) ⇒ <code>boolean</code>
Check whether the range of bits are all on.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for all the bits are on; false for not all the bits are on.  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit range. |
| to | <code>int</code> | the bit index of the end of the bit range (not inclusive). |

<a name="module_bitvec.BitVec+rangeIsOff"></a>

#### bitVec.rangeIsOff(from, to) ⇒ <code>boolean</code>
Check whether the range of bits are all off.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true for all the bits are off; false for not all the bits are off.  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit range. |
| to | <code>int</code> | the bit index of the end of the bit range (not inclusive). |

<a name="module_bitvec.BitVec+slice"></a>

#### bitVec.slice(from, to) ⇒ <code>BitVec</code>
Take a slice of the bit vector and returns it as a new BitVec.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>BitVec</code> - the new BitVec object containing the bit slice.  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>int</code> | the bit index of the beginning of the bit slice. |
| to | <code>int</code> | the bit index of the end of the bit slice (not inclusive). |

<a name="module_bitvec.BitVec+nextOn"></a>

#### bitVec.nextOn(fromBitIndex) ⇒ <code>int</code>
Search for the next ON bit, starting from the given bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>int</code> - the bit index of the found ON bit, -1 if not found.  

| Param | Type | Description |
| --- | --- | --- |
| fromBitIndex | <code>int</code> | the starting bit index for the next ON bit (inclusive). |

<a name="module_bitvec.BitVec+nextOff"></a>

#### bitVec.nextOff(fromBitIndex) ⇒ <code>int</code>
Search for the next OFF bit, starting from the given bit index.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>int</code> - the bit index of the found OFF bit, -1 if not found.  

| Param | Type | Description |
| --- | --- | --- |
| fromBitIndex | <code>int</code> | the starting bit index for the next OFF bit (inclusive). |

<a name="module_bitvec.BitVec+iterLsb"></a>

#### bitVec.iterLsb(cb)
Iterate bits in the vector starting from the least signifcant bit.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | the iterating function for each bit. |

<a name="module_bitvec.BitVec+iterMsb"></a>

#### bitVec.iterMsb(cb)
Iterate bits in the vector starting from the most signifcant bit.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | the iterating function for each bit. |

<a name="module_bitvec.BitVec+not"></a>

#### bitVec.not()
Flip all the bits in the vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
<a name="module_bitvec.BitVec+and"></a>

#### bitVec.and(b)
Apply a bitwise AND operation on the bit vector with the incoming vector. The two vectors don't have to have the same number of bits. The extra bits will become 0, as a result of the AND operation.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitSet</code> | the incoming bit vector for the operation. |

<a name="module_bitvec.BitVec+or"></a>

#### bitVec.or(b)
Apply a bitwise OR operation on the bit vector with the incoming vector. The two vectors don't have to have the same number of bits. The extra bits will become 1, as a result of the OR operation. The size of the vector will be expanded if the incoming vector has a larger size.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitSet</code> | the incoming bit vector for the operation. |

<a name="module_bitvec.BitVec+xor"></a>

#### bitVec.xor(b)
Apply a bitwise XOR operation on the bit vector with the incoming vector. The two vectors don't have to have the same number of bits. The extra bits will be copied from the incoming vector, as a result of the XOR operation. The size of the vector will be expanded if the incoming vector has a larger size.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitSet</code> | the incoming bit vector for the operation. |

<a name="module_bitvec.BitVec+andNot"></a>

#### bitVec.andNot(b)
Apply a logical (a AND NOT(b)) on the bits in common. This effectively clears the bits of the vector where the corresponding bits are set in the incoming bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitSet</code> | the incoming bit vector for the operation. |

<a name="module_bitvec.BitVec+rshift"></a>

#### bitVec.rshift(bitsToShift) ⇒ <code>int</code>
Perform a left shift on the bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>int</code> - the shifted off carry bits  

| Param | Type | Description |
| --- | --- | --- |
| bitsToShift | <code>int</code> | the number of bits to shift, limited to 32 bits. |

<a name="module_bitvec.BitVec+lshift"></a>

#### bitVec.lshift(bitsToShift) ⇒ <code>int</code>
Perform a right shift on the bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>int</code> - the shifted off carry bits  

| Param | Type | Description |
| --- | --- | --- |
| bitsToShift | <code>int</code> | the number of bits to shift, limited to 32 bits. |

<a name="module_bitvec.BitVec+equals"></a>

#### bitVec.equals(b) ⇒ <code>boolean</code>
Compare the bit vector with another bit vector to see if they are equal.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>boolean</code> - true if equal, false if not.  

| Param | Type | Description |
| --- | --- | --- |
| b | <code>BitVec</code> | the other bit vector to be compared. |

<a name="module_bitvec.BitVec+resize"></a>

#### bitVec.resize(nbits)
Resize the bit vector, to either expand or shrink the vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  

| Param | Type | Description |
| --- | --- | --- |
| nbits | <code>int</code> | the number of bits as the new size. |

<a name="module_bitvec.BitVec+toString"></a>

#### bitVec.toString() ⇒ <code>string</code>
Return a string of digits 0 and 1 representing the bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>string</code> - the binary string  
<a name="module_bitvec.BitVec+asBinary"></a>

#### bitVec.asBinary() ⇒ <code>string</code>
Return a string of digits 0 and 1 representing the bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>string</code> - the binary string  
<a name="module_bitvec.BitVec+asHex"></a>

#### bitVec.asHex() ⇒ <code>string</code>
Return a hexadecimal string representing the bit vector.

**Kind**: instance method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>string</code> - the binary string  
<a name="module_bitvec.BitVec.ofBinary"></a>

#### BitVec.ofBinary() ⇒ <code>BitVec</code>
Create a BitVec object from the binary digit 0 and 1 string.

**Kind**: static method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>BitVec</code> - the created object  
<a name="module_bitvec.BitVec.ofHex"></a>

#### BitVec.ofHex() ⇒ <code>BitVec</code>
Create a BitVec object from the hexadecimal string.

**Kind**: static method of [<code>BitVec</code>](#module_bitvec.BitVec)  
**Returns**: <code>BitVec</code> - the created object  
