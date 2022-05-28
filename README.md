# NASA Agregator

Projet réalisé par MARETTE Gauthier et CLAIRET Damien. Master I2L 2022.

Ce projet exploite les API publiques de la NASA ainsi que des API internes permettant de publier des articles ainsi que de gérer les commentaires postés sur le site (système de validation).

Le projet remonte les articles publiés par la NASA ainsi que nos propres articles.

Lorsqu'un commentaire est envoyé, il est dans un premier temps soumis dans l'interface d'administration afin d'être validé pour publication ou supprimé.

## Requirements
```
docker
```

## Pour lancer le projet

```bash
# Cloner le repo
git clone git@github.com:hisakiyo/nasa-agregator.git

# Se déplacer dans le répertoire
cd nasa-agregator

# Build l'image docker
sudo docker build -t nasa-agregator .

# Lancer l'image docker
docker run nasa-agregator
```
