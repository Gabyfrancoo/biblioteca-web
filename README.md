# Biblioteca Web

Sistema para cadastrar **Autores** e **Livros** (um autor tem vários livros: 1 → N).
Projeto da disciplina Engenharia de Software (Prof. Sandro Laudares) – Parte 2.

**Dupla:** Gabryelle Franco e Filipe Lorenzato

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 17, Spring Boot 3.2 (Web, Data JPA, Validation, Lombok), Maven |
| Frontend | React 18, React Router 6, Axios, Node.js 20 |
| Banco | PostgreSQL 15 (desenvolvimento) • H2 em memória (perfil `test`) |
| Testes | JUnit 5, Mockito, `@WebMvcTest`, `@SpringBootTest` |
| DevOps | Git/GitHub, GitHub Actions, Docker, Docker Compose |

## Estrutura

```
biblioteca-web/
├── backend/        (model, repository, controller, testes, Dockerfile, pom.xml)
├── frontend/       (components, services/api.js, App.js, Dockerfile, nginx.conf)
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```

## Como executar

Com Docker (sobe backend, frontend e PostgreSQL):

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080/api/autores e /api/livros
- Swagger: http://localhost:8080/swagger-ui.html

Sem Docker:

```bash
docker-compose up -d postgres        # só o banco
cd backend && mvn spring-boot:run    # API na porta 8080
cd frontend && npm install && npm start   # React na porta 3000
```

## Endpoints

| Verbo | URL | Status |
|---|---|---|
| POST | /api/autores, /api/livros | 201 |
| GET | /api/autores, /api/livros | 200 |
| GET | /api/{recurso}/{id} | 200 / 404 |
| PUT | /api/{recurso}/{id} | 200 / 404 |
| DELETE | /api/{recurso}/{id} | 200 / 404 (autor com livros: 409) |
| GET (extra) | /api/livros/autor/{autorId} | 200 |

Exemplo de livro: `{"titulo":"Dom Casmurro","isbn":"978-8535910667","anoPublicacao":1899,"genero":"Romance","autor":{"id":1}}`

## Testes

```bash
cd backend
mvn test                              # todos
mvn test -Dtest="*ControllerTest"     # unitários
mvn test -Dtest="IntegracaoTest"      # integração
```

## Divisão do trabalho

| Integrante | Responsabilidade | Branch |
|---|---|---|
| Gabryelle Franco | CRUD de Autores (Autor, AutorRepository, AutorController, AutorControllerTest, AutorList, AutorForm) | feature/autores |
| Filipe Lorenzato | CRUD de Livros (Livro, LivroRepository, LivroController, LivroControllerTest, LivroList, LivroForm) | feature/livros |

Arquivos comuns (api.js, App.js, docker-compose, CI, README) foram divididos entre os dois. Cada um revisou o Pull Request do outro.
