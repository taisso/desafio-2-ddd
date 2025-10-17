## Desafio 2 — Node + DDD (Full Cycle)

Projeto de estudo aplicando Domain-Driven Design (DDD) em Node.js/TypeScript. O foco é a modelagem do domínio (entities, value objects, domain services, events) e a persistência via Sequelize/SQLite, com testes automatizados em Jest.

### Sumário
- **O que é**
- **Arquitetura e módulos**
- **Requisitos**
- **Instalação**
- **Execução (build/compilação)**
- **Testes**
- **Estrutura de pastas**
- **Scripts úteis**

## O que é
Implementação de conceitos de DDD em uma base Node.js/TypeScript. Não há API HTTP exposta aqui; o objetivo é praticar a camada de domínio e a integração com a infraestrutura (ORM). O banco padrão é SQLite (local), adequado para desenvolvimento e testes.

## Arquitetura e módulos
- **Domain**: entidades, value objects, fábricas, serviços de domínio e eventos (dispatcher, handlers e integração entre módulos). Módulos principais:
  - `customer`: cliente, endereço, eventos de criação e de alteração de endereço
  - `product`: produto e evento de criação de produto
  - `checkout`: pedido (order) e orquestração do domínio
  - `@shared`: contratos e mecanismos de eventos (event dispatcher/handler)
- **Infrastructure**: implementação de repositórios com Sequelize (Modelos + Repositories) para `customer`, `product` e `order`.

## Requisitos
- Node.js 16+ (recomendado 18+)
- npm 8+

## Instalação
```bash
npm install
```

## Execução (build/compilação)
Este projeto não expõe servidor HTTP. Para compilar o TypeScript para JavaScript:
```bash
npm run tsc
```
Os artefatos serão gerados em `dist/` conforme o `tsconfig.json`.

## Testes
Rode a checagem de tipos e a suíte de testes com Jest (transformação via `@swc/jest`):
```bash
npm test
```

## Estrutura de pastas (visão geral)
```
src/
  domain/
    @shared/
      event/                     # dispatcher, interfaces e testes de eventos
      repository/                # contrato base de repositórios
    checkout/
      entity/                    # order, order_item
      factory/                   # order.factory
      repository/                # contrato de order repository
      service/                   # regras de domínio de checkout
    customer/
      entity/                    # customer, address (VO)
      event/                     # eventos (created, change-address) e handlers
      factory/
      repository/
      value-object/
    product/
      entity/                    # product e variações
      event/                     # evento product-created + handler de e-mail
      factory/
      repository/
      service/
  infrastructure/
    customer/repository/sequelize/  # model + repository + testes
    product/repository/sequelize/   # model + repository + testes
    order/repository/sequilize/     # model + repository + testes ("sequilize" conforme diretório)
```

## Scripts úteis
```json
{
  "test": "npm run tsc -- --noEmit && jest",
  "tsc": "tsc"
}
```

## Tecnologias
- TypeScript
- Jest + @swc/jest
- Sequelize + sequelize-typescript
- SQLite (driver `sqlite3`)

## Dicas / Troubleshooting
- Se houver erros ao instalar `sqlite3`, verifique se possui ferramentas de build do seu SO instaladas (ex.: build-essential no Linux) e tente `npm install` novamente.
- Caso veja erros de tipos, rode apenas `npm run tsc` para identificar a origem com mais contexto.
