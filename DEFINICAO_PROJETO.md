# Definição do Projeto — CineTicket

## 1. Nome do projeto
**CineTicket** — Sistema de Bilheteria de Cinema

## 2. Problema
Organizar a venda de ingressos, o controle de salas e assentos e o histórico de espectadores de forma rápida e visual, evitando duplicidade de assentos na mesma sala e facilitando consultas ou alterações.

## 3. Público
Atendentes de bilheteria e gerentes de cinema.

## 4. Páginas
- **Início / Dashboard (`/`)**: Painel com resumo de ingressos vendidos, faturamento total, distribuição por tipo de entrada e atalhos rápidos.
- **Bilheteria / Ingressos (`/ingressos`)**: Formulário controlado para venda de novos ingressos, barra de busca/filtro em tempo real e listagem completa dos ingressos emitidos.
- **Detalhes / Edição do Ingresso (`/ingresso/:id`)**: Tela dinâmica para visualizar e editar os dados de um ingresso específico.

## 5. Dados (Objeto Ingresso)
- `id`: Identificador único numérico
- `cliente`: Nome do espectador
- `filme`: Título do filme em cartaz
- `sala`: Número da sala (ex: Sala 1 - IMAX, Sala 2 - 3D, Sala 3 - Padrão)
- `assento`: Código da poltrona (ex: E5, C8)
- `tipo`: Tipo de ingresso (`Inteira` ou `Meia`)
- `valor`: Valor em reais (`36` para Inteira, `18` para Meia)

## 6. Operações CRUD
- **CREATE**: Emitir e cadastrar um novo ingresso com validação de campos obrigatórios e verificação de assento ocupado na mesma sala.
- **READ**: Listar todos os ingressos emitidos e filtrar por cliente, filme ou tipo de entrada.
- **UPDATE**: Editar cliente, filme, sala, assento ou tipo de ingresso de um registro existente.
- **DELETE**: Cancelar e remover um ingresso da lista.
