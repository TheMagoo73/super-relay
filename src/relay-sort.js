const createSorter = (field, order) => {
    return (thing1, thing2) => {
        if(thing1[field] == thing2[field]) return 0

        if(order == 'ASC') {
            return thing1[field] < thing2[field] ? -1 : 1
        } else {
            return thing1[field] < thing2[field] ? 1 : -1
        }
    }
}

/**
 * Sort an array based on the specification object. Default sort order is always ascending
 * @method
 * @param {array} data - the array to be sorted
 * @param {object} options - controls how the data is sorted
 * @param {object} options.sort - the sort specification
 * @param {string|string[]} options.sort.fields - the field, or fields by which to sort, in order of priority
 * @param {string[]} options.sort.order - an array of strings, one per field, specifying the sort order, ASC or DESC
 * @returns {array} The sorted array
 * @throws {error} When not enough sort orders are provided
 */
const relaySort = (data, options) => {

    let {fields, order} = options.sort

    if(!Array.isArray(fields)) {
        fields = [fields]
    }

    if(order && order.length < fields.length) {
        throw new Error('If sort order is specified it must have the same element count as fields')
    }

    if(!order) {
        order = Array(fields.length).fill('ASC')
    }

    const sortPipeline = fields.map((f, i) => createSorter(f, order[i]))

    const sorted = data.sort((t1, t2) => {

        let sorterIdx = 0
        let res = sortPipeline[sorterIdx](t1, t2)

        while(sorterIdx < sortPipeline.length - 1 && res == 0) {
            sorterIdx++
            res = sortPipeline[sorterIdx](t1, t2)
        }

        return res
    })

    return sorted
}

exports = module.exports = relaySort