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

- [ ] Auditar HTTP/DNS de `musetera.com.br` e `museterasite.netlify.app`.
- [ ] Auditar referências e status HTTP da logo e do vídeo da hero.
- [ ] Corrigir a publicação do domínio principal e os caminhos dos assets.
- [ ] Republicar e validar desktop, mobile, logo, vídeo e rotas.
