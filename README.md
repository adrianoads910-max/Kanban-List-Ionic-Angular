
````markdown
# 📋 Kanban List – Ionic + Angular + Firebase

Um **Kanban Board moderno, responsivo e em tempo real**, desenvolvido como desafio técnico para a vaga de estágio (Frontend) da Cyrrus Next Systems.

O projeto utiliza a stack moderna **Ionic 7 + Angular 17 (Standalone)** e destaca-se pela integração completa com **Firebase Firestore** para persistência de dados na nuvem.

🔗 **Link do Projeto Online (Demo):** [https://adrianoads910-max.github.io/Kanban-List-Ionic-Angular/](https://adrianoads910-max.github.io/Kanban-List-Ionic-Angular/)

---

## 🚀 Tecnologias Utilizadas

* **Framework:** Ionic 7 (Standalone Components) + Angular 17
* **Estilização:** TailwindCSS (Design System customizável)
* **Backend / Banco de Dados:** Firebase Firestore (NoSQL em tempo real)
* **Linguagem:** TypeScript
* **Deploy:** GitHub Pages

---

## 📦 Funcionalidades

### 📝 Gestão de Tarefas Avançada
* **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
* **Campos detalhados:** Título, Descrição, Status, Prioridade (Baixa, Média, Alta), Data de Entrega e Subtarefas (Checklist).

### 🎯 Workflow Kanban
* **4 Colunas Fixas:** Aberto, Em Andamento, Concluído, Done Done.
* **Cores Semânticas:** Identificação visual rápida para cada estado e prioridade.
* **Contadores:** Visualização do total de tarefas por coluna.

### ✨ Interatividade e UX
* **Drag & Drop:** Arraste e solte tarefas entre colunas para atualizar o status automaticamente.
* **Filtros Dinâmicos:** Filtragem em tempo real por Título e Prioridade dentro de cada coluna.
* **Persistência Offline:** Suporte a funcionamento offline (cache do Firestore via IndexedDB).

---

## ⚙️ Como rodar o projeto localmente

### 1️⃣ Pré-requisitos
Certifique-se de ter o **Node.js** e o **Ionic CLI** instalados.

### 2️⃣ Instalação
Clone o repositório e instale as dependências:

```bash
git clone [https://github.com/adrianoads910-max/Kanban-List-Ionic-Angular.git](https://github.com/adrianoads910-max/Kanban-List-Ionic-Angular.git)
cd Kanban-List-Ionic-Angular
npm install
````

### 3️⃣ Execução

Inicie o servidor de desenvolvimento:

```bash
ionic serve
```

O projeto abrirá automaticamente em `http://localhost:8100`.

-----

## 🧠 Decisões de Projeto (Q\&A Obrigatório)

Conforme solicitado no desafio técnico, abaixo estão as respostas detalhadas sobre o processo de desenvolvimento.

### 1\. Qual foi sua lógica para estruturar o projeto?

Optei pela arquitetura moderna de **Standalone Components** do Angular 17 para reduzir a complexidade  e tornar a aplicação mais modular e performática.
A estrutura foi dividida em:

  * **Pages:** A `KanbanPage` atua como o orquestrador, conectando-se ao serviço de dados e distribuindo as tarefas.
  * **Components:** Componentes visuais como `KanbanColumn` e `TaskCard` recebem dados via `@Input` e emitem ações via `@Output`, garantindo o princípio de responsabilidade única.
  * **Services:** O `TaskService` centraliza toda a regra de negócio e comunicação com o Firebase, utilizando `Observables` para garantir que a interface seja reativa (realtime).

### 2\. Que parte você achou mais difícil ou travou?

O maior desafio foi a configuração do **deploy em produção** combinando Ionic, TailwindCSS e GitHub Pages.
Houve um problema específico onde o mecanismo de "Purge" do Tailwind removia as classes CSS dinâmicas das colunas (cores de fundo) no build final, resultando em uma tela sem estilos. Foi necessário configurar o `safelist` no `tailwind.config.js` e ajustar as variáveis de ambiente (`environment.prod.ts`) para garantir que o Firebase e os estilos carregassem corretamente fora do ambiente local (`localhost`).

### 3\. O que faria diferente se tivesse mais tempo?

  * **Testes Unitários:** Implementaria testes automatizados com Jasmine/Karma para garantir a estabilidade do `TaskService` e evitar regressões.
  * **Drag & Drop Mobile:** Melhoraria a experiência de toque (touch) no mobile usando a biblioteca `Angular CDK DragDrop` com configurações específicas de "long press" para evitar conflito com o scroll da tela.
  * **Autenticação:** Implementaria o Firebase Auth para que cada usuário tivesse seu próprio quadro privado, ao invés de um quadro público compartilhado.

### 4\. O que faria diferente se fosse para um cliente real?

  * **Segurança:** Configuraria as *Security Rules* do Firestore para permitir leitura/escrita apenas para usuários autenticados e validados, protegendo o banco de dados contra abusos.
  * **Tratamento de Erros:** Implementaria um interceptador global e serviços de notificação (Toasts) para avisar o usuário amigavelmente caso a conexão caísse ou ocorresse um erro no servidor.
  * **Acessibilidade (a11y):** Focaria em atributos ARIA e navegação via teclado para garantir que o Kanban fosse inclusivo.

### 5\. Você usou alguma ferramenta ou inteligência artificial para ajudar? Como?

Sim, utilizei IA (Gemini) como um "Pair Programmer" auxiliar.
A IA foi fundamental para:

1.  Acelerar a migração e configuração inicial do Firebase para a versão 9 (modular).
2.  Diagnosticar o erro de "tela preta" no deploy (identificando o problema de CSS Purge e variáveis de ambiente).
3.  Refatorar o código para o padrão Standalone do Angular, garantindo as melhores práticas atuais da documentação.
    A lógica de negócios e a estruturação dos componentes foram guiadas pelos requisitos do desafio, usando a IA para otimizar a sintaxe e resolver impedimentos técnicos de infraestrutura.

-----

## 👨‍💻 Autor

**Adriano ADS**
🔗 GitHub: [https://github.com/adrianoads910-max](https://github.com/adrianoads910-max)

```
`
