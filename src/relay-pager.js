/**
 * @typedef {object} Edges
 * @property {object} data the paged array as Relay-esque edges
 * @property {object} pageInfo information on additional page availability 
 */

/**
 * Builds Relay-esque Edges from an array of data. N.B does not support cursors
 * @method
 * @param {array} data - the array to be paged
 * @param {object} [options] - controls how the data is paged
 * @param {number} [options.skip=0] - elements to skip before taking
 * @param {number} [options.limit] - elements to take for the page, defaults to all remaining elements
 * @param {function} [options.mapper] - a function taking a single data element, and returning it mapped to a node
 * @param {boolean} [options.addPaging] - adds previous and next nodes to the returned edges
 * @returns {Edges} the paged data as Relay-eque edges, and page info 
 */
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

            let edge = { node: e}
            if(next) {
                edge.next = next
            }
            if(previous) {
                edge.previous = previous
            }
            return edge
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