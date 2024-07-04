import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';
  let adminToken = '';

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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.only('POST /auth/signup should create a user without admin role', async () => {
    console.log('step 1')
    const req = 
      await request(app.getHttpServer())
      .post('/auth/signup').send(userDemo)
      .expect(201)
  
    console.log(req.body)
    expect(req.body).toBeDefined();
  });

  it.only('POST /auth/signup should create a user with admin role', async () => {
    console.log('step 2')
    const req = 
      await request(app.getHttpServer())
      .post('/auth/signup').send(adminUserDemo)
      .expect(201)
  
    //expect(200)
    console.log(req.body)
    expect(req.body).toBeDefined();
  });

  it.only('POST /auth/signin should return token for user without admin role', async () => {
    console.log('step 3')
    const req = 
      await request(app.getHttpServer())
      .post('/auth/signin').send(
        {
          email: userDemo.email,
          password: userDemo.password
        }
      )
      //.expect(201)
  
    console.log(req.body)
    token = req.body.token
    expect(req.body).toBeDefined();
    expect(req.body.token).toBeDefined();
  });

  it.only('POST /auth/signin should return token for user with admin role', async () => {
    console.log('step 4')
    const req = 
      await request(app.getHttpServer())
      .post('/auth/signin').send(
        {
          email: adminUserDemo.email,
          password: adminUserDemo.password
        }
      )
      //.expect(201)
  
    //expect(200)
    console.log(req.body)
    adminToken = req.body.token
    expect(req.body).toBeDefined();
    expect(req.body.token).toBeDefined();
  });

  it.only('Get /users should return forbiden message for unauthorized user', async () => {
    console.log('step 5')
    return await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .then(res => {
        expect(res.body.message).toEqual('User does not have permission to access this route')
      })
  });

  it.only('Get /users should return users', async () => {
    return await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(200)
    .then(res => {
      console.log(res.body)
      //expect(res.body.message).toEqual('User does not have permission to access this route')
    })
  });

});
