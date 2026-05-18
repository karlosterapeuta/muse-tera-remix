# Apontar musetera.com.br para o deploy na Netlify

Objetivo: fazer `musetera.com.br` e `www.musetera.com.br` servirem o site que já está publicado na Netlify (`effervescent-fenglisu-80ed28.netlify.app`).

Como o DNS do domínio já é gerenciado pela própria Netlify (Netlify DNS), o processo é direto: basta vincular o domínio ao site dentro do painel da Netlify. Você **não precisa** criar registros A/CNAME manualmente — a Netlify configura tudo sozinha.

## Passo 1 — Adicionar o domínio ao site na Netlify

1. Acesse https://app.netlify.com e abra o site `effervescent-fenglisu-80ed28`.
2. Vá em **Site configuration → Domain management** (ou **Domains** no menu lateral).
3. Em **Custom domains**, clique em **Add a domain**.
4. Digite `musetera.com.br` e confirme.
5. A Netlify vai detectar que o domínio já está no Netlify DNS da sua conta e vinculá-lo automaticamente.
6. Repita o processo para adicionar `www.musetera.com.br`.

## Passo 2 — Definir o domínio primário

1. Ainda em **Domain management**, encontre `musetera.com.br` na lista.
2. Clique nos três pontinhos (⋯) ao lado dele e escolha **Set as primary domain**.
3. A Netlify criará automaticamente um redirect de `www.musetera.com.br` → `musetera.com.br`.

## Passo 3 — Verificar / limpar registros DNS conflitantes

No painel **DNS → musetera.com.br**, confirme que existem registros do tipo `NETLIFY` (ou `A`/`ALIAS`) apontando para o site. A própria Netlify cria esses registros ao adicionar o domínio. Se sobrou algum registro antigo apontando para o Lovable (`185.158.133.1`) ou para outro destino na raiz (`@`) ou em `www`, **apague-os** para evitar conflito.

Os subdomínios já existentes (`bot.`, `portal.`, `comunidade.` etc.) podem permanecer — não interferem.

## Passo 4 — Aguardar SSL (HTTPS)

1. Em **Domain management → HTTPS**, a Netlify provisiona o certificado Let's Encrypt automaticamente.
2. Normalmente leva de poucos minutos até 1 hora. Quando aparecer **"Your site has HTTPS enabled"**, está pronto.
3. Se demorar, clique em **Verify DNS configuration** e depois em **Provision certificate**.

## Resultado final

- `https://musetera.com.br` → serve o site da Netlify
- `https://www.musetera.com.br` → redireciona para `https://musetera.com.br`
- `https://muse-remix-magic.lovable.app` continua acessível separadamente (versão publicada no Lovable), mas não é mais necessária para o domínio.

## Detalhes técnicos

- Como o domínio usa **Netlify DNS** (e não DNS externo como Registro.br/Cloudflare), você não precisa mexer manualmente em registros A/CNAME — a Netlify automatiza.
- Se em algum momento você quiser voltar a apontar para o Lovable, basta remover o domínio do site na Netlify e seguir o fluxo de **Project Settings → Domains** dentro do Lovable.
- Nenhum arquivo do projeto precisa ser alterado: o `netlify.toml` já existe e o deploy já está rodando.
