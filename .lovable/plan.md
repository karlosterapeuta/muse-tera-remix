# Apontar musetera.com.br para o app publicado no Lovable

Você quer que o domínio `musetera.com.br` (raiz) e `www.musetera.com.br` mostrem o site `https://muse-remix-magic.lovable.app`.

Como o DNS do `musetera.com.br` está gerenciado dentro da Netlify (vi os registros `bot.`, `portal.`, `comunidade.` etc.), você fará tudo de dentro do painel **DNS da Netlify** + painel do **Lovable**.

> Importante: o domínio raiz vai apontar para o **Lovable**, não para a Netlify. O deploy da Netlify (`effervescent-fenglisu-80ed28.netlify.app`) continua existindo, mas não será mais acessado por esse domínio. Se preferir manter o deploy da Netlify no domínio, me avise — o caminho é diferente.

## Passo 1 — Adicionar o domínio no Lovable

1. Abra **Project Settings → Domains** no Lovable.
2. Clique em **Connect Domain**.
3. Digite `musetera.com.br` e confirme.
4. Repita e adicione também `www.musetera.com.br`.
5. O Lovable vai te mostrar 2 tipos de registro para criar no DNS:
   - Um **A record** com valor `185.158.133.1`
   - Um **TXT record** chamado `_lovable` com um valor de verificação único (algo como `lovable_verify=ABC123...`)
6. **Copie esses valores** — você vai colá-los no próximo passo.

## Passo 2 — Criar os registros DNS na Netlify

No painel da Netlify em **DNS → musetera.com.br**, clique em **Add new record** e crie:

### Registro 1 — domínio raiz
- Tipo: `A`
- Nome: deixe em branco (ou `@`)
- Valor: `185.158.133.1`
- TTL: 3600

### Registro 2 — subdomínio www
- Tipo: `A`
- Nome: `www`
- Valor: `185.158.133.1`
- TTL: 3600

### Registro 3 — verificação de propriedade
- Tipo: `TXT`
- Nome: `_lovable`
- Valor: o código `lovable_verify=...` que o Lovable mostrou
- TTL: 3600

## Passo 3 — Remover registros conflitantes (se existirem)

Antes de salvar, verifique se já existe algum registro tipo `A`, `CNAME`, `NETLIFY` ou `ALIAS` apontando para a raiz (`musetera.com.br` sem subdomínio) ou para `www`. Se existir, **delete** — senão vai conflitar com os novos registros. Os subdomínios já existentes (`bot.`, `portal.`, `comunidade.`) podem ficar, eles não interferem.

## Passo 4 — Aguardar verificação e SSL

1. Volte ao Lovable em **Project Settings → Domains**.
2. O status do domínio vai passar por: **Verifying → Setting up → Active**.
3. Normalmente leva de 10 minutos a 1 hora. O máximo é 72h por causa da propagação DNS.
4. Quando ficar **Active**, o `https://` é provisionado automaticamente.

## Passo 5 — Escolher domínio primário

No Lovable, marque `musetera.com.br` (sem www) como **Primary**. O `www.musetera.com.br` vai redirecionar automaticamente para ele.

## Resumo dos valores que você vai usar

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ (raiz) | 185.158.133.1 |
| A | www | 185.158.133.1 |
| TXT | _lovable | (o código que o Lovable te mostrar) |

## Detalhes técnicos

- Esses passos não alteram nenhum arquivo do projeto — é tudo configuração de DNS e do painel do Lovable.
- O deploy atual na Netlify continua acessível pela URL `effervescent-fenglisu-80ed28.netlify.app`, mas o domínio personalizado passará a servir a versão publicada no Lovable.
- Se quiser que o domínio aponte para a Netlify (e não para o Lovable), o caminho é outro: adicionar o domínio dentro da Netlify (no projeto `effervescent-fenglisu-80ed28`) e deixar os registros A/AAAA apontando para os IPs da Netlify. Me avise se for esse o caso.
