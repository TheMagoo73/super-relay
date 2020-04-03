const relayPager = require('../src/relay-pager')

const chai = require('chai')
chai.should()

const testData = [
    { page: 1 },
    { page: 2 },
    { page: 3 },
    { page: 4 },
    { page: 5 },
    { page: 6 }
]

const testCases = [
    {
        case: 'Can return the complete array',
        spec: {},
        expectedResult: {
            data: [
                {node: { page: 1 }},
                {node: { page: 2 }},
                {node: { page: 3 }},
                {node: { page: 4 }},
                {node: { page: 5 }},
                {node: { page: 6 }},
            ],
            pageInfo: {
                hasNextPage: false
            }
        }
    },
    {
        case: 'Can limit the return array',
        spec: {limit: 3},
        expectedResult: {
            data: [
                {node: { page: 1 }},
                {node: { page: 2 }},
                {node: { page: 3 }},
            ],
            pageInfo: {
                hasNextPage: true
            }
        }
    },
    {
        case: 'Can skip records array',
        spec: {skip: 3},
        expectedResult: {
            data: [
                {node: { page: 4 }},
                {node: { page: 5 }},
                {node: { page: 6 }},
            ],
            pageInfo: {
                hasNextPage: false
            }
        }
    },
    {
        case: 'Can skip and limit',
        spec: {skip: 2, limit: 3},
        expectedResult: {
            data: [
                {node: { page: 3 }},
                {node: { page: 4 }},
                {node: { page: 5 }},
            ],
            pageInfo: {
                hasNextPage: true
            }
        }
    },
    {
        case: 'Can use a custom mapper',
        spec: {mapper: (e) => {return {page: e.page + 100}}},
        expectedResult: {
            data: [
                {node: { page: 101 }},
                {node: { page: 102 }},
                {node: { page: 103 }},
                {node: { page: 104 }},
                {node: { page: 105 }},
                {node: { page: 106 }},
            ],
            pageInfo: {
                hasNextPage: false
            }
        }
    },
    {
        case: 'Can add paging',
        spec: {skip: 2, limit: 1, addPaging: true},
        expectedResult: {
            data:[
                {
                    next: { page: 4 },
                    node: { page: 3 },
                    previous: { page: 2 }
                }

            ],
            pageInfo: {
                hasNextPage: true
            }
        }
    },
    {
        case: 'First has no previous',
        spec: {limit: 1, addPaging: true},
        expectedResult: {
            data:[
                {
                    next: { page: 2 },
                    node: { page: 1 }
                }

            ],
            pageInfo: {
                hasNextPage: true
            }
        }
    },
    {
        case: 'Last has no next',
        spec: {skip: 5, addPaging: true},
        expectedResult: {
            data:[
                {
                    previous: { page: 5 },
                    node: { page: 6 }
                }

            ],
            pageInfo: {
                hasNextPage: false
            }
        }
    }

]

describe('relayPager', () => {

    testCases.forEach(c => {
        it(c.case, () => {
            let result = relayPager(testData, c.spec)

            result.should.deep.equal(c.expectedResult)
        })
    })

})