import { BASE_API_URL } from '../../src/api/client';

const mockEmail = 'enofergetest@yandex.ru';
const mockRefreshToken = 'test-refresh';
const mockAccessToken = 'Bearer test-access';
const mockOrderNumber = 12345;

describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_API_URL}/ingredients`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.intercept('POST', `${BASE_API_URL}/auth/token`, {
      success: true,
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    }).as('refreshToken');
    cy.intercept('GET', `${BASE_API_URL}/auth/user`, {
      success: true,
      user: { email: mockEmail, name: 'Test User' },
    }).as('getUser');
    cy.intercept('POST', `${BASE_API_URL}/orders`, {
      success: true,
      name: 'Флюоресцентный бургер',
      order: { number: mockOrderNumber },
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', mockRefreshToken);
    });
  });

  it('drags ingredient into constructor', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item"]').should('have.length.at.least', 1);
    cy.get('[data-cy="constructor-drop-zone"]').should('be.visible');

    cy.get('[data-cy="ingredient-item"]')
      .eq(0)
      .drag('[data-cy="constructor-bun-drop-zone-top"]');

    cy.get('[data-cy="ingredient-item"]')
      .eq(1)
      .drag('[data-cy="constructor-drop-zone"]');

    cy.fixture('ingredients.json').then(({ data }) => {
      cy.get('[data-cy="constructor-drop-zone"]').within(() => {
        cy.contains(data[1].name).should('exist');
      });
    });
  });

  it('opens ingredient details modal', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item"]').eq(2).click();

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Детали ингредиента').should('be.visible');
    });
  });

  it('shows ingredient data in modal', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item"]').eq(2).click();

    cy.fixture('ingredients.json').then(({ data }) => {
      const sauce = data[2];
      cy.get('[data-cy="modal"]').within(() => {
        cy.contains(sauce.name).should('be.visible');
        cy.contains('Калории').should('be.visible');
        cy.contains(String(sauce.calories)).should('be.visible');
        cy.contains('Белки').should('be.visible');
        cy.contains('Жиры').should('be.visible');
        cy.contains('Углеводы').should('be.visible');
      });
    });
  });

  it('opens order success modal when clicking Place order', () => {
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@refreshToken');
    cy.wait('@getUser');

    cy.get('[data-cy="ingredient-item"]')
      .eq(0)
      .drag('[data-cy="constructor-bun-drop-zone-top"]');
    cy.get('[data-cy="ingredient-item"]')
      .eq(1)
      .drag('[data-cy="constructor-drop-zone"]');

    cy.get('[data-cy="order-submit-button"]').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').within(() => {
      cy.contains(String(mockOrderNumber)).should('be.visible');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('Ваш заказ начали готовить').should('be.visible');
    });
  });

  it('closes modals when clicking close button', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').eq(1).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
