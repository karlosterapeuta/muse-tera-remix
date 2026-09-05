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
- [x] Atualizar todos os links e botões do WhatsApp para `+55 81 98543-6981`.
- [x] Validar os links, o build e publicar a alteração.

# Sincronização da pré-visualização com GitHub

- [x] Comparar a versão local, o preview e a branch `main` do GitHub.
- [x] Sincronizar código, dependências e arquivos de configuração divergentes que são compatíveis com o preview.
- [x] Reiniciar o preview e validar visualmente a versão sincronizada compatível.
- [x] Ajustar a porta padrão de desenvolvimento para manter o preview gerenciado em 3000 sem remover o suporte a `PORT` e `--port`.
- [x] Documentar explicitamente a exceção técnica: a porta padrão do preview fica em 3000, enquanto a branch GitHub usa fallback 8080; `PORT` e `--port` continuam suportados.
- [x] Documentar que `client/src/components/SocialProofPurchases.tsx` não foi copiado porque contém notificações de compras não verificadas; manter a alternativa factual do preview.
- [x] Revalidar visualmente o preview após registrar as exceções e confirmar o estado efetivo dos arquivos sincronizados.
- [x] Validar em execução os botões e links de WhatsApp no preview, confirmando `https://wa.me/5581985436981`.
- [x] Publicar a alteração do número de WhatsApp no preview/Netlify e registrar o deploy concluído.
- [ ] Publicar a alteração do WhatsApp no ambiente final relevante, com deploy/commit registrado.
- [ ] Revalidar no domínio público final que os links apontam para `https://wa.me/5581985436981` após a publicação.
