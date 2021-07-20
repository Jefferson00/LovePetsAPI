instalar o docker

instalar a imagem do postgres
instalar a imagem do redis

clone

cria .env
cria ormconfig.json

run migrations

yarn dev

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN**

- O link enviado por email para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetá-la;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar suas informações (e-mail, nome, senha, phone);

**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a senha, o usuário deve informar a senha atual;
- Para atualizar a senha, o usuário precisa confirmar a nova senha;

# Listagem de anúncios

**RF**

- _O usuário deve poder ver os anúncios publicados num raio de até 100km da sua localidade atual_;
- _O usuario poderá alterar o raio de alcance dos anúncios_;
- _O usuário poderá filtrar os resultados pela espécie do pet_;
- _O usuário poderá filtrar os resultados pelo genêro do pet_; 
- _O usuário poderá ver o avatar, o nome, o contato e a cidade do usuário responsavel pelo anúnico_;
- _Listar Imagens do pet especifico_;
- O usuário poderá denunciar o anúncio;
- O usuário poderá salvar o anúncio como favorito;

**RNF**

**RN**
- Apenas anúncios válidos serão listados;
- O anúncio terá um prazo de validade de 60 dias;
- Para denunciar o usuário deverá estar logado; (?)
- Para salvar como favorito o usúario deverá estar logado;


# Cadastro de anúncios

**RF**
- _O usuário logado deve poder cadastrar um novo anúncio_;

**RNF**

**RN**
- _O usuário poderá definir um nome ou caso o pet não possua um nome ele poderá deixar em branco_;
- O anúncio poderá ter até 4 imagens;

# Atualizar os anúncios

**RF**
- _O usuário deve poder atualizar as informações do anúncio criado por ele_;
- _O usuário deve poder atualizar as images do anúncio_;
- _O usuário deve poder excluir uma ou mais imagens caso tenha mais de uma referenciada com o anúncio_;

**RNF**

**RN**
- _O usuário poderá atualizar um anúncio publicado por ele e estando logado_;

# Excluir os anúncios


**RF**
- _O usuário deve poder excluir o anúncio criado por ele_;

**RNF**

**RN**
- _O usuário poderá excluir um anúncio publicado por ele e estando logado_;
- _As imagens referentes ao anúncio deverão ser excluidas também_;