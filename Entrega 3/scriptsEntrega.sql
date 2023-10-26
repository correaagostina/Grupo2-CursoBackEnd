#1
#Obtener una lista de películas por género. Realizar una consulta que devuelva todas las películas de un género específico. 
#Por ejemplo, mostrar todas las películas de género "Acción", "Terror" o "Suspenso".

select p.id as ID, p.titulo as Titulo from ingenias.pelicula p 
inner join ingenias.genero g on (p.id_genero = g.id)
where g.nombre like "Ciencia Ficcion";

#2
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

#3
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
inner join ingenias.peliculaactor pa on (p.id = pa.id_pelicula)
inner join ingenias.actor a on (pa.id_actor = a.id)
inner join ingenias.categoria c on (p.id_categoria = c.id)
inner join ingenias.genero g on (p.id_genero = g.id);

#7
#Ver solo la categoría "películas". 
#Mostrar el título en mayúscula, el género (en mayúscula), los tags (separados por coma en la misma columna, usando concat o group_concat), duración y el enlace al trailer.
SELECT UPPER(p.titulo) as Titulo, UPPER(g.nombre) as Genero, GROUP_CONCAT(t.nombre) as Tags, p.duracion as Duracion, p.trailer as Trailer
FROM ingenias.pelicula p 
inner join ingenias.genero g on (p.id_genero = g.id)
inner join ingenias.peliculatag pt on (p.id = pt.id_pelicula)
inner join ingenias.tag t on (pt.id_tag = t.id)
inner join ingenias.categoria c on (p.id_categoria = c.id)
WHERE c.nombre = "Película"
GROUP BY p.id;

#8
#Ver solo la categoría "series". 
#Mostrar el título en mayúscula, el género (en mayúscula), los tags (separados por coma en la misma columna, usando concat o group_concat), la cantidad de temporadas, el enlace al trailer y el resumen.

SELECT UPPER(p.titulo) as Titulo, UPPER(g.nombre) as Genero, GROUP_CONCAT(t.nombre) as Tags, p.temporadas as Temporadas, p.trailer as Trailer, p.resumen as Resumen
FROM ingenias.pelicula p 
inner join ingenias.genero g on (p.id_genero = g.id)
inner join ingenias.peliculatag pt on (p.id = pt.id_pelicula)
inner join ingenias.tag t on (pt.id_tag = t.id)
inner join ingenias.categoria c on (p.id_categoria = c.id)
WHERE c.nombre = "Serie"
GROUP BY p.id;

#9
#Identificar la película/serie con más actores y la que posee menos actores (indicar la cantidad de actores en ambos casos).

SELECT res.cantidad AS Maximo, p.titulo as Titulo
FROM (
    select COUNT(*) as cantidad, pa.id_pelicula as id
    from ingenias.peliculaactor pa
    group by (pa.id_pelicula)
    order by cantidad desc
    limit 1
) res
join ingenias.pelicula p on (res.id = p.id);

#10
#Contar la cantidad total de películas registradas.
select count(p.id_categoria) from ingenias.pelicula p
inner join ingenias.categoria c on (p.id_categoria = c.id)
where nombre = 'pelicula';


#11
#Contar la cantidad total de series registradas.
select count(p.id_categoria) from ingenias.pelicula p
inner join ingenias.categoria c on (p.id_categoria = c.id)
where nombre = 'Serie';


#12
#Obtener una lista de series en orden descendente basado en la cantidad de temporadas.
SELECT titulo as Series, temporadas as Temporada FROM ingenias.pelicula p 
inner join ingenias.categoria c on (p.id_categoria = c.id)
where nombre = 'Serie'
order by temporadas desc;

#13
#Agregar el campo "Fecha de lanzamiento" a la tabla de trabajos fílmicos como tipo Date y realizar la actualización con las fechas de películas/series del género "Aventura".

alter table ingenias.pelicula
add fechaLanzamiento date;

UPDATE ingenias.pelicula p
SET
p.fechaLanzamiento = DATE_FORMAT(NOW(),'%Y%m%d')
WHERE p.id_genero in (select g.id from ingenias.genero g
					where g.nombre like "Aventura");

#14
#Buscar películas por palabra clave. 
#Realizar una consulta que permita a los usuarios buscar películas utilizando palabras clave en el título o la descripción (por ejemplo, palabras clave como "Aventura", "madre" o "Ambientada").

select p.titulo as Titulo, p.resumen from pelicula p
inner join categoria c on(p.id_categoria = c.id)
where c.nombre like "Pelicula" and ((p.resumen like "%aventura%") or (p.resumen like "%madre%") or (p.resumen like "%Ambientada%"));

#15
#Sumar la tabla "Ranking" que incluye el ID de la película/serie, calificación y comentarios. Utilizar operaciones SQL como joins, unions, concat, count, group by, etc.

CREATE TABLE ingenias.ranking (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pelicula` INT NOT NULL,
  `calificacion` INT NULL,
  `comentarios` VARCHAR(45) NULL,
  CONSTRAINT `fk_id_pelicula`
    FOREIGN KEY (`id_pelicula`)
    REFERENCES `ingenias`.`pelicula` (`id`)
);

insert into ingenias.ranking (id_pelicula, calificacion, comentarios)
values (3, 10, "Excelente");

insert into ingenias.ranking (id_pelicula, calificacion, comentarios)
values (3, 7, "Buena");

insert into ingenias.ranking (id_pelicula, calificacion, comentarios)
values (6, 10, "Excelente");

insert into ingenias.ranking (id_pelicula, calificacion, comentarios)
values (6, 4, "Regular");

insert into ingenias.ranking (id_pelicula, calificacion, comentarios)
values (10, 2, "Mala");


## Muestra los comentarios por pelicula/serie    
select p.titulo as Titulo, group_concat(r.comentarios) as Comentarios from ingenias.pelicula p
inner join ingenias.ranking r on (p.id = r.id_pelicula)
group by (p.id);

##Cuenta cantidas de comentarios por pelicula/serie
select p.titulo as Titulo, count(*) from ingenias.pelicula p
inner join ingenias.ranking r on (p.id = r.id_pelicula)
group by (p.id);

##Muestra peliculas/series que tienen calificacion menor a 5 e igual a 10
select p.titulo as Titulo, r.calificacion as Calificacion from ingenias.pelicula p
inner join ingenias.ranking r on (p.id = r.id_pelicula)
where r.calificacion <5
union
select p.titulo as Titulo, r.calificacion as Calificacion from ingenias.pelicula p
inner join ingenias.ranking r on (p.id = r.id_pelicula)
where r.calificacion =10;

##Muestra series sin calificacion
select p.id, p.titulo as Titulo from ingenias.pelicula p
where p.id not in (select pel.id from ingenias.pelicula pel
inner join ingenias.ranking r on (p.id = r.id_pelicula));




