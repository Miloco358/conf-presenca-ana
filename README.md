1) Criar o projeto localmente

- Instale Node.js (versão LTS recomendada).
- No terminal, rode:
  npm install
  npm run dev

2) Criar projeto no Firebase

- Acesse console.firebase.google.com e crie um novo projeto.
- No projeto, clique em "Firestore Database" e crie um banco em modo de teste (ou regras restritas conforme desejar).
- Em "Configurações do projeto" > "SDK do Firebase" adicione um aplicativo web e copie as credenciais.
- Substitua os valores em src/firebase.js pelos valores do seu projeto.

3) Regras mínimas para testes (Firestore -> Regras)

Se estiver em modo de teste, o console pode oferecer regras temporárias. Para produção, restrinja o acesso.

4) Deploy no Vercel

- Crie uma conta em vercel.com e conecte ao seu repositório (GitHub/GitLab/Bitbucket).
- Configure build command: npm run build e output directory: dist
- Adicione variáveis de ambiente se preferir manter as chaves fora do código. Caso contrário, o exemplo de src/firebase.js já funciona para testes.

5) Deploy no Firebase Hosting

- Instale Firebase CLI: npm install -g firebase-tools
- firebase login
- firebase init hosting (escolha o projeto criado, publique a pasta `dist` e configure como SPA para que redirecione a /admin)
- npm run build
- firebase deploy --only hosting

Observações
- A senha da área administrativa está embutida em src/Admin.jsx na constante ADMIN_PASSWORD. Mude para algo seguro antes de publicar.
- Para manter segredo das credenciais, guarde as variáveis em variáveis de ambiente no Vercel ou em arquivos .env para processo de build.