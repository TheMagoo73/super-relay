const relayPager = (data, options) => {
    const {skip, limit} = options
    let startSlice = 0
    let endSlice = data.length

    if(typeof skip === `number`) {
        if (skip < 0) {
            throw new Error(`Argument "skip" must be a non-negative integer`)
        }

        startSlice = skip
    }

    if(typeof limit === `number`) {
        if (skip < 0) {
            throw new Error(`Argument "limit" must be a non-negative integer`)
        }

        endSlice = startSlice + limit
    }

    const slice = data.slice(startSlice, endSlice)

    let mapper = elem => elem

    if(typeof options.mapper === `function`) {
        mapper = options.mapper
    }

    let edges = slice.map(e => mapper(e))

    if(options.addPaging) {
        edges = edges.map((e, index) => {
            const orgIndex = startSlice + index
            let next
            let previous
            if(orgIndex + 1 < data.length) {
                next = data[orgIndex + 1]
            }
            if(orgIndex !== 0) {
                previous = data[orgIndex - 1] 
            }
            return {
                node: e,
                next,
                previous
            }
        })
    } else {
        edges = edges.map(e => {return {node: e}})
    }

    return {
        data: edges,
        pageInfo: {
            hasNextPage:
                typeof limit === `number` ? limit + startSlice < data.length : false
        }
    }
}

exports = module.exports = relayPager