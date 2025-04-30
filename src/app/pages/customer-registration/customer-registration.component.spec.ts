import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { Router } from '@angular/router';

describe('CustomerRegistrationComponent', () => {
  let component: CustomerRegistrationComponent;
  let fixture: ComponentFixture<CustomerRegistrationComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomerRegistrationComponent,
        FormsModule,
      ]
    });

    fixture = TestBed.createComponent(CustomerRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.activeTab).toBe('new');
      expect(component.selectedCustomer).toBeNull();
      expect(component.message.text).toBe('');
      expect(component.message.type).toBe('success');
      expect(component.formData).toEqual({
        id: '',
        name: '',
        email: '',
        birthdate: ''
      });
    });

    it('should load customers on init', () => {
      component.ngOnInit();
      expect(component.customers).toBeDefined();
      expect(Array.isArray(component.customers)).toBeTruthy();
      expect(component.customers.length).toBeGreaterThan(0);
    });
  });

  describe('Form Handling', () => {
    it('should validate form correctly', () => {
      // Test empty form
      expect(component.validateForm()).toBeFalsy();
      expect(component.message.type).toBe('error');
      expect(component.message.text).toBe('All fields are required');

      // Test invalid email
      component.formData = {
        id: '',
        name: 'John Doe',
        email: 'invalid-email',
        birthdate: '1990-01-01'
      };
      expect(component.validateForm()).toBeFalsy();
      expect(component.message.text).toBe('Please enter a valid email address');

      // Test valid form
      component.formData = {
        id: '',
        name: 'John Doe',
        email: 'john@email.com',
        birthdate: '1990-01-01'
      };
      expect(component.validateForm()).toBeTruthy();
    });
  });

  describe('Customer Operations', () => {
    const mockCustomer = {
      id: 'C00001',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-01'
    };

    it('should handle customer selection', () => {
      component.customers = [mockCustomer];
      
      const mockEvent = {
        target: { value: 'C00001' }
      } as unknown as Event;

      component.handleCustomerSelect(mockEvent);
      expect(component.selectedCustomer).toEqual(mockCustomer);
      expect(component.formData).toEqual(mockCustomer);
    });

    it('should add new customer', () => {
      component.formData = { ...mockCustomer, id: '' };
      const initialLength = component.customers.length;
      
      component.addCustomer();
      
      expect(component.customers.length).toBe(initialLength + 1);
      expect(component.message.type).toBe('success');
      expect(component.message.text).toContain('Customer registered successfully');
    });

    it('should update existing customer', () => {
      component.customers = [mockCustomer];
      component.selectedCustomer = mockCustomer;
      component.formData = {
        ...mockCustomer,
        name: 'John Updated'
      };

      component.updateCustomer();
      
      expect(component.customers[0].name).toBe('John Updated');
      expect(component.message.type).toBe('success');
    });
  });

  describe('Navigation and UI', () => {
    it('should navigate back', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.goBack();
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('should switch tabs correctly', () => {
      component.setActiveTab('update');
      expect(component.activeTab).toBe('update');
      expect(component.selectedCustomer).toBeNull();

      component.setActiveTab('new');
      expect(component.activeTab).toBe('new');
    });

    it('should handle message display', () => {
      component.showMessage('Test message', 'success');
      expect(component.message.text).toBe('Test message');
      expect(component.message.type).toBe('success');

      component.clearMessage();
      expect(component.message.text).toBe('');
    });
  });
});
