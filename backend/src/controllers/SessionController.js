const connection = require('../database/connection')

module.exports = {
    // A única responsabilidade que a rota de login dentro da nossa aplicação é verificar se a ONG realmente existe para validar o login dela
    async create(request, response) {
        const { id } = request.body

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first() // como vamos buscar pelo id saberemos que virá apenas um único resultado então utilizamos o first, assim ele NÂO retorna um array e sim retorna apenas um resultado
        ;

        // OBS pessoal: lembresse que [] é igual a "true"
        
        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' })
        }

        return response.json(ong)

    }
}