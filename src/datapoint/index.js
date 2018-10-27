import moment from 'moment'

const datapoint = {
    getKittyInfo(result) {
        const {
            genes,
            generation,
            birthTime
        } = result
        return ([
            {
                title: 'Genes',
                description: genes
            },
            {
                title: 'Generation',
                description: generation
            },
            {
                title: 'BirthTime',
                description: moment(parseInt(birthTime, 10)).format('MMMM Do YYYY')
            }
        ])
    }
}

export default datapoint