import { element, by, ElementFinder } from 'protractor';

export class OngRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ong-request div table .btn-danger'));
  title = element.all(by.css('jhi-ong-request div h2#page-heading span')).first();

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

export class OngRequestUpdatePage {
  pageTitle = element(by.id('jhi-ong-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  idnoInput = element(by.id('field_idno'));
  registrationDateInput = element(by.id('field_registrationDate'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setIdnoInput(idno) {
    await this.idnoInput.sendKeys(idno);
  }

  async getIdnoInput() {
    return await this.idnoInput.getAttribute('value');
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

export class OngRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ongRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ongRequest'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
