# Apontar musetera.com.br (Registro.br) para o deploy na Netlify

Objetivo: fazer `musetera.com.br` e `www.musetera.com.br` servirem o site publicado na Netlify (`effervescent-fenglisu-80ed28.netlify.app`).

## Situação atual

- Domínio registrado em **Registro.br**.
- Nameservers já apontam para `dns1.p05.nsone.net` … `dns4.p05.nsone.net` — esses são os **nameservers do Netlify DNS**.
- Ou seja, o **DNS já é gerenciado pela Netlify**. Você não precisa mexer em nada no Registro.br (nem trocar nameservers, nem criar registros lá). Toda a configuração acontece dentro do painel da Netlify.

Se um dia esses nameservers forem alterados no Registro.br, o domínio para de funcionar — então **deixe-os exatamente como estão**.

## Passo 1 — Adicionar o domínio ao site na Netlify

1. Acesse https://app.netlify.com e abra o site `effervescent-fenglisu-80ed28`.
2. Vá em **Site configuration → Domain management** (menu lateral: **Domains**).
3. Em **Custom domains**, clique em **Add a domain**.
4. Digite `musetera.com.br` e confirme. A Netlify reconhece que o domínio já está no Netlify DNS da sua conta e vincula automaticamente.
5. Repita para `www.musetera.com.br`.

## Passo 2 — Definir o domínio primário

1. Em **Domain management**, encontre `musetera.com.br`.
2. Clique nos três pontos (⋯) → **Set as primary domain**.
3. A Netlify cria automaticamente o redirect `www.musetera.com.br → musetera.com.br`.

## Passo 3 — Limpar registros DNS conflitantes (dentro da Netlify)

No painel **Domains → musetera.com.br** (DNS da Netlify), verifique se há registros antigos em `@` ou `www` apontando para outro destino (por exemplo o IP do Lovable `185.158.133.1`, ou algum CNAME antigo). **Apague esses registros conflitantes.**

A Netlify cria sozinha os registros do tipo `NETLIFY`/`A` corretos quando você vincula o domínio no Passo 1. Subdomínios em uso (`bot.`, `portal.`, `comunidade.` etc.) podem permanecer.

## Passo 4 — Aguardar o SSL (HTTPS)

1. Em **Domain management → HTTPS**, a Netlify provisiona o certificado Let's Encrypt automaticamente.
2. Normalmente leva de minutos a 1 hora. Quando aparecer **"Your site has HTTPS enabled"**, está pronto.
3. Se demorar, clique em **Verify DNS configuration** e depois em **Provision certificate**.

## Resultado final

- `https://musetera.com.br` → site da Netlify
- `https://www.musetera.com.br` → redireciona para `https://musetera.com.br`
- `https://muse-remix-magic.lovable.app` continua acessível separadamente (versão Lovable), mas não é mais necessária para o domínio.

## Detalhes técnicos

- O Registro.br só faz a delegação dos nameservers; quem responde pelas consultas DNS é o Netlify DNS (NS1).
- Por isso **não é preciso criar registros A/CNAME no Registro.br** — toda configuração fica na Netlify.
- Nenhum arquivo do projeto precisa ser alterado: `netlify.toml` e deploy já estão prontos.
