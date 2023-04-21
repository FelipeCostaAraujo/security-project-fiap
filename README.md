# Projeto Final

Seja bem vindo ao projeto final da disciplina de Segurança em Aplicações! 

Neste projeto, aplicaremos os conhecimentos adquiridos ao longo da disciplina em um contexto reduzido.

## Contexto

O projeto contém uma API de Produtos que efetua as 4 operações do CRUD (*Create*, *Read*, *Update* e *Delete*)

O objetivo é tornarmos esta API segura utilizando das técnicas executadas em aula.

## Pre-requisito

Antes de iniciarmos o desafio, configure a API products no console do Auth0 conforme visto no laboratório da Aula 7 sobre Autorização e Autenticação e OAuth 2.0. 
* Atente-se ao endpoint e a porta em questão neste desafio.

## Challenge

O desafio consiste em mitigar as vulnerabilidades e vertentes de ataque conhecidas e exploradas durante a disciplina desta API, sendo estes:

1. Mitigar Broken Authentication e Broken Access Control através da implementação de OAuth (0.2); (consulte Dica 1);
2. Mitigar Man In The Middle/Sniffing através da implementação de comunicação via HTTPS (0.2);
3. Mitigar Code Injection através da implementação de validação de campos de entrada e a utilização de Prepared Statements nas comunicações com o Banco de Dados (0.2);
4. Mitigar Brute Force/Dictionary Attack através da implementação de RateLimit na API (0.2);
5. Aplicação executando e funcionando corretamente (0.2). 

## Executando a aplicação

### Docker

Foi disponibilizada toda a configuração Docker com Docker Compose para executar o Banco de Dados e a API através do comando: `docker-compose up` executando o projeto com `nodemon`, sendo assim, qualquer alteração no código reflete diretamente na aplicação em execução no container.

Ao executar, os mesmos serão expostos nos endereços:

1. API Produto de produtos (products): http://localhost:3001;
2. Banco de dados: localhost:3306;

### Debugando a API

Caso seja necessário debugar a API, execute o somente o banco de dados via docker-compose (comando: `docker-compose up db`) e execute a API com `npm install` e o VSCode. Por exemplo:
1. Na raiz do projeto execute: `docker-compose up db`
2. Na subpasta da API, execute `npm install` e em seguida execute a config `Run node-product-api with nodemon`* no player do VSCode.

\* Ao executar essa configuração, caso ocorra erro de binário não encontrado para o nodemon, execute o comando: `npm i -g nodemon` e tente novamente.


## Consumindo a API

Para fins de teste, foi disponibilizado na raiz do projeto uma Postman collection chamada `ProjetoFinal.postman_collection.json` para que seja possível realizar testes facilmente.

## DICA 1:

Para facilitar os testes, podemos gerar tokens no console do Auth0 para consumir a API passando token pelo Insomnia, para isso siga os passos abaixo:
1. Tendo a aplicação e a API products devidamente configuradas no Auth0, no console, vá em `Applications` -> `APIs`;
2. Selecione a API que você criou para o endpoint products;
3. Clique na aba `Test`, você será questionado sobre criar uma aplicação para teste, permita;
4. Utilize o curl fornecido para gerar o token.

## DICA 2:
Se preferir, para gerar o token, na collection Insomnia presente nesta mesma pasta, existe uma request pronta para esta finalidade chamada `Generate Token`, altere a `url`, o `clientId` e o `clientSecret` para os seus valores e está pronta para ser utilizada.
