# Revisão de segurança

## Correção aplicada

A política Cordova em `config.xml` não permite mais acesso de rede irrestrito (`<access origin="*">`) nem abertura de links HTTP genéricos. O acesso de rede do app foi limitado a HTTPS. Isso reduz exposição a interceptação e navegação insegura.

## Ações necessárias antes do próximo release

1. **Migrar a API para HTTPS e validar o endpoint de produção.** `src/providers/auth-service/auth-service.ts` ainda aponta para `http://192.168.1.101:8084/MWS/web/serviceMobile/`, um endereço privado em texto claro. Com a nova política, as chamadas a esse endpoint não devem funcionar; não reative HTTP para contornar isso. Atualize o endpoint para o domínio HTTPS real depois de configurá-lo no servidor.
2. **Mudar autenticação no servidor para POST.** `getLogar()` envia login e senha em segmentos do caminho de um GET. URLs podem ser registradas por servidores, proxies e ferramentas de observabilidade. O cliente sozinho não pode converter isso para POST sem um endpoint compatível; crie uma rota POST no backend e ajuste o app para enviar as credenciais no corpo da requisição. Nunca registre corpo/senha e use tokens de sessão de curta duração após autenticar.
3. **Planejar atualização da stack.** `npm audit` encontrou 56 avisos na árvore resolvida (3 críticos, 29 altos, 18 moderados e 6 baixos). O projeto combina Ionic 3 com dependências Angular 17, Angular Http 7 e toolchain antiga, com conflitos de peers; uma correção forçada pode quebrar instalação ou build. Atualize em branch separada e com testes, preferencialmente migrando para uma versão suportada do Ionic/Angular e substituindo `@angular/http` por `HttpClient`.
4. **Remover Crosswalk legado durante a migração Cordova.** O projeto declara `cordova-plugin-crosswalk-webview`, componente descontinuado que embute um motor WebView antigo. Validar uma compilação sem ele antes de remover, pois plataformas de build atuais não foram verificadas aqui.

## Verificação

A instalação de dependências para auditoria sem `--legacy-peer-deps` falhou por conflito de peer: `@angular/compiler-cli@17.0.9` exige TypeScript `>=5.2 <5.3`, enquanto o projeto declara `5.3.3`. Com `--legacy-peer-deps`, a árvore pôde ser examinada, mas isso não equivale a um build validado. O app deve ser testado contra a API HTTPS e em builds Android/iOS antes de publicar.
