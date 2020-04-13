const connection = require('../database/connection')

module.exports = {
    // Nossa listagem terá paginação
    async index(request, response) {
        const { page = 1 } = request.query

        // Total de casos. Como é apenas um resultado e isso rerrona um array podemos fazer [count] (ou count[0]) para pergarmos apenas a primneira posição, sem o array, apenas resultado ({ count(*): 14 })
        const [count] = await connection('incidents')
            .count()
        ;

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ])
        ;

        // Vamos retorna o nosso count não pelo corpo mas sim pelo cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        ;

        if(incident.ong_id !== ong_id) {
            return resposne.status(401).json({ error: 'Operation not permitted,' })
        }

        await connection('incidents').where('id', id).delete()
        return response.status(204).send()

    }
}