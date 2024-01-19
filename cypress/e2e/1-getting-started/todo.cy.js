describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should display the registration form', () => {
    cy.get('h2').should('contain', 'Registration Form');
  });

  it('should register a new user successfully', () => {
    cy.get('#full_name').type('shahid');
    cy.get('#email').type('shahid@gmail.com');
    cy.get('#password').type('shah.123');
    cy.get('#address').type('peshawar');
    cy.get('form').submit();
    cy.url().should('include', '/login');
    cy.get('.notification-success').should('contain', 'User shahid@gmail.com has been successfully registered');
  });

  it('should display an error for incomplete form submission', () => {
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Please fill out all the fields.');
  });

  it('should display an error for invalid email format', () => {
    cy.get('#full_name').type('shahid');
    cy.get('#email').type('shahid.gmail');
    cy.get('#password').type('shah.123');
    cy.get('#address').type('peshawar');
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Invalid email format');
  });

  it('should display an error for server-side registration failure', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/user/register',
      status: 500,
      response: {},
    }).as('registerRequest');

    cy.get('#full_name').type('shahid');
    cy.get('#email').type('shahid@gmail.com');
    cy.get('#password').type('shah.123');
    cy.get('#address').type('peshawar');
    cy.get('form').submit();
    cy.wait('@registerRequest');
    cy.get('.notification-error').should('contain', 'Internal server error');
  });

  it('should navigate to login page when clicking on the submit button', () => {
    cy.get('#full_name').type('shahid');
    cy.get('#email').type('shahid@gmail.com');
    cy.get('#password').type('shah.123');
    cy.get('#address').type('peshawar');
    cy.get('form').submit();
    cy.url().should('include', '/login');
  });
});


// Login Form
describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001'); 
  });

  it('should display the login form', () => {
    cy.get('h2').should('contain', 'Login Form');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('#email').type('shahid@gmail.com');
    cy.get('#password').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/home');
    cy.get('.notification-success').should('contain', 'User has been successfully logged in');
  });

  it('should display an error for empty email and password fields', () => {
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Please fill out all the fields.');
  });

  it('should display an error for invalid email format', () => {
    cy.get('#email').type('shahid.gmail');
    cy.get('#password').type("shah.123");
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Invalid email format');
  });

  it('should display an error for incorrect login credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/user/login',
      status: 401,
      response: {},
    }).as('loginRequest');

    cy.get('#email').type('shahid@gmail.com');
    cy.get('#password').type('wrongpassword');
    cy.get('form').submit();
    cy.wait('@loginRequest');
    cy.get('.notification-error').should('contain', 'Invalid email or password');
  });

  it('should navigate to the home page when clicking on the submit button', () => {
    cy.get('#email').type(shahid@gmail.com');
    cy.get('#password').type('shah.123');
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });
});



Add Books data

