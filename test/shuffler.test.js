const { splitter, decideBoxes } = require('../src/shuffler')

test('Perfect split is done correctly', () => {
    // 12x2 = 24 + 6
    const doubles = [...Array(12).keys()]
    const singles = [...Array(6).keys()]
    const result = splitter(doubles, singles)
    expect(result).toEqual({'x': 12, 'y': 0})
    const decided = decideBoxes(result, doubles, singles)
    expect(decided.doubles.length).toBe(12)
    expect(decided.singles.length).toBe(6)
})

test('Too many doubles', () => {
    // 14x2 + 6 > 30
    // correct == 10x2 + 10 
    const doubles = [...Array(14).keys()]
    const singles = [...Array(6).keys()]
    const result = splitter(doubles, singles)
    expect(result).toEqual({'x': 10, 'y': 4})
    const decided = decideBoxes(result, doubles, singles)
    expect(decided.doubles.length).toBe(10)
    expect(decided.singles.length).toBe(10)
})

test('Too little doubles', () => {
    // 11x2 + 5 < 30
    // correct 14x2 + 2
    const doubles = [...Array(11).keys()]
    const singles = [...Array(5).keys()]
    const ratio = splitter(doubles, singles)
    const decided = decideBoxes(ratio, doubles, singles)
    expect(decided.doubles.length).toBe(14)
    expect(decided.singles.length).toBe(2)
})