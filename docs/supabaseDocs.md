# Supabase Docs

## O que é o Supabase?

Supabase é uma alternativa open source ao Firebase, que provem todas as features de um back-end necessárias para criar um produto.

## Porque usamos o Supabase?

Por ser open source e gratuito, o Supabase é uma ótima alternativa para o Firebase, que é pago e possui um plano gratuito limitado.

## Como usar o Supabase e a REST API

Primeiro acesse o [site](https://app.supabase.com/project/hflbuhswxxfxbsuuvzbv/settings/api) da nossa equipe no Supabase, aqui encontraremos a chave **URL** e a chave **anon** São chaves importantes para a funcionalidade do código, na pasta `src/helpers` acharemos supabaseClient.ts , nela colocaremos as seguintes chaves:

```
const supabaseUrl = **CHAVE_URL**
const supabaseAnonKey = **CHAVE_ANON**
```

Após o teste do projeto, **NÃO ESQUEÇAM DE APAGAR AS CHAVES ANTES DE COMMITAR**, pois são para de segurança que não podem ser compartilhadas.

Para usar a REST API, veja os exemplos de como acessar cada endpoint a partir de uma tabela em [REST API DOCS](https://app.supabase.com/project/hflbuhswxxfxbsuuvzbv/api?resource=users).

## Endpoints da API

-   Baixe o [Insomnia](https://insomnia.rest/download) para testar os endpoints da API.
-   Importe o arquivo `cerejeiros-endpoiints.json` para o Insomnia.
-   Nele abra as variáveis de ambiente e insira as chaves do Supabase.
-   Agora é só testar os endpoints.
