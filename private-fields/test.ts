class Square {
    #sideLength: number;
    
    constructor(sideLength: number) {
        this.#sideLength = sideLength;
    }

    equals(other: any) {
        return this.#sideLength === other.#sideLength;
    }

    rudi() {
        let me: number;
        me = 23;
        
    }
}

const a = new Square(100);

const b = { rudi: 100 };

// Boom!
// TypeError: attempted to get private field on non-instance
// This fails because 'b' is not an instance of 'Square'.
console.log(a.equals(b));