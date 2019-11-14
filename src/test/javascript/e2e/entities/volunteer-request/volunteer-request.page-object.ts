import { element, by, ElementFinder } from 'protractor';

export class VolunteerRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-volunteer-request div table .btn-danger'));
  title = element.all(by.css('jhi-volunteer-request div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class VolunteerRequestUpdatePage {
  pageTitle = element(by.id('jhi-volunteer-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  registrationDateInput = element(by.id('field_registrationDate'));
  userSelect = element(by.id('field_user'));
  projectSelect = element(by.id('field_project'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRegistrationDateInput(registrationDate) {
    await this.registrationDateInput.sendKeys(registrationDate);
  }

  async getRegistrationDateInput() {
    return await this.registrationDateInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async projectSelectLastOption() {
    await this.projectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projectSelectOption(option) {
    await this.projectSelect.sendKeys(option);
  }

  getProjectSelect(): ElementFinder {
    return this.projectSelect;
  }

  async getProjectSelectedOption() {
    return await this.projectSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class VolunteerRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-volunteerRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-volunteerRequest'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
