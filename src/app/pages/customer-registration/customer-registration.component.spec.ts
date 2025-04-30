import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { Router } from '@angular/router';

describe('CustomerRegistrationComponent', () => {
  let component: CustomerRegistrationComponent;
  let fixture: ComponentFixture<CustomerRegistrationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerRegistrationComponent,
        RouterTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.activeTab).toBe('new');
    expect(component.customers).toEqual([]);
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

  it('should handle input changes correctly', () => {
    // Test event from input element
    const mockInputEvent = {
      target: {
        name: 'name',
        value: 'John Doe'
      }
    };
    component.handleInputChange(mockInputEvent);
    expect(component.formData.name).toBe('John Doe');

    // Test direct date value
    const mockDateValue = '1990-01-01';
    component.handleInputChange(mockDateValue);
    expect(component.formData.birthdate).toBe(mockDateValue);
  });

  it('should prevent form submission with invalid data', () => {
    const mockEvent = new Event('submit');
    spyOn(mockEvent, 'preventDefault');
    
    component.handleSubmit(mockEvent);
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.message.type).toBe('error');
    expect(component.message.text).toBe('All fields are required');
  });

  it('should load customers on init', () => {
    component.ngOnInit();
    expect(component.customers).toBeDefined();
    expect(Array.isArray(component.customers)).toBeTruthy();
  });

  it('should handle date constraints correctly', () => {
    component.initializeDates();
    
    const today = new Date().toISOString().split('T')[0];
    expect(component.maxDate).toBe(today);
    
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
    expect(component.minDate).toBe(hundredYearsAgo.toISOString().split('T')[0]);
  });

  it('should switch tabs correctly', () => {
    component.setActiveTab('update');
    expect(component.activeTab).toBe('update');
    expect(component.selectedCustomer).toBeNull();
    expect(component.formData).toEqual({
      id: '',
      name: '',
      email: '',
      birthdate: ''
    });

    component.setActiveTab('new');
    expect(component.activeTab).toBe('new');
  });

  it('should validate form correctly', () => {
    // Test empty form
    component.formData = {
      id: '',
      name: '',
      email: '',
      birthdate: ''
    };
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
    expect(component.message.type).toBe('error');
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

  it('should handle customer selection', () => {
    const mockCustomer = {
      id: 'C00001',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-01'
    };

    component.customers = [mockCustomer];
    
    const mockEvent = {
      target: { value: 'C00001' }
    };

    component.handleCustomerSelect(mockEvent);
    expect(component.selectedCustomer).toEqual(mockCustomer);
    expect(component.formData).toEqual(mockCustomer);

    // Test selection of non-existent customer
    const mockEventInvalid = {
      target: { value: '' }
    };
    component.handleCustomerSelect(mockEventInvalid);
    expect(component.selectedCustomer).toBeNull();
    expect(component.formData).toEqual({
      id: '',
      name: '',
      email: '',
      birthdate: ''
    });
  });

  it('should add new customer', () => {
    component.formData = {
      id: '',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-01'
    };

    component.addCustomer();
    
    expect(component.customers.length).toBe(1);
    expect(component.customers[0].id).toBe('C00001');
    expect(component.customers[0].name).toBe('John Doe');
    expect(component.message.type).toBe('success');
    expect(component.message.text).toContain('Customer registered successfully');
    
    // Verify form reset after adding
    expect(component.formData).toEqual({
      id: '',
      name: '',
      email: '',
      birthdate: ''
    });
  });

  it('should update existing customer', () => {
    const mockCustomer = {
      id: 'C00001',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-01'
    };

    component.customers = [mockCustomer];
    component.selectedCustomer = mockCustomer;
    component.formData = {
      ...mockCustomer,
      name: 'John Updated'
    };

    component.updateCustomer();
    
    expect(component.customers[0].name).toBe('John Updated');
    expect(component.message.type).toBe('success');
    expect(component.message.text).toBe('Customer updated successfully');

    // Test update without selected customer
    component.selectedCustomer = null;
    component.updateCustomer();
    expect(component.message.type).toBe('error');
    expect(component.message.text).toBe('No customer selected');
  });

  it('should reset form correctly', () => {
    component.formData = {
      id: 'C00001',
      name: 'John Doe',
      email: 'john@email.com',
      birthdate: '1990-01-01'
    };
    component.selectedCustomer = { ...component.formData };
    
    component.resetForm();
    
    expect(component.formData).toEqual({
      id: '',
      name: '',
      email: '',
      birthdate: ''
    });
    expect(component.selectedCustomer).toBeNull();
  });

  it('should navigate back', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle message display', () => {
    component.showMessage('Test error', 'error');
    expect(component.message.text).toBe('Test error');
    expect(component.message.type).toBe('error');

    component.clearMessage();
    expect(component.message.text).toBe('');
    expect(component.message.type).toBe('success');
  });
});
