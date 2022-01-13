# Projeto Final

Seja bem vindo ao projeto final da disciplina de Segurança em Aplicações! 

Neste projeto, aplicaremos os conhecimentos adquiridos ao longo da disciplina a fim de mitigar vulnerabilidades em um ambiente complexo de microsserviços.

## Contexto

O projeto é composto por uma Loja virtual operada através de APIs, e sua arquitetura é composta por:

1. Web App Angular (Frontend) responsável por disponibilizar a interface gráfica na Web da Loja Virtual.
2. API Orquestradora (Backend For Frontend) responsável por orquestras as chamadas as APIs produto e consolidar informações para o Frontend.
3. API Produto de pedidos (orders) responsável pelo CRUD de Pedidos;
4. API Produto de produtos (products) responsável pelo CRUD de Produtos;
5. Banco de dados único, responsável por conter as tabelas relacionais para armazenamento de dados;

Atualmente, o Frontend já possui Autenticação implementada através do provider auth0 conforme visto no laboratório da Aula de Autorização e Autenticação e OAuth 2.0.

## Pre-requisito

Antes de iniciarmos o desafio, faz-se necessário que seja configurada a integração com o ambiente da auth0 conforme visto no laboratório da Aula 7 sobre Autorização e Autenticação e OAuth 2.0.

## Challenge

O desafio consiste em mitigar as vulnerabilidades e vertentes de ataque conhecidas e exploradas durante a disciplina em todos os serviços do ecossistema, segue abaixo relação destas e seu peso de composição na nota:

1. Broken Authentication (0.4);
2. Man In The Middle/Sniffing (0.3);
3. Code Injection (0.3);

Serão avaliadas todas as supracitadas em todas as camadas de comunicação, por isso é importante aplicar medidas e boas praticas de mitigação destas em todos os serviços do ecossistema.

## Executando a aplicação

Ao executar os serviços, os mesmos serão expostos nos endereços:

1. Web App Angular (Frontend): http://localhost:4200;
2. API Orquestradora (Backend For Frontend): http://localhost:3000;
3. API Produto de pedidos (orders): http://localhost:3001;
4. API Produto de produtos (products): http://localhost:3002;
5. Banco de dados: localhost:3306;

### VSCode

Foi disponibilizado na raiz do projeto o arquivo `.vscode\launch.json` para que seja possível iniciar a execução dos 3 serviços de backend diretamente no terminal integrado do VSCode com debug e nodemon para live reload.

### Docker

Foi disponibilizada toda a configuração Docker com Docker Compose para que todo o ecossistema de serviços seja executado através do comando: `docker-compose up`.

Para executar o frontend, utilize o comando: `ng serve` na pasta raiz do mesmo.
