# Listado de Endpoints

<br>

[POST] /users/login: endpoint abierto, para iniciar sesión

<br>

[POST] /users/register: endpoint abierto, para crear un usuario

<br>

[PUT] /users/:idUser : para actualizar el perfil del usuario (sólo el mismo usuario logeado)

<br>

[DELETE] /users/:idUser: para borrar un perfil de usuário (sólo el mismo usuario logeado)

<br>

[GET] /artworks: lista de todas las obras de arte de la base de datos

<br>

[POST] /artworks: para crear una nueva obra de arte (sólo usuários Artistas)

<br>

[PUT] /artworks/:idArtwork : para actualizar una obra de arte (sólo usuários Artistas y obras que tengan su ID relacionado)

<br>

[DELETE] /artworks/:idArtwork : para borrar una obra de arte (sólo usuários Artistas y obras que tengan su ID relacionado)
