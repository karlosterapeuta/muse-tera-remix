# Auditoria de disponibilidade e assets — 02/09/2026

## Domínios

`https://musetera.com.br/` não resolve DNS neste ambiente (`ERR_NAME_NOT_RESOLVED`; sem resposta A/CNAME observável para o domínio raiz ou `www`). Isso indica uma falha de delegação ou de registros no provedor DNS, anterior ao carregamento da aplicação. O domínio Netlify `https://museterasite.netlify.app/` responde normalmente com HTTP 200.

## Assets

A página Netlify publicada anteriormente referenciava a logo, a imagem de fundo e o vídeo como caminhos relativos `/manus-storage/...`. Como esses arquivos pertencem ao storage do ambiente Manus, o Netlify retornava a própria página HTML nesses caminhos em vez do arquivo de mídia. A correção alterou as referências para `https://musetera-ybjdwyyk.manus.space/manus-storage/...`.

Após a republicação, o logo responde com redirecionamento do proxy Manus para o CDN e conteúdo `image/png`; o vídeo responde com conteúdo `video/mp4` e tamanho aproximado de 2,95 MB. O bundle atual do Netlify contém a origem absoluta `musetera-ybjdwyyk.manus.space`, e a página recarregada exibe a marca MuseTera e o hero visual.

## Pendência externa

O domínio personalizado `musetera.com.br` ainda precisa ter seus registros DNS corrigidos no provedor do domínio e ser associado ao site Netlify. O painel Netlify solicitou login e não foi possível alterar essa configuração sem a sessão do proprietário.

## Verificação do painel

Após a solicitação de takeover, o painel `app.netlify.com/projects/museterasite/domain-management` continua exibindo a tela de login. Portanto, nenhuma alteração de domínio foi aplicada pelo painel e não é possível confirmar a associação de `musetera.com.br` por essa interface nesta sessão.

## Associação concluída

Com a sessão autenticada, `musetera.com.br` foi adicionado ao projeto `museterasite` como domínio primário, e `www.musetera.com.br` foi criado como redirecionamento automático para o domínio primário. O Netlify exibiu `Netlify DNS propagating...`; o certificado Let's Encrypt existente cobre `*.musetera.com.br` e `musetera.com.br`, mas o painel indicou que o projeto ainda não estava forçando HTTPS.

## Estado após a configuração

O Netlify confirmou HTTPS habilitado. O domínio raiz `https://musetera.com.br/` agora responde com HTTP 200 via Netlify, e `https://www.musetera.com.br/` responde com redirecionamento 301 para o domínio raiz seguido de HTTP 200. A propagação ainda aparece como “Netlify DNS propagating...” no painel, mas os endpoints já estão acessíveis neste ambiente.

## Validação de mídia no domínio principal

No domínio `https://musetera.com.br/`, a logo circular do MuseTera carregou com sucesso a partir do storage Manus (`naturalWidth`/`naturalHeight` 1024×1024). O vídeo da hero também carregou com sucesso a partir de `https://musetera-ybjdwyyk.manus.space/manus-storage/musetera-hero-video_c5363dfd.mp4`, com `readyState: 4`, reprodução ativa e dimensões 1280×720. A home respondeu com o título esperado.

## Validação final no Netlify

No endereço `https://museterasite.netlify.app/`, a logo circular carregou com 1024×1024 e o vídeo da hero carregou e está reproduzindo com `readyState: 4`, sem erro, em 1280×720. O navegador exibiu a home completa com o título “MuseTera — Gestão para musicoterapeutas”. A correção dos assets por URL absoluta está funcionando no Netlify e no domínio personalizado.

## Validação responsiva e de rotas

A captura mobile em 375×812 confirmou a navegação compacta, a logo no cabeçalho, a marca na hero, a hierarquia tipográfica e o dashboard abaixo da dobra. As rotas `/` e `/404` retornam HTML com `#root` e HTTP 200 via fallback SPA; as âncoras `#sobre`, `#recursos`, `#depoimentos` e `#precos` carregam a mesma home. A checagem do domínio personalizado teve uma falha transitória em uma requisição de âncora, mas novas tentativas retornaram HTTP 200; o domínio raiz e o Netlify permaneceram acessíveis.

## Evidência visual mobile nos domínios públicos

Capturas headless em viewport 375×812 foram realizadas diretamente em `https://museterasite.netlify.app/` e `https://musetera.com.br/`. Em ambas, a logo do cabeçalho e a marca na hero estão visíveis, o menu móvel aparece no canto superior direito, a hero está enquadrada sem overflow horizontal e o dashboard inicia abaixo da dobra. As duas capturas são visualmente equivalentes.

## Navegação explícita das âncoras

No Netlify publicado, os links `Sobre`, `Recursos`, `Depoimentos` e `Preços` foram acionados pelo DOM. Todos os quatro links e seus destinos foram encontrados; os hashes mudaram respectivamente para `#sobre`, `#recursos`, `#depoimentos` e `#precos`, com destinos válidos nas posições aproximadas 917, 1951, 3095 e 4007 pixels da página.

## Evidência visual inspecionada

As capturas públicas `netlify.png` e `custom.png`, ambas em 375×812, foram inspecionadas visualmente. Nas duas aparecem a logo circular no cabeçalho e junto ao título MuseTera, o menu hambúrguer, o selo da hero, o título responsivo, os botões sem corte horizontal, a notificação e o início do dashboard. Não há overflow horizontal visível; o domínio Netlify e `musetera.com.br` apresentam a mesma composição mobile.

## Checagem DOM mobile definitiva

A inspeção CDP com emulação explícita de dispositivo confirmou, diretamente nos dois domínios publicados, `innerWidth: 375`, `innerHeight: 812`, `documentWidth: 375`, `bodyWidth: 375` e `noHorizontalOverflow: true`. Em `museterasite.netlify.app` e `musetera.com.br`, `logo: true`, `logoVisible: true`, `video: true`, `videoVisible: true`, `menu: true` e `hero: true`. O vídeo e a logo usam as URLs estáveis do storage Manus e o título da página é o esperado.
