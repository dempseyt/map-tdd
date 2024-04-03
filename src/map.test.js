import map from './map';

describe("map", () => {
    const times2 = (x) => x*2;
    const add1 = (x) => x+1;
    const dec = (x) => x-1;

    it('maps simple functions over arrays', () => {
        expect(map(times2, [1,2,3,4])).toStrictEqual([2,4,6,8]);
    })
});