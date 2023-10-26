# Base de Datos "Trailerflix"

<h2>Repositorio:</h2>

https://github.com/correaagostina/Grupo2-CursoBackEnd/tree/test/Entrega%203

<h2>Descripción</h2>

El proyecto es una base de datos que contiene información sobre: Peliculas y Series de las cuales podemos obtener INFORMACIÓN general y/o especifica, al ejecutar las diferentes consultas que se diseñaron.


<h2>Diagrama de Base de Datos SQL</h2>


![diagrama](https://github.com/correaagostina/Grupo2-CursoBackEnd/assets/117048842/3935f6ef-54c9-4e8a-be3d-7c882524b3d5)


El diagrama muestra las conexiones que hay entre las diferentes tablas que se usaron para el proyecto.

<li>
  La tabla pelicula tiene una relacion Many-to-Many con las tablas peliculatag y peliculaactor.
</li>
<li>
  La tabla categoria tiene una relacion One-to-One con la tabla pelicula.
</li>
<li>
  La tabla genero tiene una relacion One-to-One con la tabla pelicula.
</li>
<li>
  La tabla actor tiene una relacion Many-to-One con la tabla peliculas.
</li>
<li>
  Las tablas peliculatag y peliculaactor tienen una relacion Many-to-Many con las tablas tag y actor respectivamente.
</li>


# Consulta de ejemplo

<h4> 3. Generar un informe donde se visualicen todos los títulos y categorías que en su resumen contengan la palabra "misión" </h4>

```ruby

select p.id as ID, p.titulo as Titulo, c.nombre as Categoria
from ingenias.pelicula p 
inner join ingenias.categoria c on (p.id_categoria = c.id)
where p.resumen like "%misión%";

```

<h2>Integrantes:</h2>

<li> Agostina Correa</li>
<li> Alejandra Lopez</li>
<li> Micaela Marfil</li>
<li> Jesica Gutierrez</li>

<h2>PD:</h2>
<h4>♥ Gracias por los conocimientos brindados y la paciencia al enseñar ♥</h4>

Grupo 2 - Ingenias 2023.
