# Grupo2-CursoBackEnd

Aca podemos ir documentando diferentes temas que nos parezcan importantes, tambien llevar un seguimiento de los ultimos updates hechos.


## Para bajar el proyecto de GitHub a mi compu

### Si tengo Windows

**1.** Voy a la carpeta donde quiero que este el proyecto, click derecho y selecciono "Git BASH here".

**2.** En Git BASH tiro el comando:

    clone https://github.com/correaagostina/Grupo2-CursoBackEnd.git

## Rama TEST
La idea es hacer el desarrollo en sus ramas y vayan haciendo commits ahí. 
Cuando su rama esta apta para pasar a test: 

**1.** Se paran en la rama test: 

    git checkout test

**2.** Hacen un *git pull*

**3.** Merge con la rama en la que estuvieron desarrollando: 

    git merge nombre_de_mi_rama

**4.** Push a la rama test: 

    git push origin test

**5.** Para seguir desarrollando (si necesitan), no se olviden de hacer: 
    
    git checkout nombre_de_mi_rama


## Para crear mi rama

**1.** Me paro en la rama main con:

    git checkout main

**2.** Por las dudas me fijo que mi proyecto este actualizado con el repo:

    git pull

**3.** Creo la rama con: 

    git branch nombre_de_la_rama

**4.** Puedo moverme a la rama que cree con:

    git checkout nombre_de_la_rama

**5.** Si quiero que la rama se vea en el repo:

    git push origin nombre_de_la_rama


## Actualizaciones
Aca podemos ir subiendo cambios que vayamos haciendo

* 3/8 Creación del repo

* 5/8 Creación del .gitignore y rama TEST