describe('AddBook Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001'); 
  });

  it('should display the AddBook form', () => {
    cy.get('h2').should('contain', 'Add Book');
  });

  it('should add a new book successfully with valid details', () => {
    cy.get('#full_name').type('Sample Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A sample book description.');
    cy.get('#image_url').type('https://book1.com/book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.get('.notification-success').should('contain', 'Book Sample Book has been successfully added');
  });

  it('should display an error for incomplete form submission', () => {
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Please fill out all the fields.');
  });

  it('should display an error for invalid price format', () => {
    cy.get('#full_name').type('Invalid Price Book');
    cy.get('#price').type('invalidprice');
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Invalid price format');
  });

  it('should display an error for server-side book addition failure', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/books',
      status: 500,
      response: {},
    }).as('addBookRequest');

    cy.get('#full_name').type('Server Error Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book causing a server error.');
    cy.get('#image_url').type('https://book1.com/error-book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.wait('@addBookRequest');
    cy.get('.notification-error').should('contain', 'Internal server error');
  });

  it('should clear the form after successful book addition', () => {
    cy.get('#full_name').type('Clear Form Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book to test form clearing.');
    cy.get('#image_url').type('https://book1.com/clear-form-book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.get('#full_name').should('have.value', '');
    cy.get('#author').should('have.value', '');
    // Continue for other form fields
  });

  it('should navigate to a book details page after successful addition', () => {
    cy.get('#full_name').type('Details Page Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book to test navigation.');
    cy.get('#image_url').type('https://example.com/details-page-book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.url().should('include', '/book-details/');
  });

  it('should display an error for invalid image URL', () => {
    cy.get('#full_name').type('Invalid Image Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book with an invalid image URL.');
    cy.get('#image_url').type('invalid-image-url');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Invalid image URL');
  });

  it('should display an error for empty book title', () => {
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book with an empty title.');
    cy.get('#image_url').type('https://example.com/empty-title-book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.get('.notification-error').should('contain', 'Book title is required');
  });

  it('should navigate to the home page when clicking on the submit button', () => {
    cy.get('#full_name').type('Home Page Book');
    cy.get('#author').type('shahid');
    cy.get('#price').type('20.99');
    cy.get('#description').type('A book to test navigation to home page.');
    cy.get('#image_url').type('https://example.com/home-page-book-image.jpg');
    cy.get('#edition').type('First Edition');
    cy.get('#published_year').type('2022');
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });
});


// Search for Book
describe('SearchBook Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:your_port'); 
  });

  it('should display the search input field', () => {
    cy.get('label').should('contain', 'Search Book');
    cy.get('input').should('have.attr', 'placeholder', 'Enter book title or author');
  });

  it('should display "No matching result found" initially', () => {
    cy.get('p').should('contain', 'No matching result found');
  });

  it('should perform a search and display search results', () => {
    cy.intercept('GET', 'http://localhost:3001/api/books*', { fixture: 'search-results.json' }).as('searchResults');
    cy.get('input').type('Sample Book');
    cy.get('form').submit();
    cy.wait('@searchResults');
    cy.get('p').should('not.contain', 'No matching result found');
    cy.get('td').should('contain', 'Sample Book');
    // Continue asserting other details in the result table
  });

  it('should handle empty search query and display "No matching result found"', () => {
    cy.get('input').type('{enter}');
    cy.get('p').should('contain', 'No matching result found');
  });

  it('should handle server error during search and display an error notification', () => {
    cy.intercept('GET', 'http://localhost:3001/api/books*', { statusCode: 500, body: 'Internal Server Error' }).as('searchError');
    cy.get('input').type('Error Book');
    cy.get('form').submit();
    cy.wait('@searchError');
    cy.get('.notification-error').should('contain', 'Internal Server Error');
  });



  it('should not display book details if there are no search results', () => {
    cy.get('input').type('Nonexistent Book');
    cy.get('form').submit();
    cy.get('p').should('contain', 'No matching result found');
    cy.get('td').should('not.exist');
  });

  it('should not perform a search if the search query is whitespace', () => {
    cy.intercept('GET', 'http://localhost:3001/api/books*', { fixture: 'search-results.json' }).as('searchResults');
    cy.get('input').type('   ');
    cy.get('form').submit();
    cy.wait('@searchResults', { timeout: 500 }).should('not.have.property', 'response');
  });

  it('should display a notification for an unsuccessful search', () => {
    cy.intercept('GET', 'http://localhost:3001/api/books*', { statusCode: 404, body: 'Not Found' }).as('searchError');
    cy.get('input').type('Nonexistent Book');
    cy.get('form').submit();
    cy.wait('@searchError');
    cy.get('.notification-error').should('contain', 'Not Found');
  });
});


// Logout
describe('Logout Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:your_port'); // Replace 'your_port' with the actual port your app is running on
  });

  it('should display a message when attempting to logout without an active session', () => {
    cy.intercept('GET', 'http://localhost:3001/api/user/logout', { statusCode: 401, body: 'Unauthorized' }).as('logoutRequest');
    cy.visit('/logout');
    cy.wait('@logoutRequest');
    cy.get('.notification-error').should('contain', 'Already logged out');
    cy.url().should('include', '/home');
  });

  it('should successfully logout and display a success message', () => {
    cy.intercept('GET', 'http://localhost:3001/api/user/logout', { body: {} }).as('logoutRequest');
    cy.visit('/logout');
    cy.wait('@logoutRequest');
    cy.get('.notification-warning').should('contain', 'Successfully logged out');
    cy.url().should('include', '/home');
  });

  it('should remove the token from local storage upon successful logout', () => {
    cy.intercept('GET', 'http://localhost:3001/api/user/logout', { body: {} }).as('logoutRequest');
    cy.visit('/logout');
    cy.wait('@logoutRequest');
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.be.null;
    });
  });
});





