const relaySort = require('../src/relay-sort')

const chai = require('chai')
chai.should()

const testData = [
    { name: 'Foo', exam: 'calculus', score: 100},
    { name: 'Foo', exam: 'physics', score: 95},
    { name: 'Bar', exam: 'calculus', score: 10},
    { name: 'Foo', exam: 'biology', score: 80},
    { name: 'Bar', exam: 'physics', score: 15},
]

const testCases = [
    {
        case: 'Can do a simple ascending sort',
        spec: {sort: {fields: 'name', order: ['ASC']}},
        expectedResult: [
            { name: 'Bar', exam: 'calculus', score: 10},
            { name: 'Bar', exam: 'physics', score: 15},
            { name: 'Foo', exam: 'calculus', score: 100},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'biology', score: 80},
        ]
    },
    {
        case: 'Can do a simple descending sort',
        spec: {sort: {fields: 'name', order: ['DESC']}},
        expectedResult: [
            { name: 'Foo', exam: 'calculus', score: 100},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'biology', score: 80},
            { name: 'Bar', exam: 'calculus', score: 10},
            { name: 'Bar', exam: 'physics', score: 15},
        ]
    },
    {
        case: 'Can do a complex descending sort',
        spec: {sort: {fields: ['name', 'score'], order: ['DESC', 'DESC']}},
        expectedResult: [
            { name: 'Foo', exam: 'calculus', score: 100},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'biology', score: 80},
            { name: 'Bar', exam: 'physics', score: 15},
            { name: 'Bar', exam: 'calculus', score: 10},
        ]
    },
    {
        case: 'Can do a complex ascending sort',
        spec: {sort: {fields: ['name', 'score'], order: ['ASC', 'ASC']}},
        expectedResult: [
            { name: 'Bar', exam: 'calculus', score: 10},
            { name: 'Bar', exam: 'physics', score: 15},
            { name: 'Foo', exam: 'biology', score: 80},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'calculus', score: 100},
        ]
    },
    {
        case: 'Can do a complex mixed sort',
        spec: {sort: {fields: ['name', 'score'], order: ['ASC', 'DESC']}},
        expectedResult: [
            { name: 'Bar', exam: 'physics', score: 15},
            { name: 'Bar', exam: 'calculus', score: 10},
            { name: 'Foo', exam: 'calculus', score: 100},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'biology', score: 80},
        ]
    },
    {
        case: 'Defaults to an ascending sort',
        spec: {sort: {fields: 'score'}},
        expectedResult: [
            { name: 'Bar', exam: 'calculus', score: 10},
            { name: 'Bar', exam: 'physics', score: 15},
            { name: 'Foo', exam: 'biology', score: 80},
            { name: 'Foo', exam: 'physics', score: 95},
            { name: 'Foo', exam: 'calculus', score: 100},
        ]
    },
]

describe('relaySort', () => {

    testCases.forEach(c => {

        it(c.case, () => {

            const result = relaySort(testData, {sort: c.spec.sort})
            
            result.should.deep.equal(c.expectedResult)
        })


    })


})