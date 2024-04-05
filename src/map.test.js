import map from './map';

describe("map", () => {
    const times2 = (x) => x*2;
    const add1 = (x) => x+1;
    const dec = (x) => x-1;

    it('maps simple functions over arrays', () => {
        expect(map(times2, [1,2,3,4])).toStrictEqual([2,4,6,8]);
    });
    it('maps over objects', () => {
        expect(map(dec, {})).toStrictEqual({});
        expect(map(dec, {x: 4, y: 5, z: 6})).toStrictEqual({x: 3, y: 4, z: 5});
    });
    it('interprets ((->) r) as a functor', () => {
        const f = function(a) { return a - 1; };
        const g = function(b) { return b * 2; };
        const h = map(f, g);

        expect(h(10)).toEqual((10 * 2) - 1);
    })
});