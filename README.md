REST ful API - CRUD Coupons

1. Заполнить .env файл в /coupon

2. Запустить командой "docker-compose up"

3. swagger документация находится по адресу http://localhost:3000/docs

4. Зарегистрировать пользователя, получить JWT (
    При запросе к купонам необходимо вложить JWT в Header->Authorization->"Bearer JWT". 
    В swagger в поле авторизации записать "Bearer JWT")
    - http://localhost:8080/auth/auth0/login (auth0)
    - http://localhost:8080/auth/register (default)
    - Поля {
        - email: string
        - name: string
        - password: string
    }

5. Создать купон
    - http://localhost:3000/coupon/ (POST)
    - Поля {
        - feedId: string
        - name: string
        - icon: File (Image)
    }

6. Изменить купон по id
    - http://localhost:3000/coupon/:id (PUT)
    - Поля {
        - feedId: string
        - name: string
        - icon: File (Image)
    }

7. Найти купон по id
    - http://localhost:3000/coupon/:id (GET)
    
8. Найти все купоны 
    - http://localhost:3000/coupon/ (GET)

9. Логи ошибок попадают в app/log/app.log 