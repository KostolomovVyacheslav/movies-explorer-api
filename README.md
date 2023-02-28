# Бэкенд Дипломного проекта Movies Explorer API
### *Учебный проект от [Яндекс.Практикум](https://practicum.yandex.ru/web/)*

### Описание проекта
Репозиторий для бэкенда дипломной работы Movies Explorer, со следующими возможностями: авторизация и регистрация пользователей, операции с фильмами и пользователями.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе;
  - PATCH /users/me — обновляет информацию о пользователе.

- Роуты для фильмов:
  - GET /movies — возвращает все фильмы из базы;
  - POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
  - DELETE /movies/:movieId — удаляет фильм по _id.

## Директории
* `/controllers` – содержит файлы описания моделей пользователя и фильма;
* `/models` – содержит файлы описания схем пользователя и фильма;
* `/routes` — содержит описание основных роутов для пользователя и фильма;
* `/errors` – содержит описание ошибок.

# Ссылки:
* IP: 51.250.6.95 - Публичный IP-адрес
* Backend: (http://api.vyacheslav-kostolomov.nomoredomains.work/)

* [Репозиторий проекта](https://github.com/KostolomovVyacheslav/movies-explorer-api/tree/level-1)
