const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
app.use(cors())

app.use(express.json()) // Propositalmente e obrigatorimente antes das demais requisições, informa ao express que receberemos dados em JSON, fazendo ele ir ao corpo da requisição e converter esse JSON em um objeto JavaScript emtemdivel pela aplicação

app.use(routes);

app.listen(3333)


// ----------------------------------------------------------------------------------//

/**
 * Rota: conjunto completo (localhost:3333/users ) | Recurso (/users)
*/

/**
 *  Métodos HTTP:
 * 
 *  GET: Buscar/listar uma informação do back-end
 *  POST: Criar uma informação no back-end
 *  PUT: Alterar uma informação no back-end
 *  DELETE: Deletar uma informação no back-end
*/

/**
 *  Tipos de parâmetros:
 * 
 *  Query Params: Parâmetros nomeados enviados na rota após "?" (também podemos anexar parâmetros com o "&") geralemente servem para: Filtros, paginação (Ex: /users?page=2&nome=Jeferson&idade=25 )
 * 
 *  Route Params: Parâmetros utilizados para identificar recursos (Ex: /users/:id | no browser: /users/1)
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
 *  Banco de Dados:
 * 
 *      SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 *      NoSQL: MongoDB, CouchDB, etc
 * 
 *      Vamos utilizar o SQLite
 * 
 *  Para fazer a comunicação com nosso Banco de Dados existem 3 formas principais:
 * 
 *      Driver: podemos instalar diretamente o driver do BD, o pacote oficial do DB (Ex: escreveriamos para buscar os usuarios: SELECT * FROM users;)
 * 
 *      Query Builder: escreveriamos nossas querys utilizando JavaScript (Ex: table('users).seletc('*').where() ... ) também tendo a vantagem de aceitar e trocar para qualquer banco SQL
 * 
 *          Vamos utilizar o Knex <3
*/

/**
 *  Entidades: tudo aquilo que representa algo que precisa ser salvo no Banco de Dados
 * 
 *      Entidade ONG:
 *          Vai previsar realizar cadastro
 *          Vai poder fazer login
 *          Cadastrar os casos
 * 
 *      Entidade Caso (incident)
 * 
 *  Funcionalidades: as funcionalidades que cada uma das entidades podem sofrer e fazer dentro da nossa aplicação
 * 
 *      Login de ONG
 *      Logout de ONG
 *      Cadastro de ONG
 *      Cadastrar novos casos
 *      Deletar casos
 *      Listar casos específicos de uma ONG
 *      Listar todos os casos
 *      Entrar em contato com a ONG
*/

/**
 *  Observações:
 * 
 *  npx serve para executar um pacote e não instalar um pacote
 *      "npx knex init"
 *      "npx knex migration:latest" = roda a ultima migration criada
 *      "npx knex migration:rollback" = volta/desfaz uma migration
 *      "npx knex migration:status"
 *  
 *  Em knexfile.js dentro de "development" criamos e setamos o "useNullAsDefault: true" pois por padrão o sqlite não suporta valores default nas colunas e aqui vamos setar para que o valor default dos campos seja null
 * 
 *  'crypto' = Usado para criptografia mas existe um método dentro dele para gerar strings aleatorias. // Nós mesmos vamos criar o ID da ONG (lembresse de que no caso da tabela de Ongs, o nosso campo id/primario é propositalmente um texto)
 * 
 *  Geralemte quando falamos em autenticação, login dentro do sistema a informação de qual empresa ou usuário está logado vem através do cabeçalho da requisição e não do corpo da requisição (Headers)
 * 
 *      Headers: Quarda informações do contexto da requisição (Dados da autenticação do usuário, dados da localização, etc)
*/