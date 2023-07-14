# Guia de Contribuição

Independente de sua área, o projeto abraange muitas escopos no desenvolvimento de Software.

Agradaçemos o interesse pela contribuição

Estão listados a seguir os principais:

- Áreas:
  - [Design](#design-imagens-vetorizadas)
  - [Front End](#front-end-integração-e-interface)
  - [Banco de Dados](#banco-de-dados-supabase)
- [Editores de Texto](#editores-de-texto)
- [Criação do Pull Request](#criação-de-pull-request)

## Design (Imagens Vetorizadas)

Utilizamos tanto o Figma, quanto o Inkscape para a criação de SVGs (imagens vetorizadas) para podermos exportar.

Na pasta [/assets/source/](/assets/source/) há os arquivos fonte de imagens, você pode editá-los, mantendo sempre o espirito do aplicativo.

Note que a paleta de cores pode ser estendida sem problemas.

Não tenha medo de fazer um [Pull Request](#criação-de-pull-request) adicionando suas alterações, nós vamos discutir juntos elas!

## Front End (Integração e Interface)

O projeto está em fase de desenvolvimento ativo em meta ao nosso primeiro release **v1.0.0**, sendo escrito primariamente em Typescript e React Native.

Para o desenvolvimento do aplicativo, estamos suportando além da biblioteca nativa, com componenetes nativos, o [React Native Paper](https://callstack.github.io/react-native-paper/) e o [React Native Elements](https://reactnativeelements.com/), que se assemelham muito aos design do próprio React Native.

Está previsto discussões para usarmos mais componentes nativos devido à alta costumização e controle que teríamos sobre eles.

Recomendemos que você dê uma lida no guia de UX e UI do Google [Material](https://m3.material.io/) para entender como os componentes estão sendo estilizados.

Não tenha medo de fazer um [Pull Request](#criação-de-pull-request) adicionando suas alterações, nós vamos discutir juntos elas!

## Banco de Dados (Supabase)

Se você possuir alguma sugestão, simplificação, ou otimização do banco de dados e tipos, discussa com nós criando um [Issue](https://github.com/cerejeiros/mobile/issues/new/) sobre tabelas e colunas do banco de dados.

# Editores de texto

Para o combo completo de desenvolvimento do aplicativo, estamos usando o [VS Code](https://code.visualstudio.com/) com as extensões do [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Mas qualquer editor pode ser usado, lembre-se apenas de verificar o ESLint e Prettier.

# Criação de Pull Request

Para começar, [crie um fork do projeto](https://github.com/cerejeiros/mobile/fork).

Em seu computador, usando [git](https://git-scm.com/), clone o seu repositório `git clone git@github.com:SEU_USUARIO/mobile`. Veja a [documentação completa aqui](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).

Quando você estiver pronto para discutir essas alterações, crie um [Pull Request](https://github.com/cerejeiros/mobile/pull/new) conectando seu fork com o nosso main. Faça em modo Draft se não tiver finalizado ainda.

Note que, por motivos de segurança, nenhum membro com direitos ao repositório pode dar commits diretos na main.

Note também que regras do ESlint e Prettier devem ser respeitadas, para manter consistência de estilo de código. Siga-as e cheque com `npm run lint` e `npm run check`, e automaticamente arrume-as com `npm run lint:fix` e `npm run format`, respectivamente para ESlint e Prettier.