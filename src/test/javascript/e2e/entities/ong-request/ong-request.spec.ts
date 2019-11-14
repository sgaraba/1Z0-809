import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OngRequestComponentsPage, OngRequestDeleteDialog, OngRequestUpdatePage } from './ong-request.page-object';

const expect = chai.expect;

describe('OngRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ongRequestComponentsPage: OngRequestComponentsPage;
  let ongRequestUpdatePage: OngRequestUpdatePage;
  let ongRequestDeleteDialog: OngRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OngRequests', async () => {
    await navBarPage.goToEntity('ong-request');
    ongRequestComponentsPage = new OngRequestComponentsPage();
    await browser.wait(ec.visibilityOf(ongRequestComponentsPage.title), 5000);
    expect(await ongRequestComponentsPage.getTitle()).to.eq('volunteerApp.ongRequest.home.title');
  });

  it('should load create OngRequest page', async () => {
    await ongRequestComponentsPage.clickOnCreateButton();
    ongRequestUpdatePage = new OngRequestUpdatePage();
    expect(await ongRequestUpdatePage.getPageTitle()).to.eq('volunteerApp.ongRequest.home.createOrEditLabel');
    await ongRequestUpdatePage.cancel();
  });

  it('should create and save OngRequests', async () => {
    const nbButtonsBeforeCreate = await ongRequestComponentsPage.countDeleteButtons();

    await ongRequestComponentsPage.clickOnCreateButton();
    await promise.all([
      ongRequestUpdatePage.setNameInput('name'),
      ongRequestUpdatePage.setIdnoInput('idno'),
      ongRequestUpdatePage.setRegistrationDateInput('2000-12-31'),
      ongRequestUpdatePage.userSelectLastOption()
    ]);
    expect(await ongRequestUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await ongRequestUpdatePage.getIdnoInput()).to.eq('idno', 'Expected Idno value to be equals to idno');
    expect(await ongRequestUpdatePage.getRegistrationDateInput()).to.eq(
      '2000-12-31',
      'Expected registrationDate value to be equals to 2000-12-31'
    );
    await ongRequestUpdatePage.save();
    expect(await ongRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ongRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OngRequest', async () => {
    const nbButtonsBeforeDelete = await ongRequestComponentsPage.countDeleteButtons();
    await ongRequestComponentsPage.clickOnLastDeleteButton();

    ongRequestDeleteDialog = new OngRequestDeleteDialog();
    expect(await ongRequestDeleteDialog.getDialogTitle()).to.eq('volunteerApp.ongRequest.delete.question');
    await ongRequestDeleteDialog.clickOnConfirmButton();

    expect(await ongRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
