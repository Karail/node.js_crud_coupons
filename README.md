REST full API - CRUD Coupons

1. Заполнить .env файл в /coupon

2. Запустить командой "docker-compose up"

3. Зарегистрировать пользователя, получить JWT (При запросе к купонам необходимо вложить JWT в Header->Authorization->"Bearer JWT")
    - http://localhost:8080/auth/register
    - Поля {
        - email: string
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
