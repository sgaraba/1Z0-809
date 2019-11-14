import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VolunteerRequestComponentsPage, VolunteerRequestDeleteDialog, VolunteerRequestUpdatePage } from './volunteer-request.page-object';

const expect = chai.expect;

describe('VolunteerRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let volunteerRequestComponentsPage: VolunteerRequestComponentsPage;
  let volunteerRequestUpdatePage: VolunteerRequestUpdatePage;
  let volunteerRequestDeleteDialog: VolunteerRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load VolunteerRequests', async () => {
    await navBarPage.goToEntity('volunteer-request');
    volunteerRequestComponentsPage = new VolunteerRequestComponentsPage();
    await browser.wait(ec.visibilityOf(volunteerRequestComponentsPage.title), 5000);
    expect(await volunteerRequestComponentsPage.getTitle()).to.eq('volunteerApp.volunteerRequest.home.title');
  });

  it('should load create VolunteerRequest page', async () => {
    await volunteerRequestComponentsPage.clickOnCreateButton();
    volunteerRequestUpdatePage = new VolunteerRequestUpdatePage();
    expect(await volunteerRequestUpdatePage.getPageTitle()).to.eq('volunteerApp.volunteerRequest.home.createOrEditLabel');
    await volunteerRequestUpdatePage.cancel();
  });

  it('should create and save VolunteerRequests', async () => {
    const nbButtonsBeforeCreate = await volunteerRequestComponentsPage.countDeleteButtons();

    await volunteerRequestComponentsPage.clickOnCreateButton();
    await promise.all([
      volunteerRequestUpdatePage.setRegistrationDateInput('2000-12-31'),
      volunteerRequestUpdatePage.userSelectLastOption(),
      volunteerRequestUpdatePage.projectSelectLastOption()
    ]);
    expect(await volunteerRequestUpdatePage.getRegistrationDateInput()).to.eq(
      '2000-12-31',
      'Expected registrationDate value to be equals to 2000-12-31'
    );
    await volunteerRequestUpdatePage.save();
    expect(await volunteerRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await volunteerRequestComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last VolunteerRequest', async () => {
    const nbButtonsBeforeDelete = await volunteerRequestComponentsPage.countDeleteButtons();
    await volunteerRequestComponentsPage.clickOnLastDeleteButton();

    volunteerRequestDeleteDialog = new VolunteerRequestDeleteDialog();
    expect(await volunteerRequestDeleteDialog.getDialogTitle()).to.eq('volunteerApp.volunteerRequest.delete.question');
    await volunteerRequestDeleteDialog.clickOnConfirmButton();

    expect(await volunteerRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
