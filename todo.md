# Correção do deploy Netlify

- [x] Auditar o diretório gerado pelo build e a configuração do Netlify.
- [x] Corrigir o publish directory para o artefato real.
- [x] Executar e verificar um novo deploy.

- [x] Auditar a preferência do Mercado Pago e o remote GitHub conectado ao Netlify.
- [x] Corrigir `auto_return` com `back_urls.success`, `back_urls.failure` e `back_urls.pending` válidas.
- [x] Testar a criação da preferência, o build e o fluxo de assinatura.
- [x] Enviar as alterações para `karlosterapeuta/muse-tera-remix`.

- [ ] Fazer commit e confirmar o novo SHA remoto em `github/main`.
- [ ] Validar o clique em “Assinar plano” em ambiente com backend acessível.
- [ ] Confirmar que o ambiente publicado usado pelo frontend expõe `/api/trpc` para o checkout.
