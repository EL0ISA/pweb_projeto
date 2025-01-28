

---

# 🌐 Projeto de Programação Web

Este é um projeto desenvolvido com **Next.js** e estilizado com **Bootstrap**, oferecendo uma base sólida para desenvolvimento web moderno.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web rápidas e otimizadas.
- **Bootstrap**: Framework CSS para estilização e design responsivo.
- **Prisma**: ORM para gerenciar banco de dados de forma eficiente.

---

## 📦 Configuração do Projeto

Antes de executar o projeto, é necessário configurar os seguintes arquivos na raiz do diretório:

### 1. Arquivo `.env`

Adicione o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.db"
```

### 2. Arquivo `.env.local`

Adicione o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para iniciar o projeto:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute as migrações do banco de dados:

   ```bash
   npx prisma migrate dev
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O projeto estará disponível em **[http://localhost:3000](http://localhost:3000)**. 🎉

---

## 🖌️ Estilização

O projeto utiliza **Bootstrap** para estilização e design. Sinta-se à vontade para personalizar os estilos em conformidade com as suas necessidades.

---

💻 **Happy coding!**
