REST full API - CRUD Coupons

1. Заполнить .env файл в /coupon

2. Запустить командой "docker-compose up"

3. Зарегистрировать пользователя, получить JWT
    - http://localhost:8080/user/register
    - Поля {
        - name: string
        - password: string
    }

4. Создать купон
    - http://localhost:8080/coupon/ (POST)
    - Поля {
        - feedId: string
        - name: string
        - icon: File (Image)
    }

5. Изменить купон по id
    - http://localhost:8080/coupon/:id (PUT)
    - Поля {
        - feedId: string
        - name: string
        - icon: File (Image)
    }

6. Найти купон по id
    - http://localhost:8080/coupon/:id (GET)
    
7. Найти все купоны 
    - http://localhost:8080/coupon/ (GET)
