# Sincronização da pré-visualização

A pré-visualização foi atualizada com as alterações compatíveis da branch `main` do repositório `karlosterapeuta/muse-tera-remix`, incluindo a Home, dependências, lockfile, configuração TypeScript, configuração do servidor, `roadmap.md` e o ajuste de mensagem do WhatsApp.

Existe uma exceção técnica necessária ao ambiente Manus: a branch remota usa `8080` como fallback de porta, enquanto o preview gerenciado precisa iniciar em `3000` para expor sua URL de visualização. O servidor local mantém suporte prioritário a `PORT` e ao argumento `--port`; somente o fallback de desenvolvimento foi mantido em `3000`.

O arquivo remoto `client/src/components/SocialProofPurchases.tsx` não foi copiado para o preview porque contém nomes, cidades, planos e tempos de compras apresentados como fatos sem fonte verificável. A Home mantém a alternativa factual `ActivityNotifications`, que comunica campanha, teste, proteção de dados e organização da prática sem alegar vendas reais.

Após a sincronização compatível, `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm check` e `pnpm build` foram executados com sucesso. O preview voltou a responder em `https://3000-icsux4sjh857vb5unjctn-852ae397.us4.manus.computer` e foi capturado em viewport desktop.
