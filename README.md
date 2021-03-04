# Sistema_Igreja

# Conteudos

   * [Sobre](#Sobre)
   * [Features](#Features)
   * [Geatting Started](#Geatting-Started)
   * [Instalação](#instalacao)
   * [Como usar](#como-usar)
   * [Tecnologias](#tecnologias)

### A ideia é criar um sistema de gerenciamento de igrejas e sua repectivas congregações

## Features
- [x] Cadastro de usuário ADMIN
- [x] Cadastro das congregações
- [x] Cadastro de usuários filhos
- [x] Mini Gerenciamento de Caixa
- [x] Usuários filhos gerenciam suas próprias congregações criadas do usuário ADMIN
- [x] Autenticação e autorização 

# Getting started
### Breve tutorial de como rodar o projeto

## Instalando as dependecias 
```
npm install
```

## Não esqueça de criar arquivo variaveis de ambiente na raiz do projeto

```
.env
```

## Rodando o projeto 

```
npm run dev
```


## Como Funciona:

#### Primeiro crie uma conta ADMIN, a partir dela, usando programas como postman para realizar as requisições pegue o token que é dado quando realiza um login e use nas rotas de ADMIN. Usuário ADMIN pode criar as congregações e usuarios com baixo privilégio para gerenciar as congregacoes, o usuario que foi destinado a congregacao tem poder para: criar membros, gerenciar o caixa e as informações da congregação que foi cadastrado, a congregação é indetificada a partir do toker do usuário, não esqueça de colocar toda vez que fizer alguma requisição. Token inspira a cada 30 minutos.


