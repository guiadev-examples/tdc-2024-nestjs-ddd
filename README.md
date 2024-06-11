# ecommerce-service

Guia Dev - Backend de serviço com as implementações referentes ao projeto de exemplo de NestJS + DDD para um domínio de ecommerce.

## Arquitetura e stack

- **Visão da solução**: acesse o [Modelo de domínio]() e a [Visão de Plataforma]() para compreender a **solução como um todo** e onde este projeto se encaixa.

- **Macro arquitetura**: acesse o [Desenho de arquitetura da solução]() para compreender a **macro arquitetura da plataforma** e onde este projeto se encaixa.

- **Micro arquitetura**: Abaixo segue figura ilustrando as organização de camadas do projeto. Maiores detalhes acesse a documentação sobre [camadas e padrões de arquitetura]() para compreender como está organizado este projeto.

```mermaid
graph TD;
    Application-->Infra;
    Application-->Domain;
    Domain-->Infra;
    Domain-->Integration;
    Integration-->Infra;
    Infra-->Config;
```

- Detalhes da stack e integrações:
    - A implementação é feita em [TypeScript](https://www.typescriptlang.org/) rodando sobre [Node 19](https://nodejs.org/).
    - Uso do framework [NestJs 10.*](https://nestjs.com/).
    - Persistência de dados é feita em um banco [PostgreSQL 14.*](https://www.postgresql.org/).
    - As bibliotecas utilizadas pelo projeto podem ser vista no arquivo [package.json](package.json) que está na raiz do projeto.

---

## Execução do projeto/sistema

### Via docker-compose

O projeto está configurado para execução com [docker-compose](https://docs.docker.com/compose/), onde já estão configuradas variáveis de ambiente e demais dependências. Para rodar o projeto, utilize:

```bash
# Para subir a aplicação
docker-compose up app
```

```bash
# Para executar os testes
docker-compose up test
```

```bash
# Para executar os testes de Stress
docker-compose up stress-test
```

```bash
# Para executar acesso ao console e rodar qualquer comando NPM desejado
docker-compose run --rm console
```

```bash
# Para executar apenas as ferramentas auxiliares como banco de dados, cache, mensageria, etc...
docker-compose --profile tools up
```

### Localmente via nodejs:

Em ambiente local ou de testes, o serviço utiliza variáveis de ambiente que podem ser definidas no arquivo `.env`. 
Tal arquivo pode ser criado a partir do exemplo `.env.example`.

É obrigatório informar as envs (lembrando que via docker-compose isso não é necessário):
- DATABASE_URL: Exemplo `postgres://postgres:postgres@localhost:5432/ecommerce-service`.
- API_PRIVATE_KEY: API Key usada pelos clients da API. Exemplo `ab04300a-4847-4f62-a3d1-fc1cca0e4391`.

Sugere-se o uso de docker-compose para subir o banco de dados, através do comando:
```bash
# Para executar apenas as ferramentas auxiliares como banco de dados, cache, mensageria, etc...
docker-compose --profile tools up
```

#### Para rodar o projeto, utilize:

```bash
# Para subir a aplicação
npm run start
```

```bash
# Para executar os testes
npm run test
```
Ou 
```bash
# Para executar os testes com relatórios de teste e cobertura
npm run test:cov
```

---
## Alterações, testes e validação

Toda alteração no código deve ser realizada respeitando o processo ${\color{red}[DETALHAR]}$.

O testes automatizados são executados através da ferramenta [jest](https://jestjs.io/), e podem ser executados conforme instruções na seção anterior.
Após execução dos testes, é gerado no diretório `report` os relatórios:
- coverage (cobertura de código): `/report/coverage/lcov-report/index.html`.
- tests (resultados dos testes): `/report/test.html`.

Quando executado os testes de stress, via docker-compose, no diretório `report` também é gerado um relatório com o resultado dos testes em: `/report/stress-test.html`.

No processo de CI, tais relatórios podem ser visualizados através do Pull Request criado para a alteração, ou ainda nas actions executadas (Aba Actions do github).

Para validar e chamar as API's manualmente acesse a página com o [Swagger](https://swagger.io/):
- Local: [http://localhost:3000/apidoc](http://localhost:3000/apidoc)
- Ambientes publicados: escolha o ambiente desejado em [deployments](../../deployments)

---

## Atualização e monitoramento.

${\color{red}[DETALHAR]}$
