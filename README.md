

---

# 📋 Kanban List – Ionic + Angular

Um **Kanban Board moderno e responsivo**, desenvolvido com **Ionic + Angular + TailwindCSS**, oferecendo uma experiência fluida em dispositivos **mobile** e **desktop**.

Este projeto inclui:

✔ Criação, edição e exclusão de tarefas
✔ Colunas configuráveis
✔ Drag & Drop entre colunas
✔ Subtarefas com checkbox
✔ Modal estilizado para adicionar/editar tarefas
✔ Filtros por título e prioridade
✔ Armazenamento local (localStorage)
✔ Interface limpa e moderna

---

## 🚀 Tecnologias

* **Ionic 7 (Standalone Components)**
* **Angular 17**
* **TailwindCSS**
* **TypeScript**
* **LocalStorage**

---

## 📦 Funcionalidades

### 📝 Gestão de Tarefas

* Criar tarefas com:

  * Título
  * Descrição
  * Status
  * Prioridade
  * Data
  * Subtarefas
* Editar tarefas
* Deletar tarefas

### 🪄 Interface Visual

* Layout em colunas estilo Kanban
* Cores diferenciadas por coluna
* Ícone de edição no card
* Subtarefas com marcação visual
* Cards arrastáveis (drag & drop)

### 🎯 Drag & Drop

Arraste tarefas entre colunas:

* Aberto
* Em andamento
* Concluído
* Done Done

O status é atualizado automaticamente no serviço.

### 🔎 Filtros Inteligentes

Cada coluna possui filtros:

* Filtrar por título
* Filtrar por prioridade

---

## 🧩 Estrutura do Projeto

```
src/
 ├── app/
 │   ├── components/
 │   │   ├── kanban-column/
 │   │   ├── task-card/
 │   ├── models/
 │   │   └── task.ts
 │   ├── pages/
 │   │   ├── kanban/
 │   │   ├── task-form/
 │   ├── services/
 │   │   └── task.service.ts
 │   └── app.routes.ts
 ├── main.ts
 └── index.html
```

---

## ⚙️ Como rodar o projeto

### 1️⃣ Instale as dependências

```sh
npm install
```

### 2️⃣ Execute o projeto

```sh
ionic serve
```

### 3️⃣ Acesse no navegador

[http://localhost:8100](http://localhost:8100)

---

## 📱 Preview (Screenshots)

*(Adicione prints depois no GitHub)*

---

## 🗄 Armazenamento

As tarefas são salvas no:

```
localStorage → "tasks"
```

Nada é perdido ao atualizar a página.

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Faça um **fork**
2. Crie uma branch:

   ```sh
   git checkout -b minha-feature
   ```
3. Faça o commit:

   ```sh
   git commit -m "Minha nova feature"
   ```
4. Envie a branch:

   ```sh
   git push origin minha-feature
   ```
5. Abra um **Pull Request**

---

## 📜 Licença

Este projeto está sob a licença **MIT**.

---

## 👨‍💻 Autor

**Adriano ADS**
🔗 GitHub: [https://github.com/adrianoads910-max](https://github.com/adrianoads910-max)

---

