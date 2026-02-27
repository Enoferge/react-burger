const mockEmail = 'enofergetest@yandex.ru';
const mockRefreshToken = 'test-refresh';
const mockAccessToken = 'Bearer test-access';
const mockOrderNumber = 12345;

const selector = {
  ingredientItem: '[data-cy="ingredient-item"]',
  constructorDropZone: '[data-cy="constructor-drop-zone"]',
  constructorBunDropZoneTop: '[data-cy="constructor-bun-drop-zone-top"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  orderSubmitButton: '[data-cy="order-submit-button"]',
};

describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.intercept('POST', '/api/auth/token', {
      success: true,
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    }).as('refreshToken');
    cy.intercept('GET', '/api/auth/user', {
      success: true,
      user: { email: mockEmail, name: 'Test User' },
    }).as('getUser');
    cy.intercept('POST', '/api/orders', {
      success: true,
      name: 'Флюоресцентный бургер',
      order: { number: mockOrderNumber },
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', mockRefreshToken);
    });
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('drags ingredient into constructor', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selector.ingredientItem).should('have.length.at.least', 1);
    cy.get(selector.constructorDropZone).should('be.visible');

    cy.get(selector.ingredientItem).eq(0).drag(selector.constructorBunDropZoneTop);

    cy.get(selector.ingredientItem).eq(1).drag(selector.constructorDropZone);

    cy.fixture('ingredients.json').then(({ data }) => {
      cy.get(selector.constructorDropZone).within(() => {
        cy.contains(data[1].name).should('exist');
      });
    });
  });

  it('opens ingredient details modal', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selector.ingredientItem).eq(2).click();

    cy.get(selector.modal).within(() => {
      cy.contains('Детали ингредиента').should('be.visible');
    });
  });

  it('shows ingredient data in modal', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selector.ingredientItem).eq(2).click();

    cy.fixture('ingredients.json').then(({ data }) => {
      const sauce = data[2];
      cy.get(selector.modal).within(() => {
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

    cy.get(selector.ingredientItem).eq(0).drag(selector.constructorBunDropZoneTop);
    cy.get(selector.ingredientItem).eq(1).drag(selector.constructorDropZone);

    cy.get(selector.orderSubmitButton).click();
    cy.wait('@createOrder');

    cy.get(selector.modal).should('be.visible');
    cy.get(selector.modal).within(() => {
      cy.contains(String(mockOrderNumber)).should('be.visible');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('Ваш заказ начали готовить').should('be.visible');
    });
  });

  it('closes modals when clicking close button', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selector.ingredientItem).eq(0).click();
    cy.get(selector.modal).should('be.visible');
    cy.get(selector.modalClose).click();
    cy.get(selector.modal).should('not.exist');

    cy.get(selector.ingredientItem).eq(1).click();
    cy.get(selector.modal).should('be.visible');
    cy.get(selector.modalClose).click();
    cy.get(selector.modal).should('not.exist');
  });
});
