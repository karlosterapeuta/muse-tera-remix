# Correção do deploy Netlify

- [x] Auditar o diretório gerado pelo build e a configuração do Netlify.
- [x] Corrigir o publish directory para o artefato real.
- [x] Executar e verificar um novo deploy.

- [x] Auditar a preferência do Mercado Pago e o remote GitHub conectado ao Netlify.
- [x] Corrigir `auto_return` com `back_urls.success`, `back_urls.failure` e `back_urls.pending` válidas.
- [x] Testar a criação da preferência, o build e o fluxo de assinatura.
- [x] Enviar as alterações para `karlosterapeuta/muse-tera-remix`.

- [x] Fazer commit e confirmar o novo SHA remoto em `github/main`.
- [x] Validar a criação da preferência pelo endpoint real em ambiente com backend acessível.
- [x] Confirmar que o ambiente publicado usado pelo frontend expõe `/api/trpc` para o checkout.

# Disponibilidade, domínio e assets

- [x] Auditar HTTP/DNS de `musetera.com.br` e `museterasite.netlify.app`.
- [x] Auditar referências e status HTTP da logo e do vídeo da hero.
- [x] Corrigir a publicação do domínio principal e os caminhos dos assets.
- [x] Republicar e validar desktop, mobile, logo, vídeo e rotas.
- [x] Verificar o módulo `server/mercadopagoWebhook`: o erro era histórico de remoção; não há import ativo no servidor atual e a inicialização atual não reproduz a falha.
- [x] Validar explicitamente a versão mobile publicada após o deploy final.
- [x] Verificar as rotas publicadas relevantes além da home, incluindo fallback SPA, `/404` e links principais.
- [x] Validar a versão mobile diretamente em um domínio publicado final com viewport reduzido e registrar evidência.
- [x] Navegar ou clicar explicitamente nos links principais publicados e confirmar o comportamento esperado das âncoras, além de revalidar `/404` e fallback SPA no domínio final.
- [x] Validar a home mobile diretamente no domínio publicado em viewport reduzido com inspeção de viewport, logo, hero, menu e overflow.
- [x] Registrar evidência verificável da validação mobile publicada por screenshot legível ou checagem DOM específica.
- [x] Validar a home mobile publicada com checagens DOM verificáveis de logo, hero, menu e largura do documento.
- [x] Registrar no contexto a evidência mobile publicada por screenshot legível e/ou checagem DOM específica.
