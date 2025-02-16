import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Create a mock AuthService
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken']);
    authServiceSpy.getAccessToken.and.returnValue('mock-access-token'); // Mock token

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, // Provide the mock service
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should add an Authorization header if not an auth request', () => {
    // Trigger an HTTP GET request
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-access-token');
    req.flush({}); // Respond with mock data
  });

  it('should not add an Authorization header for auth requests', () => {
    // Trigger an HTTP GET request to an auth endpoint
    httpClient.get('/api/auth/login').subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({}); // Respond with mock data
  });
});
