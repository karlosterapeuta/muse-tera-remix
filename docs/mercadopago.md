# Mercado Pago

## Checkout Pro

Os botões dos três planos chamam `payments.createPreference` no backend tRPC. O Access Token permanece exclusivamente no servidor; o frontend recebe apenas o `init_point` retornado pelo Mercado Pago e redireciona o visitante para o Checkout Pro.

Os planos configurados são:

| Plano | Valor |
|---|---:|
| 30 dias | R$ 69,90 |
| 6 meses | R$ 399,00 |
| 12 meses | R$ 699,00 |

## Webhook

O processamento de notificações está **externalizado** conforme solicitado, usando a variável `MERCADOPAGO_WEBHOOK_URL`:

`https://bot-musetera.lovable.app/api/public/mp-webhook`

O Mercado Pago envia os eventos para esse endpoint. A aplicação MuseTera configura essa URL na preferência criada, mas não duplica o processamento localmente. A validação de `x-signature`, persistência de pagamento e atualização de status devem permanecer implementadas no serviço externo. A página de retorno (`success`, `pending` e `failure`) é apenas uma etapa de navegação e não deve ser usada como confirmação de pagamento; a confirmação deve vir do webhook. O backend sempre envia as três URLs em HTTPS e usa `https://museterasite.netlify.app` como fallback público. Se o domínio oficial mudar, defina `MERCADOPAGO_RETURN_URL` no ambiente do backend com a origem HTTPS correspondente.

## Segurança e produção

Nunca mova `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET` ou `WEBHOOK_SHARED_TOKEN` para código de frontend. O token de produção informado deve ser rotacionado no painel do Mercado Pago caso tenha sido exposto fora do ambiente seguro. Antes de liberar vendas, valide no painel do Mercado Pago se o endpoint externo está configurado para os eventos `payment` e se ele valida o cabeçalho `x-signature`.

A validação local cobre o catálogo de preços, autenticação do Access Token, montagem da preferência e ausência de credenciais no payload entregue ao navegador. Não foi realizada nenhuma cobrança real.
