describe('App Smoke Test', () => {
  it('loads the home page and shows expected content', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Welcome'); // Change this to a word that exists on your homepage
  });
});
