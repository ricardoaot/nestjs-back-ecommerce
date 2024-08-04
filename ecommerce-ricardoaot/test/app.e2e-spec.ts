import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { testDataSource } from '../src/config/typeorm-test';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';
  let adminToken = '';
  let datasource: DataSource;
  let idOrder = '';

  let productData = [
    {
      "id": "7d0f4f16-a5b2-40c6-b677-f22574c020c4",
      "name": "Product 1",
    },
    {
      "id": "8d0f4f16-a5b2-40c6-b677-f22574c020c2",
      "name": "Product 2",
    }
  ];

  let userDemo = { 
    email: "user6@gmail.com",
    name: "User 4",
    password: "Claudia@1234",
    address: "Calle 4",
    phone: "4123456789",
    city: "Lima",
    country: "Peru",
  }

  let adminUserDemo = { 
    email: "user7@gmail.com",
    name: "User 4",
    password: "Claudia@1234",
    address: "Calle 4",
    phone: "4123456789",
    city: "Lima",
    country: "Peru",
    isAdmin: true
  }

  // DROP SCHEMA MUST BE SET FALSE
  
  beforeAll(async () => {
    //Before execution of it blocks in describe suite
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //datasource = app.get(DataSource);
    datasource = testDataSource;
    await datasource.initialize();

    //await datasource.initialize();
    //await datasource.query(`DELETE FROM users;`)
  });

  beforeAll(async () => {
    //Before execution of describe blocks
  })
  afterAll(async () => {
    await datasource.query(`DELETE FROM orders;`)
    await datasource.query(`DELETE FROM users;`)
    await datasource.query(`DELETE FROM order_details_products_products;`)
    await datasource.query(`DELETE FROM products;`)
    await datasource.query(`DELETE FROM categories;`)
    await datasource.query(`DELETE FROM "orderDetails";`)

/*
    await datasource.destroy();
    datasource = app.get(DataSource);
    await datasource.initialize();
*/
    await app.close();
  })

  // Auth routes
  it('POST /auth/signup should create a user without admin role', async () => {
    return await request(app.getHttpServer())
      .post('/auth/signup').send(userDemo)
      //.expect(201)
      .then(res => {
        console.log(res.status, res.body)
        userDemo['id'] = res.body.signUpResult.id
        console.log(userDemo)
        expect(res.status).toEqual(201)
        expect(res.body).toBeDefined();
      })
  
  });

  it(
    'POST /auth/signup should create a user with admin role', 
    async () => {
      return await request(app.getHttpServer())
        .post('/auth/signup').send(adminUserDemo)
        .expect(201)
        .then(res => {
          console.log(res.status, res.body)
          expect(res.status).toEqual(201)
          expect(res.body).toBeDefined();
        })  
    }
  );

  it('POST /auth/signin should return token for user without admin role', async () => {
    console.log({"userDemo": userDemo}, userDemo.email, userDemo.password)
    return await request(app.getHttpServer())
      .post('/auth/signin').send(
        {
          email: userDemo.email,
          password: userDemo.password
        }
      )
      .then(res => {
        console.log(res.status, res.body)
        token = res.body.token
        expect(res.status).toEqual(201)
        expect(res.body).toBeDefined();
        expect(res.body.token).toBeDefined();
      })

  });

  it('POST /auth/signin should return token for user with admin role', async () => {
    const req = 
      await request(app.getHttpServer())
      .post('/auth/signin').send(
        {
          email: adminUserDemo.email,
          password: adminUserDemo.password
        }
      )
      //.expect(201)
      .then(res => {
        console.log(res.status, res.body)
        adminToken = res.body.token
        expect(res.status).toEqual(201)
        expect(res.body).toBeDefined();
        expect(res.body.token).toBeDefined();
      })
  });

  // User routes
  it('Get /users should return forbiden message for unauthorized user', async () => {
    return await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .then(res => {
        expect(res.body.message).toEqual('User does not have permission to access this route')
      })
  });

  it('Get /users should return users', async () => {
    return await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${adminToken}`)
    .then(res => {
      console.log(res.status, res.body)
      expect(res.status).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      //expect(res.body.message).toEqual('User does not have permission to access this route')
    })
  });


  // Category seeder 
  it('Post /categories/seeder should seed categories', async () => {
    return await request(app.getHttpServer())
    .post('/categories/seeder')
    .then(res => {
      console.log(res.status, res.body)
      expect(res.status).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
    })
  })

  // Product seeder 
  it('Post /products/seeder should seed products', async () => {
    return await request(app.getHttpServer())
    .post('/products/seeder')
    .then(res => {
      console.log(res.status, res.body)
      expect(res.status).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
    })
  })

  // Category routes 
  it('Get /categories should return categories', async () => {
    return await request(app.getHttpServer())
    .get('/categories')
    .then(res => {
      console.log(res.status, res.body)
      expect(res.status).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
    })
  })

  // Product routes 
  it('Get /products should return products', async () => {
    return await request(app.getHttpServer())
    .get('/products')
    .then(res => {
      console.log(res.status, res.body)
      productData = res.body
      expect(res.status).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
    })
  })


  // Order routes
  it('Post /orders should create an order', async () => {
    console.log(userDemo['id'])
    console.log(productData)
    return await request(app.getHttpServer())
    .post('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "userId": userDemo['id'],
      "products":  [
        productData[0]['id'],
        productData[1]['id']
      ]
    })
    .then(res => {
      console.log(res.status, res.body)
      idOrder = res.body.id
      expect(res.status).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
    })
  })

  it('Get /orders should return orders', async () => {
    return await request(app.getHttpServer())
    .get(`/orders/${idOrder}`)
    .set('Authorization', `Bearer ${adminToken}`)
    .then(res => {
      console.log(res.status, res.body)
      expect(res.status).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
    })
  })

});
