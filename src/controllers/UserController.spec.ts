import { UserController } from './UserController';
import { UserService } from '../services/UserService';
import { Request, Response } from 'express';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';

describe('UserController', () => {
    let userService: UserService;
    let userController: UserController;
    let mockRequest: Partial<Request>;
    let mockResponse: ReturnType<typeof makeMockResponse>;

    beforeEach(() => {
        userService = new UserService();
        userController = new UserController(userService);
        mockRequest = {};
        mockResponse = makeMockResponse();
    });

    it('should return a 400 error if the name is not provided', () => {
        mockRequest.body = {};
        userController.createUser(mockRequest as Request, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad request! Name obrigatório',
        });
    });

    it('should return a 400 error if the email is not provided', () => {
        mockRequest.body = { name: 'Test User' };
        userController.createUser(mockRequest as Request, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad request! Email obrigatório',
        });
    });

    it('should create a new user and return a 201 status code', () => {
        mockRequest.body = {
            name: 'Nath',
            email: 'nath@test.com',
        };
        userController.createUser(mockRequest as Request, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Usuário criado',
        });
    });

    it('should call the getAllUsers method and return all users', () => {
        const users = [{ name: 'Test User', email: 'test@example.com' }];
        jest.spyOn(userService, 'getAllUsers').mockReturnValue(users);
        userController.getAllUsers(mockRequest as Request, mockResponse);
        expect(userService.getAllUsers).toHaveBeenCalled();
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toEqual(users);
    });

    it('should delete a user and return a 200 status code', () => {
        mockRequest.body = { id: 0 };
        userController.deleteUser(mockRequest as Request, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Usuário deletado',
        });
    });
});