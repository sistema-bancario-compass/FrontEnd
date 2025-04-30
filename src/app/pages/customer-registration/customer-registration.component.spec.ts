import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('CustomerRegistrationComponent', () => {
  let component: CustomerRegistrationComponent;
  let fixture: ComponentFixture<CustomerRegistrationComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CustomerRegistrationComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initializeDates', () => {
    it('should set maxDate to today and minDate to 100 years ago', () => {
      component.initializeDates();
      
      const today = new Date().toISOString().split('T')[0];
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      const expectedMinDate = minDate.toISOString().split('T')[0];

      expect(component.maxDate).toBe(today);
      expect(component.minDate).toBe(expectedMinDate);
    });
  });

  describe('goBack', () => {
    it('should navigate to home page', () => {
      component.goBack();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('handleInputChange', () => {
    it('should update formData when event is Event type', () => {
      const mockEvent = {
        target: {
          name: 'name',
          value: 'John Doe'
        }
      } as unknown as Event;

      component.handleInputChange(mockEvent);
      expect(component.formData.name).toBe('John Doe');
    });

    it('should update birthdate when event is string', () => {
      const mockDate = '2023-01-01';
      component.handleInputChange(mockDate);
      expect(component.formData.birthdate).toBe(mockDate);
    });
  });

  describe('validateForm', () => {
    it('should return false when required fields are empty', () => {
      component.formData = {
        id: '',
        name: '',
        email: '',
        birthdate: ''
      };
      
      expect(component.validateForm()).toBeFalse();
      expect(component.message.type).toBe('error');
      expect(component.message.text).toBe('All fields are required');
    });

    it('should return false when email is invalid', () => {
      component.formData = {
        id: '',
        name: 'John Doe',
        email: 'invalid-email',
        birthdate: '2023-01-01'
      };

      expect(component.validateForm()).toBeFalse();
      expect(component.message.type).toBe('error');
      expect(component.message.text).toBe('Please enter a valid email address');
    });

    it('should return true when all validations pass', () => {
      component.formData = {
        id: '',
        name: 'John Doe',
        email: 'john@example.com',
        birthdate: '2023-01-01'
      };

      expect(component.validateForm()).toBeTrue();
    });
  });

  describe('addCustomer', () => {
    it('should add new customer and show success message', () => {
      component.formData = {
        id: '',
        name: 'John Doe',
        email: 'john@example.com',
        birthdate: '2023-01-01'
      };

      component.addCustomer();

      expect(component.customers.length).toBe(1);
      expect(component.customers[0].id).toBe('C00001');
      expect(component.message.type).toBe('success');
    });
  });

  describe('updateCustomer', () => {
    it('should show error message when no customer is selected', () => {
      component.selectedCustomer = null;
      component.updateCustomer();

      expect(component.message.type).toBe('error');
      expect(component.message.text).toBe('No customer selected');
    });

    it('should update existing customer and show success message', () => {
      const existingCustomer = {
        id: 'C00001',
        name: 'John Doe',
        email: 'john@example.com',
        birthdate: '2023-01-01'
      };

      component.customers = [existingCustomer];
      component.selectedCustomer = existingCustomer;
      component.formData = {
        ...existingCustomer,
        name: 'Jane Doe'
      };

      component.updateCustomer();

      expect(component.customers[0].name).toBe('Jane Doe');
      expect(component.message.type).toBe('success');
    });
  });

  describe('showMessage', () => {
    it('should set message and clear after timeout', fakeAsync(() => {
      component.showMessage('Test message', 'success');
      
      expect(component.message.text).toBe('Test message');
      expect(component.message.type).toBe('success');

      tick(5000);

      expect(component.message.text).toBe('');
      expect(component.message.type).toBe('success');
    }));
  });

  describe('setActiveTab', () => {
    it('should set active tab and reset form', () => {
      component.formData = {
        id: 'C00001',
        name: 'John Doe',
        email: 'john@example.com',
        birthdate: '2023-01-01'
      };

      component.setActiveTab('update');

      expect(component.activeTab).toBe('update');
      expect(component.formData).toEqual({
        id: '',
        name: '',
        email: '',
        birthdate: ''
      });
    });
  });

  describe('handleCustomerSelect', () => {
    it('should select customer and update form data', () => {
      const customer = {
        id: 'C00001',
        name: 'John Doe',
        email: 'john@example.com',
        birthdate: '2023-01-01'
      };

      component.customers = [customer];
      
      const mockEvent = {
        target: { value: 'C00001' }
      };

      component.handleCustomerSelect(mockEvent);

      expect(component.selectedCustomer).toEqual(customer);
      expect(component.formData).toEqual(customer);
    });

    it('should reset form when no customer is selected', () => {
      const mockEvent = {
        target: { value: '' }
      };

      component.handleCustomerSelect(mockEvent);

      expect(component.selectedCustomer).toBeNull();
      expect(component.formData).toEqual({
        id: '',
        name: '',
        email: '',
        birthdate: ''
      });
    });
  });
});
