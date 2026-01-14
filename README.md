# 📱 Sistema de Cadastro e Autenticação com JWT

Projeto **full stack** de cadastro, login e autenticação de usuários utilizando **JWT (JSON Web Token)**.  
A aplicação é composta por uma **API em Node.js** e um **aplicativo mobile em React Native**, com controle de sessão seguro e persistente.

---

## 🚀 Tecnologias Utilizadas

### 🖥 Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT (JSON Web Token)
- bcryptjs
- Banco de dados SQL (PostgreSQL / MySQL / SQLite)

### 📱 Frontend (Mobile)
- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- AsyncStorage
- Tailwind CSS (NativeWind)

---

## 📌 Funcionalidades

### 🔐 Autenticação
- Cadastro de usuários
- Login com email e senha
- Geração de token JWT
- Validação de token
- Expiração automática do token
- Logout com remoção do token

### 👤 Perfil
- Rota protegida
- Busca dos dados do usuário autenticado
- Exibição de nome e email

### 🔄 Navegação
- Redirecionamento automático baseado na autenticação
- Persistência de sessão com AsyncStorage
- Separação entre rotas públicas e privadas

---

## 🧠 Funcionamento da Autenticação

1. Usuário realiza login
2. A API valida as credenciais
3. Um token JWT é gerado contendo o ID do usuário
4. O token é salvo no AsyncStorage
5. O app valida o token ao iniciar
6. Rotas protegidas só são acessadas com token válido

---

## 🔒 Middleware de Autenticação (Backend)

- Lê o token do header `Authorization`
- Decodifica o JWT
- Extrai o ID do usuário
- Injeta o `userId` na requisição
- Bloqueia acesso caso o token seja inválido ou expirado

---

## 🗂 Estrutura do Projeto

### Backend
