#1)
#Obtener una lista de películas por género. Realizar una consulta que devuelva todas las películas de un género específico. 
#Por ejemplo, mostrar todas las películas de género "Acción", "Terror" o "Suspenso".

select p.id as ID, p.titulo as Titulo from ingenias.pelicula p 
inner join ingenias.genero g on (p.id_genero = g.id)
where g.nombre like "Ciencia Ficcion";

#2)
#Obtener una lista de películas por tags. 
#Realizar una consulta que devuelva todas las películas con los tags "Aventura" y "Ciencia Ficción" o "Aventura" y "Fantasía".

select p.id as ID, p.titulo as Titulo from ingenias.pelicula p 
inner join ingenias.peliculatag pt on (p.id = pt.id_pelicula)
inner join ingenias.tag t on (pt.id_tag = t.id)
where pt.id_pelicula in (
select pt.id_pelicula from ingenias.Tag t
inner join ingenias.peliculatag pt on (t.id = pt.id_tag)
where t.nombre like "Aventura") and pt.id_pelicula in(
select pt.id_pelicula from ingenias.Tag
inner join ingenias.peliculatag pt on (t.id = pt.id_tag)
where t.nombre like "Ciencia Ficcion")

#3)
#Generar un informe donde se visualicen todos los títulos y categorías que en su resumen contengan la palabra "misión"

select p.id as ID, p.titulo as Titulo, c.nombre as Categoria from ingenias.pelicula p 
inner join ingenias.categoria c on (p.id_categoria = c.id)
where p.resumen like "%misión%";


#4
#Generar un informe donde se visualicen las series con al menos 3 temporadas.

select p.id as ID, p.titulo as Titulo, c.nombre as Categoria, p.temporadas as Temporadas from ingenias.pelicula p 
inner join ingenias.categoria c on (p.id_categoria = c.id)
where c.nombre like "Serie" and p.temporadas >= 3;


#5
#Encontrar cuántas películas/series trabajó el actor 'Chris Pratt'.
SELECT COUNT(pa.id_pelicula) as Cantidad 
FROM ingenias.peliculaactor pa
inner join ingenias.actor a on (pa.id_actor = a.id)
where a.nombre_apellido = "Chris Pratt";
#6
#Informar actrices/actores y sus trabajos fílmicos. Mostrar el nombre completo de actrices/actores, el título de sus trabajos fílmicos, la categoría y el género.
SELECT a.nombre_apellido as Actor, p.titulo as Titulo, c.nombre as Categoria, g.nombre as Genero
FROM ingenias.pelicula p 
inner join peliculaactor pa on (p.id = pa.id_pelicula)
inner join actor a on (pa.id_actor = a.id)
inner join categoria c on (p.id_categoria = c.id)
inner join genero g on (p.id_genero = g.id);

#7
#Ver solo la categoría "películas". Mostrar el título en mayúscula, el género (en mayúscula), los tags (separados por coma en la misma columna, usando concat o group_concat), duración y el enlace al trailer.
SELECT UPPER(p.titulo) as Titulo, UPPER(g.nombre) as Genero, GROUP_CONCAT(t.nombre) as Tags, p.duracion as Duracion, p.trailer as Trailer
FROM ingenias.pelicula p 
inner join genero g on (p.id_genero = g.id)
inner join peliculatag pt on (p.id = pt.id_pelicula)
inner join tag t on (pt.id_tag = t.id)
inner join categoria c on (p.id_categoria = c.id)
WHERE c.nombre = "Película"
GROUP BY p.id;




