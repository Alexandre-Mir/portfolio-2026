# Portfólio 2026

## 1. Nicho de Atuação

**B2B SaaS focado em Ferramentas Internas e Automação de Processos.** O foco é construir soluções robustas, escaláveis e focadas na experiência do usuário empresarial, modernizando operações complexas e criando ferramentas que otimizam o fluxo de trabalho de equipes inteiras.

## 2. Stack Tecnológica 2026

As tecnologias centrais que dominarei e utilizarei no dia a dia da arquitetura das aplicações são:

- **Linguagem Principal:** TypeScript (garantindo tipagem, segurança e manutenibilidade)
- **Meta-framework:** Next.js (explorando App Router, SSR, e Server Actions para performance otimizada, com foco em Core Web Vitals)
- **Integração de Inteligência Artificial:** Vercel AI SDK (para streaming de IA, interfaces fluidas e integração com modelos de linguagem de forma eficiente)
- **Banco de Dados & BaaS:** Supabase / PostgreSQL
- **Estilização e Acessibilidade (A11y):** Tailwind CSS + Radix UI/Shadcn. Conformidade nativa com as diretrizes de acessibilidade (WCAG), garantindo suporte a teclado, leitores de tela e aderência à Lei Europeia de Acessibilidade (EAA).

## 3. Práticas de Engenharia e Qualidade (DevOps & Testes)

Dando foco não apenas à entrega, mas à engenharia de software sustentável:

- **Testes Automatizados:** Implementação de testes unitários (Jest) e End-to-End (Cypress / Playwright) para validação dos fluxos críticos de negócio.
- **CI/CD:** Pipelines no GitHub Actions para garantir integração e entrega contínuas, automatizando as etapas de linting, testes e deploy, gerando confiança na evolução do produto.

## 4. Proposta do Projeto Âncora

**ProposalGen AI - Gerador Dinâmico de Propostas Comerciais.** Uma aplicação B2B SaaS desenhada para consultorias e agências que sofrem com o tempo gasto na criação de propostas customizadas. A plataforma permitirá o upload do briefing do cliente (áudio ou texto) e, utilizando Next.js com Vercel AI SDK, irá processar o contexto e gerar automaticamente uma proposta comercial formatada, incluindo precificação estimada, cronograma sugerido e escopo do projeto. O sistema resolve o problema real da lentidão na resposta comercial, aumentando a taxa de conversão sem sacrificar a personalização.

**Arquitetura, Segurança e Case de Estudo:**
O projeto será desenvolvido com foco em requisitos empresariais reais, englobando:

- **Segurança e Privacidade:** Arquitetura _multi-tenant_ e manuseio seguro de dados sensíveis empresariais. Sanitização rigorosa de inputs antes da submissão aos LLMs e proteção de endpoints utilizando autenticação robusta (OAuth/JWT e controle de acesso RBAC).
- **Engenharia de Performance:** Otimização para LCP e INP visando retenção na experiência B2B.
- **Mini Caso de Estudo:** Este projeto será documentado no repositório através de um _mini caso de estudo_ contendo diagramas de arquitetura, fluxos de dados e as decisões técnicas que permearam seu desenvolvimento, comprovando o domínio do ciclo completo de engenharia.
