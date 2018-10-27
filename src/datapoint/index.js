import moment from 'moment';

const datapoint = {
    getKittyInfo(id, apiJSON, contractResult) {
        const {
            genes,
            generation,
            birthTime
        } = contractResult
        return {
            id,
            meta: [
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
            ],
            media: {
                imageURL: apiJSON.image_url
            }
        }
    }
}

export default datapoint