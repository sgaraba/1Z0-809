import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OngComponentsPage, OngDeleteDialog, OngUpdatePage } from './ong.page-object';

const expect = chai.expect;

describe('Ong e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ongComponentsPage: OngComponentsPage;
  let ongUpdatePage: OngUpdatePage;
  let ongDeleteDialog: OngDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ongs', async () => {
    await navBarPage.goToEntity('ong');
    ongComponentsPage = new OngComponentsPage();
    await browser.wait(ec.visibilityOf(ongComponentsPage.title), 5000);
    expect(await ongComponentsPage.getTitle()).to.eq('volunteerApp.ong.home.title');
  });

  it('should load create Ong page', async () => {
    await ongComponentsPage.clickOnCreateButton();
    ongUpdatePage = new OngUpdatePage();
    expect(await ongUpdatePage.getPageTitle()).to.eq('volunteerApp.ong.home.createOrEditLabel');
    await ongUpdatePage.cancel();
  });

  it('should create and save Ongs', async () => {
    const nbButtonsBeforeCreate = await ongComponentsPage.countDeleteButtons();

    await ongComponentsPage.clickOnCreateButton();
    await promise.all([
      ongUpdatePage.setNameInput('name'),
      ongUpdatePage.setDescriptionInput('description'),
      ongUpdatePage.setIdnoInput('idno'),
      ongUpdatePage.setEmailInput('email'),
      ongUpdatePage.setAddressInput('address'),
      ongUpdatePage.setPhoneInput('phone')
    ]);
    expect(await ongUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await ongUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await ongUpdatePage.getIdnoInput()).to.eq('idno', 'Expected Idno value to be equals to idno');
    expect(await ongUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await ongUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await ongUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    await ongUpdatePage.save();
    expect(await ongUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ong', async () => {
    const nbButtonsBeforeDelete = await ongComponentsPage.countDeleteButtons();
    await ongComponentsPage.clickOnLastDeleteButton();

    ongDeleteDialog = new OngDeleteDialog();
    expect(await ongDeleteDialog.getDialogTitle()).to.eq('volunteerApp.ong.delete.question');
    await ongDeleteDialog.clickOnConfirmButton();

    expect(await ongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
